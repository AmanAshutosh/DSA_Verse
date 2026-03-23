/**
 * DraggableWindow.jsx
 *
 * A macOS-style floating window that the user can:
 *   - Drag by its title bar
 *   - Close via the red traffic-light button
 *   - Focus by clicking anywhere on it
 *
 * Uses raw mouse events (no drag library) so the logic is transparent
 * and easy to understand.
 *
 * Props:
 *   win        {Object}   - { id, topicId, x, y, w, h }
 *   topic      {Object}   - Topic data from DSA_DATA
 *   isActive   {boolean}  - Whether this is the front-most window
 *   onClose    {fn}       - Called when the red button is clicked
 *   onFocus    {fn}       - Called when the window receives a click
 *   progress   {Object}   - Full progress state
 *   onComplete {fn}       - (topicId, patternId) toggle
 */

import React, { useState, useRef, useCallback } from "react";
import WindowContent from "./WindowContent";
import "./DraggableWindow.css";

export default function DraggableWindow({
  win,
  topic,
  isActive,
  onClose,
  onFocus,
  progress,
  onComplete,
  isMobile,
}) {
  // Current top-left position of the window
  const [pos, setPos] = useState({ x: win.x, y: win.y });

  /**
   * dragRef stores drag state outside React to avoid stale closure issues.
   * We DON'T put this in useState because re-renders aren't needed during drag.
   */
  const dragRef = useRef({
    dragging: false,
    originMouseX: 0,
    originMouseY: 0,
    originWinX: 0,
    originWinY: 0,
  });

  /* ── Mouse handlers ── */
  /** Cleans up listeners when the mouse button is released */
const handleMouseUp = () => {
  dragRef.current.dragging = false;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};

  /** Called when the user clicks the title bar to start dragging */
  const handleTitleMouseDown = (e) => {
    if (isMobile) return;
    // Don't start drag if they clicked a traffic-light button
    if (e.target.closest(".traffic-lights")) return;

    onFocus(); // Bring window to front

    dragRef.current = {
      dragging: true,
      originMouseX: e.clientX,
      originMouseY: e.clientY,
      originWinX: pos.x,
      originWinY: pos.y,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    e.preventDefault(); // Prevent text selection while dragging
  };

  /** Moves the window as the mouse drags */
  const handleMouseMove = useCallback((e) => {
    if (!dragRef.current.dragging) return;

    setPos({
      x:
        dragRef.current.originWinX + (e.clientX - dragRef.current.originMouseX),
      y:
        dragRef.current.originWinY + (e.clientY - dragRef.current.originMouseY),
    });
  }, []); // No deps — reads from ref, not state

  return (
    <div
      className={`draggable-window ${isActive ? "draggable-window--active" : ""}`}
      style={{
        position: "fixed", // 🔥 VERY IMPORTANT

        left: isMobile ? 0 : pos.x,
        top: isMobile ? 0 : pos.y,

        width: isMobile ? "100vw" : win.w,
        height: isMobile ? "100vh" : win.h,

        zIndex: isActive ? "var(--z-window-active)" : "var(--z-window)",
      }}
      onMouseDown={onFocus} /* Clicking anywhere focuses the window */
    >
      {/* ── Title bar ── */}
      <div
        className="draggable-window__titlebar"
        onMouseDown={handleTitleMouseDown}
      >
        {/* Traffic-light buttons */}
        <div className="traffic-lights">
          <TrafficLight
            color="#FF5F57"
            hoverColor="#FF3B30"
            onClick={onClose}
          />
          <TrafficLight color="#FEBC2E" hoverColor="#FF9F0A" />
          <TrafficLight color="#28C840" hoverColor="#30D158" />
        </div>

        {/* Centred window title */}
        <span className="draggable-window__title">
          {topic.emoji} {topic.name}
        </span>

        {/* Spacer so the title stays centred */}
        <div className="draggable-window__title-spacer" />
      </div>

      {/* ── Window body ── */}
      <div className="draggable-window__body">
        <WindowContent
          topic={topic}
          progress={progress}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   TrafficLight — a single macOS-style traffic-light button
   ──────────────────────────────────────────────────────────── */
function TrafficLight({ color, hoverColor, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="traffic-light"
      style={{ background: hovered ? hoverColor : color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      /* Keyboard: Enter/Space also triggers onClick */
      aria-label={onClick ? "Close window" : undefined}
    />
  );
}

/**
 * CodeBlock.jsx
 *
 * Displays a read-only JavaScript code snippet styled like a
 * terminal / code editor, with a one-click Copy button.
 *
 * Props:
 *   code {string} - The raw code string to display
 */

import React, { useState } from "react";
import "./CodeBlock.css";

/** Traffic-light dot colours — purely decorative */
const TRAFFIC_LIGHTS = ["#FF5F57", "#FEBC2E", "#28C840"];

export default function CodeBlock({ code }) {
  // "Copied!" feedback state — resets after 2 s
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // navigator.clipboard may fail in some iframe / secure contexts
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      {/* ── Top bar: traffic lights, language label, copy button ── */}
      <div className="code-block__header">
        {/* Decorative macOS traffic-light dots */}
        <div className="code-block__lights">
          {TRAFFIC_LIGHTS.map((color) => (
            <span
              key={color}
              className="code-block__light"
              style={{ background: color }}
            />
          ))}
        </div>

        <span className="code-block__lang">javascript</span>

        <button
          className={`code-block__copy ${copied ? "code-block__copy--done" : ""}`}
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* ── Code content ── */}
      <pre className="code-block__pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

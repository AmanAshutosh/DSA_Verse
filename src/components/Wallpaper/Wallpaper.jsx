/**
 * Wallpaper.jsx
 *
 * Renders the fixed dark desktop background with subtle aurora-like
 * glowing blobs to give the UI depth without being distracting.
 * Sits at the lowest z-index so everything else renders on top.
 */

import React from "react";
import "./Wallpaper.css";

export default function Wallpaper() {
  return (
    <div className="wallpaper">
      {/* Each blob is a soft radial-gradient circle with blur */}
      <div className="wallpaper__blob wallpaper__blob--blue" />
      <div className="wallpaper__blob wallpaper__blob--purple" />
      <div className="wallpaper__blob wallpaper__blob--green" />
    </div>
  );
}

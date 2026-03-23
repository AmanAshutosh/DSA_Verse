import React from "react";
import { DSA_DATA } from "./data/dsaData";
import { DOCK_MAX_ITEMS } from "./constants";
import { useClock } from "./hooks/useClock";
import { useProgress } from "./hooks/useProgress";
import { useWindows } from "./hooks/useWindows";
import { useRecentTopics } from "./hooks/useRecentTopics";

import Wallpaper from "./components/Wallpaper/Wallpaper";
import MenuBar from "./components/MenuBar/MenuBar";
import AppGrid from "./components/AppGrid/AppGrid";
import Dock from "./components/Dock/Dock";
import DraggableWindow from "./components/Window/DraggableWindow";
import Login from "./components/Auth/Login";
import Loader from "./components/UI/Loader";
import Footer from "./components/UI/Footer";

import "./App.css";

export default function App() {
  /* ── Login ──────────────────────────────────────────────── */
  const [user, setUser] = React.useState(() => {
    const saved = localStorage.getItem("dsa-user");
    return saved ? JSON.parse(saved) : null;
  });

  /* ── Loader ─────────────────────────────────────────────── */
  const [appLoading, setAppLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 800); // smoother UX

    return () => clearTimeout(timer);
  }, []);

  /* ── Hooks ──────────────────────────────────────────────── */
  const time = useClock();
  const { progress, markComplete } = useProgress();
  const { windows, activeWindowId, openWindow, closeWindow, focusWindow } =
    useWindows();
  const { recentIds, addRecent } = useRecentTopics();

  const isMobile = window.innerWidth <= 768;

  /* ── Derived values ─────────────────────────────────────── */
  const openTopicIds = windows.map((w) => w.topicId);

  const dockTopics = recentIds.length
    ? recentIds
        .map((id) => DSA_DATA.find((t) => t.id === id))
        .filter(Boolean)
        .slice(0, DOCK_MAX_ITEMS)
    : DSA_DATA.slice(0, DOCK_MAX_ITEMS);

  /* ── Actions ────────────────────────────────────────────── */
  const handleOpenTopic = (topicId) => {
    openWindow(topicId);
    addRecent(topicId);
  };

  /* ── RENDER FLOW (IMPORTANT ORDER) ─────────────────────── */

  // 1️⃣ Loader first
  if (appLoading) {
    return <Loader />;
  }

  // 2️⃣ Login next
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  // 3️⃣ Main app
  return (
    <div className="app">
      <Wallpaper />

      <MenuBar time={time} />

      <AppGrid
        topics={DSA_DATA}
        openIds={openTopicIds}
        progress={progress}
        onOpen={handleOpenTopic}
      />

      {windows.map((win) => {
        const topic = DSA_DATA.find((t) => t.id === win.topicId);
        if (!topic) return null;

        return (
          <DraggableWindow
            key={win.id}
            win={win}
            topic={topic}
            isActive={win.id === activeWindowId}
            onClose={() => closeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
            progress={progress}
            onComplete={markComplete}
            isMobile={isMobile}
          />
        );
      })}

      <Dock
        dockTopics={dockTopics}
        openIds={openTopicIds}
        onOpen={handleOpenTopic}
      />
      
      <Footer />

      {windows.length === 0 && (
        <p className="app__hint">
          Click any topic to open · Drag windows to rearrange · Mark patterns
          complete to track progress
        </p>
      )}
    </div>
  );
}

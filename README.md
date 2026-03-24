#  DSA Verse

**DSA Verse** is a modern, interactive, Mac-style learning platform designed to make mastering Data Structures & Algorithms a visually engaging experience. Built with a focus on Glassmorphism, responsive design, and persistent progress tracking.

🌐 **[Live Demo](https://dsa-verse-beta.vercel.app/)**

---

## 🖥️ The Experience

### **Desktop Mode**
* **Mac-inspired UI:** Draggable windows, a functional Dock, and a real-time clock menu bar.
* **Multi-window Workflow:** Open multiple topics or tools simultaneously, just like a real OS.
* **Glassmorphism:** A sleek, modern aesthetic with smooth animations and depth.

### **Mobile-First Design**
* **Adaptive Windows:** Full-screen transitions tailored for touch interfaces.
* **Responsive Layout:** Every component scales seamlessly from desktop to mobile.

---

## ✨ Key Features

* **📚 Pattern-Based Learning:** Focus on the "why" behind the logic with structured theory, code snippets, and curated question sets.
* **📊 Progress Tracking:** Mark patterns as completed with state persistence via **LocalStorage**.
* **🔐 User System:** Simple, persistent session management (Name + Mobile) with input validation.
* **🎨 UI/UX:** High-definition Glass UI, smooth animations, and custom loading screens.

---

## 🛠️ Tech Stack

| Category | Tools |
| :--- | :--- |
| **Frontend** | React (Vite), Custom CSS (Glass UI) |
| **State** | React Hooks, LocalStorage |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```text
dsa-verse/
├── src/
│   ├── components/      # Modular UI (Dock, MenuBar, Window, Auth)
│   ├── hooks/           # Custom logic & state management
│   ├── utils/           # Helper functions & validation
│   ├── data/            # DSA Theory & Problem sets
│   ├── constants/       # App-wide configuration
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point

🧠 Development Learnings
Building DSA Verse provided deep insights into:
Component Architecture: Creating a scalable "Window" system that handles z-index and dragging.
State Persistence: Managing user progress and sessions without a heavy backend.
Product Mindset: Balancing aesthetic "eye-candy" with actual educational utility.

📌 Future Roadmap
[ ] Backend Integration: Moving from LocalStorage to Firebase/Node.js for cross-device sync.
[ ] Advanced Analytics: Visualizing learning speed and topic mastery.
[ ] PWA Support: Making the platform installable as a mobile app.
[ ] Dark/Light Mode: Full theme customization.

🤝 Contributing & License
Contributions make the open-source community an amazing place to learn and create. Feel free to fork the repo and submit a PR!
This project is open-source and available under the MIT License.

👨‍💻 Connect with Me
Ashutosh Aman 🌐 GitHub: AmanAshutosh

If you find this project helpful, please consider giving it a ⭐ to show your support!

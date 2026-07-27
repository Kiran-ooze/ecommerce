import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />

        <Toaster
          position="bottom-right"
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              // Glassmorphism + Deep Dark Vercel aesthetic
              background: "rgba(9, 9, 11, 0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "#ededed",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "13px",
              fontWeight: "400",
              letterSpacing: "-0.01em",
              boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.8)",
              maxWidth: "360px",
            },
            // Replace heavy built-in circle badges with clean minimalist icons
            success: {
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ),
            },
            error: {
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ),
            },
            loading: {
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              ),
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
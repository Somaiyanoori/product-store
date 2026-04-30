import { Toaster } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

export default function Toast() {
  const { state } = useAppContext();
  const isDark = state.theme === "dark";

  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: isDark ? "#1e293b" : "#ffffff",
          color: isDark ? "#f1f5f9" : "#1e293b",
          border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "14px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
        },
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}

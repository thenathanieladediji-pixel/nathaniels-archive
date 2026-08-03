"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Toast = {
  id: number;
  message: string;
  tone: "success" | "error";
};

type ToastContextValue = {
  pushToast: (message: string, tone?: Toast["tone"]) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = (message: string, tone: Toast["tone"] = "success") => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev, { id, message, tone }]);

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3200);
  };

  const value = useMemo(() => ({ pushToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-full border px-4 py-2 text-sm font-medium shadow-lg backdrop-blur ${
              toast.tone === "success"
                ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-200"
                : "border-rose-500/30 bg-rose-500/15 text-rose-200"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}

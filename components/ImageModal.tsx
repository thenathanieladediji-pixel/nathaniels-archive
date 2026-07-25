"use client";

import { useEffect, useState } from "react";

type ImageModalProps = {
  src: string;
  alt: string;
};

export default function ImageModal({
  src,
  alt,
}: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div className="mt-12">
        <img
          src={src}
          alt={alt}
          onClick={() => setIsOpen(true)}
          className="max-h-[80vh] w-full cursor-zoom-in rounded-3xl object-contain transition duration-500 hover:scale-[1.01] hover:opacity-95"
        />

        <p className="mt-3 text-center text-sm uppercase tracking-[0.2em] text-zinc-500">
          Click to expand
        </p>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-6 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
          />

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/10 px-3 py-2 text-2xl text-white transition hover:bg-white/20 sm:right-6 sm:top-6 sm:px-4 sm:text-3xl"
          >
            ×
          </button>

          <p className="absolute bottom-4 text-[0.65rem] uppercase tracking-[0.25em] text-zinc-400 sm:bottom-6 sm:text-xs">
            Press ESC or click outside to close
          </p>
        </div>
      )}
    </>
  );
}
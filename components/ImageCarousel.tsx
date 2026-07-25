"use client";

import { useEffect, useState } from "react";

type ImageCarouselProps = {
  images: string[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
};

export default function ImageCarousel({
  images,
  isOpen,
  currentIndex,
  onClose,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(currentIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrent(currentIndex);
    }
  }, [currentIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;

        case "ArrowRight":
          setCurrent((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
          );
          break;

        case "ArrowLeft":
          setCurrent((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
          );
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md">
      {/* Close */}

      <button
        onClick={onClose}
        className="
          absolute
          right-8
          top-8
          z-50
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          bg-black/40
          text-3xl
          text-white
          backdrop-blur-md
          transition-all
          duration-300
          hover:scale-110
          hover:bg-white
          hover:text-black
          cursor-pointer
        "
      >
        ✕
      </button>

      {/* Counter */}

      <div className="absolute left-8 top-8 z-50 rounded-full border border-white/10 bg-black/40 px-5 py-3 text-sm uppercase tracking-[0.3em] text-white backdrop-blur-md">
        {current + 1} / {images.length}
      </div>

      {/* Image */}

      <div className="flex h-screen items-center justify-center px-24">
        <img
          src={images[current]}
          alt=""
          className="
            max-h-[90vh]
            max-w-[90vw]
            object-contain
            transition-all
            duration-500
          "
        />
      </div>

      {/* Previous */}

      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrent((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
            className="
              absolute
              left-8
              top-1/2
              z-50
              flex
              h-14
              w-14
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/40
              text-3xl
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:scale-110
              hover:bg-white
              hover:text-black
              cursor-pointer
            "
          >
            ←
          </button>

          {/* Next */}

          <button
            onClick={() =>
              setCurrent((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              )
            }
            className="
              absolute
              right-8
              top-1/2
              z-50
              flex
              h-14
              w-14
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/40
              text-3xl
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:scale-110
              hover:bg-white
              hover:text-black
              cursor-pointer
            "
          >
            →
          </button>
        </>
      )}

      {/* Navigation Dots */}

      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-orange-500 scale-125"
                  : "bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
"use client";

type ProjectGalleryProps = {
  images: string[];
  onClick: (index: number) => void;
};

export default function ProjectGallery({
  images,
  onClick,
}: ProjectGalleryProps) {
  return (
    <section className="mt-10 sm:mt-16">
      <div
        className="
          flex
          snap-x
          snap-mandatory
          gap-4
          sm:gap-6
          overflow-x-auto
          pb-6
          scroll-smooth
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onClick(index)}
            className="
              group
              relative
              h-[320px]
              min-w-[85%]
              snap-center
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-zinc-950
              transition-all
              duration-500
              hover:scale-[1.02]
              sm:h-[420px]
              sm:min-w-[70%]
              lg:h-[500px]
              lg:min-w-[60%]
            "
          >
            <img
              src={image}
              alt=""
              className="
                h-full
                w-full
                object-contain
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          {images.length} Project Images
        </p>

        <p className="mt-3 text-xs uppercase tracking-[0.25em] text-orange-300 sm:text-sm">
          Scroll horizontally to explore • Click any image to view fullscreen
        </p>
      </div>
    </section>
  );
}
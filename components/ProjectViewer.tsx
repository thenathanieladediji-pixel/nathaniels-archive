"use client";

import { useState } from "react";
import ProjectGallery from "./ProjectGallery";
import ImageCarousel from "./ImageCarousel";

type Project = {
  title: string;
  cover_image?: string;
  gallery_images?: string[];
};

type ProjectViewerProps = {
  project: Project;
};

export default function ProjectViewer({
  project,
}: ProjectViewerProps) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cover image first, then gallery images
  const images = [
    project.cover_image,
    ...(project.gallery_images || []),
  ].filter(Boolean) as string[];

  return (
    <>
      {/* Gallery Preview */}

      {images.length > 0 && (
        <ProjectGallery
          images={images}
          onClick={(index) => {
            setCurrentIndex(index);
            setOpen(true);
          }}
        />
      )}

      {/* Fullscreen Carousel */}

      <ImageCarousel
        images={images}
        isOpen={open}
        currentIndex={currentIndex}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
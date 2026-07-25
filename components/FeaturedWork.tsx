"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Project = {
  id: string;
  title: string;
  category: string;
  slug: string;
  cover_image: string;
};

export default function FeaturedWork() {
  const supabase = createClient();

  const [projects, setProjects] = useState<Project[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    async function fetchFeaturedProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(
          "FEATURED FETCH ERROR:",
          error.message,
          error.details,
          error.hint
        );
        return;
      }

      setProjects([
        ...(data || []),
        ...(data || []),
        ...(data || []),
      ]);
    }

    fetchFeaturedProjects();
  }, [supabase]);

  return (
    <section className="relative overflow-hidden overflow-x-hidden bg-black px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-10 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 px-2 text-center sm:mb-14 sm:px-6">
          <h2 className="text-3xl font-semibold uppercase tracking-[0.24em] sm:text-4xl lg:text-5xl">
            Featured Work
          </h2>

          <p className="mt-5 text-sm uppercase tracking-[0.3em] text-zinc-400">
            A selection of projects across industries
          </p>
        </div>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className={`flex gap-8 will-change-transform animate-featured-scroll ${
              paused ? "pause-animation" : ""
            }`}
          >
            {projects.map((project, index) => (
              <Link
                key={`${project.id}-${index}`}
                href={`/archive/${project.category}/${project.slug}`}
                className="group relative min-w-[84vw] overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] sm:min-w-[420px] sm:rounded-[28px] md:min-w-[480px] lg:min-w-[500px]"
              >
                <div className="relative flex h-[220px] items-center justify-center bg-black sm:h-[320px] md:h-[360px] lg:h-[420px]">
                  
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="h-full w-full object-contain p-4 transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                    <p className="text-xs uppercase tracking-[0.35em] text-orange-300">
                      {project.category}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold uppercase tracking-[0.15em] sm:text-2xl lg:text-3xl xl:text-4xl">
                      {project.title}
                    </h3>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
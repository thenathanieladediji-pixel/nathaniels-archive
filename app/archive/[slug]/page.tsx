import Link from "next/link";
import { supabase } from "@/lib/supabase";

function formatSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map(
      (segment) =>
        segment.charAt(0).toUpperCase() + segment.slice(1)
    )
    .join(" ");
}

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  year: string;
  role: string;
  cover_image?: string;
};

type ArchiveCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArchiveCategoryPage({
  params,
}: ArchiveCategoryPageProps) {
  const { slug } = await params;

  const categoryLabel = formatSlug(
    decodeURIComponent(slug)
  );

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("category", slug);

  if (error) {
    console.error(error);
  }

  return (
    <main className="min-h-screen overflow-hidden overflow-x-hidden bg-black px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-10 lg:py-12">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,0,0.14),transparent_35%)]" />

      <div className="absolute left-[-80px] top-[-40px] h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="absolute bottom-[-100px] right-[-60px] h-[360px] w-[360px] rounded-full bg-orange-400/10 blur-[140px]" />


      <div className="relative mx-auto max-w-6xl">

        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.7rem] uppercase tracking-[0.4em] text-zinc-300 transition-all duration-300 hover:border-orange-400/40 hover:bg-orange-500/10"
          >
            ← Back to Archive
          </Link>
        </div>


        <div className="max-w-3xl">

          <p className="text-[0.7rem] uppercase tracking-[0.5em] text-orange-300/70">
            {categoryLabel}
          </p>


          <h1 className="mt-5 text-3xl font-black uppercase tracking-[0.28em] text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            {categoryLabel}
          </h1>


          <p className="mt-5 max-w-2xl text-sm uppercase tracking-[0.3em] text-zinc-400 sm:text-base">
            A cinematic collection of work shaped through strategy, identity and digital experience.
          </p>

        </div>



        {!projects || projects.length === 0 ? (

          <div className="mt-16 text-zinc-400">
            No projects found.
          </div>

        ) : (

          <div className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">

            {projects.map((project: Project) => (

              <article
                key={project.id}
                className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-500 hover:border-orange-400/40 hover:bg-white/[0.06] sm:rounded-[1.75rem] sm:p-7"
              >

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,0,0.16),transparent_58%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />


                {project.cover_image && (
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="mb-6 h-48 w-full rounded-2xl object-cover sm:h-56"
                  />
                )}


                <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-orange-400 via-orange-300 to-transparent transition-transform duration-500 group-hover:scale-x-100" />


                <Link
                  href={`/archive/${slug}/${project.slug}`}
                  className="relative block"
                >

                  <p className="text-[0.65rem] uppercase tracking-[0.45em] text-zinc-500">
                    {project.year}
                  </p>


                  <h2 className="mt-4 text-xl font-semibold uppercase tracking-[0.2em] text-white sm:text-2xl">
                    {project.title}
                  </h2>


                  <div className="mt-6 h-px w-14 bg-white/15" />


                  <p className="mt-6 text-sm leading-7 text-zinc-400 sm:text-[0.95rem]">
                    {project.role}
                  </p>

                </Link>

              </article>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}
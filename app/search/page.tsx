import Link from "next/link";
import { supabase } from "@/lib/supabase";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  year: string;
  role: string;
  cover_image?: string;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;

  const search = q ?? "";

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .ilike("title", `%${search}%`);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="text-sm uppercase tracking-widest text-zinc-400 hover:text-white"
        >
          ← Back
        </Link>

        <h1 className="mt-10 text-5xl font-black">
          Search Results
        </h1>

        <p className="mt-4 text-zinc-400">
          Results for "{search}"
        </p>

        {projects && projects.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {projects.map((project: Project) => (
              <Link
                key={project.id}
                href={`/archive/${project.category}/${project.slug}`}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
              >
                {project.cover_image && (
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="h-56 w-full object-cover"
                  />
                )}

                <div className="p-6">
                  <p className="text-sm text-orange-300">
                    {project.category}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-zinc-400">
                    {project.role}
                  </p>

                  <p className="mt-2 text-zinc-500">
                    {project.year}
                  </p>
                </div>
              </Link>
            ))}

          </div>
        ) : (
          <p className="mt-12 text-zinc-400">
            No projects found.
          </p>
        )}
      </div>
    </main>
  );
}
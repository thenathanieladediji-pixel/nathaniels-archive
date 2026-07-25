import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProjectViewer from "@/components/ProjectViewer";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
    project: string;
  }>;
};

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  client?: string;
  year: string;
  role: string;
  description?: string;
  cover_image?: string;
  gallery_images?: string[];
  challenge?: string;
  solution?: string;
  result?: string;
  tools?: string[];
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug, project } = await params;

  const { data: projectData, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", project)
    .single();

  if (error || !projectData) {
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <h1 className="text-4xl font-bold">
          Project not found
        </h1>

        <Link
          href={`/archive/${slug}`}
          className="mt-6 inline-block text-orange-400"
        >
          ← Back to projects
        </Link>
      </main>
    );
  }

  const projectInfo = projectData as Project;

  return (
    <main className="min-h-screen overflow-x-hidden bg-black px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/archive/${slug}`}
          className="text-sm uppercase tracking-widest text-zinc-400 hover:text-white"
        >
          ← Back
        </Link>

        <div className="mt-12">
          <p className="text-xs uppercase tracking-[0.4em] text-orange-300">
            {projectInfo.category}
          </p>

          <h1 className="mt-5 text-3xl font-black uppercase tracking-[0.2em] sm:text-4xl lg:text-5xl">
            {projectInfo.title}
          </h1>

         <div className="mt-8 grid gap-4 text-sm text-zinc-400 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
  {projectInfo.client && (
    <div>
      <p className="text-xs uppercase tracking-wider">
        Client
      </p>

      <p className="mt-2 text-white">
        {projectInfo.client}
      </p>
    </div>
  )}

  <div>
    <p className="text-xs uppercase tracking-wider">
      Year
    </p>

    <p className="mt-2 text-white">
      {projectInfo.year}
    </p>
  </div>

  <div>
    <p className="text-xs uppercase tracking-wider">
      Role
    </p>

    <p className="mt-2 text-white">
      {projectInfo.role}
    </p>
  </div>
</div>
        </div>

        <ProjectViewer project={projectInfo} />

        <div className="mt-16 border-t border-white/10 pt-16">
          <h2 className="text-sm uppercase tracking-[0.35em] text-orange-300">
            About
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            {projectInfo.description ||
              "A project created through strategy, design and digital experience."}
          </p>
        </div>

        {projectInfo.challenge && (
          <div className="mt-16 border-t border-white/10 pt-16">
            <h2 className="text-sm uppercase tracking-[0.35em] text-orange-300">
              Challenge
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              {projectInfo.challenge}
            </p>
          </div>
        )}

        {projectInfo.solution && (
          <div className="mt-16 border-t border-white/10 pt-16">
            <h2 className="text-sm uppercase tracking-[0.35em] text-orange-300">
              Solution
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              {projectInfo.solution}
            </p>
          </div>
        )}

        {projectInfo.result && (
          <div className="mt-16 border-t border-white/10 pt-16">
            <h2 className="text-sm uppercase tracking-[0.35em] text-orange-300">
              Result
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              {projectInfo.result}
            </p>
          </div>
        )}

        {projectInfo.tools &&
          projectInfo.tools.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-16">
              <h2 className="text-sm uppercase tracking-[0.35em] text-orange-300">
                Tools
              </h2>

              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                {projectInfo.tools.map((tool) => (
                  <div
                    key={tool}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-zinc-300"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </main>
  );
}
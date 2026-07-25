"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [client, setClient] = useState("");
  const [year, setYear] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [challenge, setChallenge] = useState("");
const [solution, setSolution] = useState("");
const [result, setResult] = useState("");
const [tools, setTools] = useState("");
const [imageFile, setImageFile] = useState<File | null>(null);
const [coverPreview, setCoverPreview] = useState("");

const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
function removeGalleryImage(index: number) {
  setGalleryFiles((prev) =>
    prev.filter((_, i) => i !== index)
  );
}

const [featured, setFeatured] = useState(false);

  const [projects, setProjects] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProjects(data || []);
  }

  async function deleteProject(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchProjects();
  }

  function editProject(project: any) {
    setTitle(project.title || "");
    setSlug(project.slug || "");
    setCategory(project.category || "");
    setClient(project.client || "");
    setYear(project.year || "");
    setRole(project.role || "");
    setDescription(project.description || "");

    setChallenge(project.challenge || "");
setSolution(project.solution || "");
setResult(project.result || "");
setTools(
  Array.isArray(project.tools)
    ? project.tools.join(", ")
    : ""
);

setGalleryFiles([]);
    setFeatured(project.featured || false);

    setEditingId(project.id);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    let imageUrl = "";
let galleryUrls: string[] = [];

if (galleryFiles.length > 0) {
  for (const file of galleryFiles) {
    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(fileName, file);

    if (uploadError) {
      setMessage(uploadError.message);
      setLoading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("project-images")
      .getPublicUrl(fileName);

    galleryUrls.push(publicUrl);
  }
}

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        setMessage(uploadError.message);
        setLoading(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrl;
    }

    if (isEditing && editingId) {
     const updateData: any = {
  title,
  slug,
  category,
  client,
  year,
  role,
  description,
  challenge,
  solution,
  result,
  gallery_images: galleryUrls,
  tools: tools
    .split(",")
    .map((tool) => tool.trim())
    .filter(Boolean),
  featured,
};

      if (imageUrl) {
        updateData.cover_image = imageUrl;
      }

      const { error } = await supabase
        .from("projects")
        .update(updateData)
        .eq("id", editingId);

      setLoading(false);

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("Project updated successfully.");
    } else {
      if (!imageFile) {
        setMessage("Please select an image.");
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from("projects")
        .insert([
         {
  title,
  slug,
  category,
  client,
  year,
  role,
  description,
  challenge,
  solution,
  result,
  tools: tools
    .split(",")
    .map((tool) => tool.trim())
    .filter(Boolean),
  cover_image: imageUrl,
  featured,
}
        ]);

      setLoading(false);

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("Project published successfully.");
    }

    await fetchProjects();

    setTitle("");
    setSlug("");
    setCategory("");
    setClient("");
    setYear("");
    setRole("");
    setDescription("");

    setChallenge("");
setSolution("");
setResult("");
setTools("");

    setImageFile(null);
    setFeatured(false);

    setEditingId(null);
    setIsEditing(false);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-5xl font-bold">
          {isEditing ? "Edit Project" : "Add Project"}
        </h1>

        <p className="mb-10 text-zinc-400">
          Publish new work to your archive.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
          />

          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Project URL (example: zylus-homes)"
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
          />

          <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 text-white"
>
  <option value="" className="bg-black">
    Select a category
  </option>

  <option value="real-estate" className="bg-black">
    Real Estate
  </option>

  <option value="food" className="bg-black">
    Food
  </option>

  <option value="events" className="bg-black">
    Events
  </option>

  <option value="hospitality" className="bg-black">
    Hospitality
  </option>

  <option value="medicine" className="bg-black">
    Medicine
  </option>

  <option value="cyber" className="bg-black">
    Cyber
  </option>

  <option value="beverages" className="bg-black">
    Beverages
  </option>
</select>

          <input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Client"
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
          />

          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year (example: 2024–2025)"
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
          />

          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role (example: Branding • Strategy • UI/UX)"
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={6}
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
          />

          <textarea
  value={challenge}
  onChange={(e) => setChallenge(e.target.value)}
  placeholder="Challenge"
  rows={4}
  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
/>

<textarea
  value={solution}
  onChange={(e) => setSolution(e.target.value)}
  placeholder="Solution"
  rows={4}
  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
/>

<textarea
  value={result}
  onChange={(e) => setResult(e.target.value)}
  placeholder="Result"
  rows={4}
  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
/>

<input
  value={tools}
  onChange={(e) => setTools(e.target.value)}
  placeholder="Tools (Figma, Photoshop, Illustrator)"
  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
/>

          <div className="space-y-4">
  <p className="text-sm font-medium text-zinc-300">
    Cover image
  </p>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      setImageFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }}
    className="
      w-full
      cursor-pointer
      rounded-2xl
      border
      border-white/10
      bg-white/5
      p-4
      file:mr-4
      file:cursor-pointer
      file:rounded-xl
      file:border-0
      file:bg-orange-500
      file:px-4
      file:py-2
      file:font-medium
      file:text-black
    "
  />

  {coverPreview && (
    <div className="relative overflow-hidden rounded-2xl border border-white/10">
      <img
        src={coverPreview}
        alt="Cover preview"
        className="h-64 w-full object-cover"
      />

      <button
        type="button"
        onClick={() => {
          setImageFile(null);
          setCoverPreview("");
        }}
        className="
          absolute
          right-3
          top-3
          rounded-full
          bg-red-500
          px-3
          py-1
          text-sm
          font-semibold
          text-white
        "
      >
        Remove
      </button>
    </div>
  )}
</div>

          <p className="text-sm text-zinc-400">
  Gallery images (optional)
</p>

<input
  type="file"
  accept="image/*"
  multiple
  onChange={(e) => {
  const files = e.target.files;

  if (!files) return;

  setGalleryFiles((prev) => [
    ...prev,
    ...Array.from(files),
  ]);
}}
  className="
    w-full
    cursor-pointer
    rounded-2xl
    border
    border-white/10
    bg-white/5
    p-4
    file:mr-4
    file:cursor-pointer
    file:rounded-xl
    file:border-0
    file:bg-orange-500
    file:px-4
    file:py-2
    file:font-medium
    file:text-black
  "
/>
{galleryFiles.length > 0 && (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
    {galleryFiles.map((file, index) => (
      <div
        key={index}
        className="relative overflow-hidden rounded-2xl"
      >
        <img
          src={URL.createObjectURL(file)}
          alt={`Preview ${index}`}
          className="h-32 w-full object-cover"
        />

        <button
          type="button"
          onClick={() => removeGalleryImage(index)}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white"
        >
          ×
        </button>
      </div>
    ))}
  </div>
)}

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="cursor-pointer"
            />

            Featured project
          </label>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-black transition hover:opacity-90"
          >
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Project"
              : "Publish"}
          </button>

          {message && (
            <p className="text-sm text-zinc-300">{message}</p>
          )}
        </form>

        <div className="mt-16">
          <h2 className="mb-6 text-3xl font-bold">
            Your Projects
          </h2>

          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div>
                  <h3 className="font-semibold">
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-400">
                    {project.category}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => editProject(project)}
                    className="cursor-pointer rounded-xl bg-blue-500 px-4 py-2 text-sm transition hover:opacity-90"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteProject(project.id)}
                    className="cursor-pointer rounded-xl bg-red-500 px-4 py-2 text-sm transition hover:opacity-90"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
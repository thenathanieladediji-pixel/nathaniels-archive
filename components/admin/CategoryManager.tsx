"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";
import { getCategories, type CategoryRecord } from "@/lib/categories";

type Category = CategoryRecord;

type CategoryFormValues = {
  name: string;
  slug: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function LoadingState() {
  return (
    <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-zinc-800/70 bg-zinc-900/50 p-10">
      <div className="flex flex-col items-center gap-3 text-zinc-300">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-600 border-t-white" />
        <span className="text-sm">Loading categories…</span>
      </div>
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 px-6 py-12 text-center">
      <div className="mb-4 rounded-full border border-zinc-700 bg-zinc-800/80 p-4 text-zinc-300">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5A2.5 2.5 0 015.5 5H9l2 2h5.5A2.5 2.5 0 0119 9.5v7A2.5 2.5 0 0116.5 19h-11A2.5 2.5 0 013 16.5v-9z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-white">No categories yet</h3>
      <p className="mt-2 max-w-sm text-sm text-zinc-400">Create your first category to start organizing your archive.</p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
      >
        Add category
      </button>
    </div>
  );
}

function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-300">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="6" />
        <path strokeLinecap="round" d="m20 20-4.2-4.2" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search categories"
        className="w-full bg-transparent outline-none placeholder:text-zinc-500"
      />
    </label>
  );
}

function CategoryCard({ category, projectCount, onEdit, onDelete }: { category: Category; projectCount: number; onEdit: () => void; onDelete: () => void }) {
  return (
    <article className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-1 hover:border-zinc-600">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{category.name}</h3>
          <p className="mt-1 text-sm text-zinc-400">/{category.slug}</p>
        </div>
        <span className="rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-xs font-medium text-zinc-300">
          {projectCount} Project{projectCount === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-zinc-800/80 pt-4 text-sm text-zinc-400">
        <span>Created {formatDate(category.created_at)}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-full border border-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-sm font-medium text-rose-200 transition hover:bg-rose-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

function CategoryModal({
  open,
  mode,
  values,
  error,
  saving,
  onClose,
  onChange,
  onSubmit,
}: {
  open: boolean;
  mode: "create" | "edit";
  values: CategoryFormValues;
  error: string;
  saving: boolean;
  onClose: () => void;
  onChange: (field: keyof CategoryFormValues, value: string) => void;
  onSubmit: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">{mode === "create" ? "Add category" : "Edit category"}</h2>
            <p className="mt-1 text-sm text-zinc-400">Keep your portfolio structure tidy and consistent.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white">
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block text-sm text-zinc-300">
            <span className="mb-2 block">Category name</span>
            <input
              autoFocus
              value={values.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none ring-0 focus:border-zinc-500"
              placeholder="Brand identity"
            />
          </label>

          <label className="block text-sm text-zinc-300">
            <span className="mb-2 block">Slug</span>
            <input
              value={values.slug}
              onChange={(e) => onChange("slug", e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none focus:border-zinc-500"
              placeholder="brand-identity"
            />
          </label>

          {error ? <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p> : null}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={saving} className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50">
            Cancel
          </button>
          <button type="button" onClick={onSubmit} disabled={saving} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? (mode === "create" ? "Creating..." : "Saving...") : mode === "create" ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteCategoryModal({
  open,
  category,
  saving,
  onClose,
  onConfirm,
}: {
  open: boolean;
  category: Category | null;
  saving: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open || !category) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-white">Delete “{category.name}”?</h2>
        <p className="mt-3 text-sm text-zinc-400">Deleting this category will not remove the associated projects. If projects are using it, the delete is blocked.</p>

        <div className="mt-8 flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={saving} className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} disabled={saving} className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CategoryManager() {
  const supabase = useMemo(() => createClient(), []);
  const { pushToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [projectCounts, setProjectCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest" | "az" | "za">("newest");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [formValues, setFormValues] = useState<CategoryFormValues>({ name: "", slug: "" });
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      const categoryList = await getCategories();
      setCategories(categoryList);

      const { data: projectsData, error: projectError } = await supabase.from("projects").select("category");
      if (projectError) {
        pushToast(projectError.message, "error");
        setLoading(false);
        return;
      }

      const counts = (projectsData ?? []).reduce<Record<string, number>>((acc, project) => {
        const current = project.category as string | null;
        if (!current) return acc;
        const key = current.toLowerCase();
        const matching = categoryList.find((category) => category.name.toLowerCase() === key || category.slug.toLowerCase() === key);
        if (matching) {
          acc[matching.id] = (acc[matching.id] ?? 0) + 1;
        }
        return acc;
      }, {});

      setProjectCounts(counts);
    } catch (error) {
      pushToast(error instanceof Error ? error.message : "Unable to load categories.", "error");
    } finally {
      setLoading(false);
    }
  }, [pushToast, supabase]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadData]);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormValues({ name: "", slug: "" });
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormValues({ name: category.name, slug: category.slug });
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCategory(null);
    setFormError("");
  };

  const handleNameChange = (value: string) => {
    const slug = slugify(value);
    setFormValues((prev) => ({ ...prev, name: value, slug: prev.slug ? prev.slug : slug }));
    if (value.trim()) {
      setFormError("");
    }
  };

  const handleSlugChange = (value: string) => {
    setFormValues((prev) => ({ ...prev, slug: value }));
    if (value.trim()) {
      setFormError("");
    }
  };

  const validate = (values: CategoryFormValues) => {
    const name = values.name.trim();
    const slug = values.slug.trim();

    if (!name) {
      return "Please enter a category name.";
    }

    if (!slug) {
      return "Please enter a slug.";
    }

    const duplicateName = categories.find((item) => item.id !== editingCategory?.id && item.name.toLowerCase() === name.toLowerCase());
    if (duplicateName) {
      return "A category with this name already exists.";
    }

    const duplicateSlug = categories.find((item) => item.id !== editingCategory?.id && item.slug.toLowerCase() === slug.toLowerCase());
    if (duplicateSlug) {
      return "A category with this slug already exists.";
    }

    return "";
  };

  const handleSubmit = async () => {
    const validationError = validate(formValues);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setSaving(true);
    const payload = {
      name: formValues.name.trim(),
      slug: formValues.slug.trim(),
    };

    try {
      if (editingCategory) {
        const { error } = await supabase.from("categories").update(payload).eq("id", editingCategory.id);
        if (error) {
          pushToast(error.message, "error");
          setSaving(false);
          return;
        }
        pushToast("Category updated successfully.");
      } else {
        const { error } = await supabase.from("categories").insert(payload);
        if (error) {
          pushToast(error.message, "error");
          setSaving(false);
          return;
        }
        pushToast("Category created successfully.");
      }

      await loadData();
      closeModal();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingCategory) return;

    const hasProjects = (projectCounts[deletingCategory.id] ?? 0) > 0;
    if (hasProjects) {
      pushToast("This category contains projects and cannot be deleted.", "error");
      setDeleteModalOpen(false);
      setDeletingCategory(null);
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("categories").delete().eq("id", deletingCategory.id);
      if (error) {
        pushToast(error.message, "error");
        setSaving(false);
        return;
      }
      pushToast("Category deleted successfully.");
      await loadData();
      setDeleteModalOpen(false);
      setDeletingCategory(null);
    } finally {
      setSaving(false);
    }
  };

  const filteredCategories = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    const filtered = categories.filter((category) => {
      if (!normalized) return true;
      return [category.name, category.slug].some((value) => value.toLowerCase().includes(normalized));
    });

    filtered.sort((a, b) => {
      switch (sort) {
        case "oldest":
          return new Date(a.created_at ?? 0).getTime() - new Date(b.created_at ?? 0).getTime();
        case "az":
          return a.name.localeCompare(b.name);
        case "za":
          return b.name.localeCompare(a.name);
        case "newest":
        default:
          return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
      }
    });

    return filtered;
  }, [categories, search, sort]);

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-400">Admin</p>
            <h1 className="mt-2 text-3xl font-semibold">Categories</h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">Manage all portfolio categories from a single, polished workspace.</p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            + Add Category
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={search} onChange={setSearch} />
          <label className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-300">
            <span>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="bg-transparent outline-none">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A–Z</option>
              <option value="za">Z–A</option>
            </select>
          </label>
        </div>

        {loading ? (
          <LoadingState />
        ) : filteredCategories.length === 0 ? (
          <EmptyState onAdd={openCreateModal} />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                projectCount={projectCounts[category.id] ?? 0}
                onEdit={() => openEditModal(category)}
                onDelete={() => {
                  setDeletingCategory(category);
                  setDeleteModalOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <CategoryModal
        open={modalOpen}
        mode={editingCategory ? "edit" : "create"}
        values={formValues}
        error={formError}
        saving={saving}
        onClose={closeModal}
        onChange={(field, value) => {
          if (field === "name") {
            handleNameChange(value);
          } else {
            handleSlugChange(value);
          }
        }}
        onSubmit={handleSubmit}
      />

      <DeleteCategoryModal
        open={deleteModalOpen}
        category={deletingCategory}
        saving={saving}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeletingCategory(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}

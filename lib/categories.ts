import { supabase } from "./supabase";
import { createClient as createBrowserClient } from "@/lib/supabase/client";

export type CategoryRecord = {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
};

export async function getCategories(): Promise<CategoryRecord[]> {
  if (typeof window !== "undefined") {
    const browserSupabase = createBrowserClient();
    const { data, error } = await browserSupabase
      .from("categories")
      .select("id, name, slug, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as CategoryRecord[];
  }

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as CategoryRecord[];
}
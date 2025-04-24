import { supabase } from "./supabase";

export interface DashboardStats {
  totalArticles: number;
  totalAuthors: number;
  activeTickerItems: number;
  activeCarouselItems: number;
}

export interface TickerItem {
  id: string;
  text: string;
  link: string;
  active: boolean;
  order: number;
}

export interface CarouselItem {
  id: string;
  article_id: string;
  active: boolean;
  order: number;
}

export interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url: string;
  position: "side" | "bottom";
  active: boolean;
  start_date: string;
  end_date: string;
}

// Dashboard Statistics
export async function getStats(): Promise<DashboardStats> {
  const [
    { count: totalArticles },
    { count: totalAuthors },
    { count: activeTickerItems },
    { count: activeCarouselItems },
  ] = await Promise.all([
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase
      .from("articles")
      .select("author_id", { count: "exact", head: true })
      .not("author_id", "is", null),
    supabase
      .from("ticker_items")
      .select("*", { count: "exact", head: true })
      .eq("active", true),
    supabase
      .from("carousel_items")
      .select("*", { count: "exact", head: true })
      .eq("active", true),
  ]);

  return {
    totalArticles: totalArticles || 0,
    totalAuthors: totalAuthors || 0,
    activeTickerItems: activeTickerItems || 0,
    activeCarouselItems: activeCarouselItems || 0,
  };
}

// Article Management
export async function getArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createArticle(article: any) {
  const { data, error } = await supabase
    .from("articles")
    .insert([article])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateArticle(id: string, updates: any) {
  const { data, error } = await supabase
    .from("articles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteArticle(id: string) {
  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) throw error;
  return true;
}

// Ticker Management
export async function updateTickerItems(items: TickerItem[]) {
  // First, deactivate all current items
  await supabase
    .from("ticker_items")
    .update({ active: false })
    .neq("id", "00000000-0000-0000-0000-000000000000");

  // Then insert new items
  const { data, error } = await supabase
    .from("ticker_items")
    .insert(items)
    .select();

  if (error) throw error;
  return data;
}

// Carousel Management
export async function updateCarouselItems(items: CarouselItem[]) {
  // First, deactivate all current items
  await supabase
    .from("carousel_items")
    .update({ active: false })
    .neq("id", "00000000-0000-0000-0000-000000000000");

  // Then insert new items
  const { data, error } = await supabase
    .from("carousel_items")
    .insert(items)
    .select();

  if (error) throw error;
  return data;
}

// Ad Management
export async function getActiveAds() {
  const { data, error } = await supabase
    .from("ads")
    .select("*")
    .eq("active", true)
    .gte("end_date", new Date().toISOString())
    .lte("start_date", new Date().toISOString())
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createAd(ad: Omit<Ad, "id">) {
  const { data, error } = await supabase
    .from("ads")
    .insert([ad])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateAd(id: string, updates: Partial<Ad>) {
  const { data, error } = await supabase
    .from("ads")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAd(id: string) {
  const { error } = await supabase.from("ads").delete().eq("id", id);

  if (error) throw error;
  return true;
}

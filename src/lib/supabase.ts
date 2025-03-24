import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          excerpt: string;
          content: string;
          image_url: string;
          category: string;
          author_id: string;
          read_time: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          excerpt: string;
          content: string;
          image_url: string;
          category: string;
          author_id: string;
          read_time: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          image_url?: string;
          category?: string;
          author_id?: string;
          read_time?: string;
        };
      };
      saved_articles: {
        Row: {
          id: string;
          user_id: string;
          article_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          article_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          article_id?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

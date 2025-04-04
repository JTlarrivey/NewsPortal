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
          author_name: string;
          id: string;
          created_at: string;
          title: string;
          excerpt: string;
          content: string;
          image_url: string;
          category: string;
          author_id: string;
          read_time: string;
          video_url: string | null;
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
          video_url?: string | null;
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
          video_url?: string | null;
        };
      };
      article_metrics: {
        Row: {
          article_id: string;
          views: number;
          updated_at: string;
        };
        Insert: {
          article_id: string;
          views: number;
          updated_at: string;
        };
        Update: {
          views?: number;
          updated_at?: string;
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
      ticker_items: {
        Row: {
          id: string;
          text: string;
          link: string;
          active: boolean;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          text: string;
          link: string;
          active?: boolean;
          order: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          text?: string;
          link?: string;
          active?: boolean;
          order?: number;
          created_at?: string;
        };
      };
      carousel_items: {
        Row: {
          id: string;
          article_id: string;
          active: boolean;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          active?: boolean;
          order: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          article_id?: string;
          active?: boolean;
          order?: number;
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

/*
  # Initial Schema Setup

  1. New Tables
    - `articles` table for storing news articles
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `excerpt` (text)
      - `content` (text)
      - `image_url` (text)
      - `category` (text)
      - `author_id` (uuid, references auth.users)
      - `read_time` (text)
    
    - `saved_articles` table for storing user's saved articles
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `article_id` (uuid, references articles)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for article access and saved articles management
*/

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  author_id uuid REFERENCES auth.users(id),
  read_time text NOT NULL
);

-- Create saved_articles table
CREATE TABLE IF NOT EXISTS saved_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  article_id uuid REFERENCES articles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, article_id)
);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_articles ENABLE ROW LEVEL SECURITY;

-- Policies for articles
CREATE POLICY "Articles are viewable by everyone"
  ON articles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authors can insert articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Policies for saved_articles
CREATE POLICY "Users can view their own saved articles"
  ON saved_articles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save articles"
  ON saved_articles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their saved articles"
  ON saved_articles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
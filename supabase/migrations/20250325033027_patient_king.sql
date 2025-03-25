/*
  # News Portal Management Tables

  1. New Tables
    - `ticker_items` table for news ticker content
      - `id` (uuid, primary key)
      - `text` (text)
      - `link` (text)
      - `active` (boolean)
      - `order` (integer)
      - `created_at` (timestamp)
      
    - `carousel_items` table for featured carousel content
      - `id` (uuid, primary key)
      - `article_id` (uuid, references articles)
      - `active` (boolean)
      - `order` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for admin access
*/

-- Create ticker_items table
CREATE TABLE IF NOT EXISTS ticker_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  link text NOT NULL,
  active boolean DEFAULT true,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create carousel_items table
CREATE TABLE IF NOT EXISTS carousel_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  active boolean DEFAULT true,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ticker_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_items ENABLE ROW LEVEL SECURITY;

-- Policies for ticker_items
CREATE POLICY "Ticker items are viewable by everyone"
  ON ticker_items
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Only authenticated users can manage ticker items"
  ON ticker_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for carousel_items
CREATE POLICY "Carousel items are viewable by everyone"
  ON carousel_items
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Only authenticated users can manage carousel items"
  ON carousel_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
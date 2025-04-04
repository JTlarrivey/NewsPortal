/*
  # Add author name and article metrics

  1. Changes
    - Add `author_name` column to `articles` table
      - Optional text field for storing author names
      - Can be NULL for legacy articles
    
    - Create `article_metrics` table for tracking article views
      - `id` (uuid, primary key)
      - `article_id` (uuid, references articles)
      - `views` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on article_metrics table
    - Add policies for viewing and updating metrics
*/

-- Add author_name column to articles
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'articles' 
    AND column_name = 'author_name'
  ) THEN 
    ALTER TABLE articles ADD COLUMN author_name text;
  END IF;
END $$;

-- Create article_metrics table
CREATE TABLE IF NOT EXISTS article_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(article_id)
);

-- Enable RLS
ALTER TABLE article_metrics ENABLE ROW LEVEL SECURITY;

-- Policies for article_metrics
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'article_metrics' 
    AND policyname = 'Article metrics are viewable by everyone'
  ) THEN 
    CREATE POLICY "Article metrics are viewable by everyone"
      ON article_metrics
      FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'article_metrics' 
    AND policyname = 'Authenticated users can update metrics'
  ) THEN 
    CREATE POLICY "Authenticated users can update metrics"
      ON article_metrics
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
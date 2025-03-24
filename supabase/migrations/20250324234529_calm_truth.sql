/*
  # Add video URL to articles table

  1. Changes
    - Add `video_url` column to `articles` table
      - Optional text field for storing video URLs
      - Can be NULL since not all articles will have videos

  2. Notes
    - Uses IF NOT EXISTS to prevent errors if column already exists
    - No changes to existing RLS policies needed as they cover all columns
*/

DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'articles' 
    AND column_name = 'video_url'
  ) THEN 
    ALTER TABLE articles ADD COLUMN video_url text;
  END IF;
END $$;
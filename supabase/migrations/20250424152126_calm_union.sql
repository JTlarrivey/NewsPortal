/*
  # Update Advertisement System

  1. Changes
    - Update ads table position check to include 'popup'
    - Handle existing policies gracefully
    - Ensure index exists for active ads

  2. Security
    - Maintain existing RLS settings
    - Update policies if needed
*/

-- Update the position check constraint
DO $$ 
BEGIN
  ALTER TABLE ads 
    DROP CONSTRAINT IF EXISTS ads_position_check;
  
  ALTER TABLE ads 
    ADD CONSTRAINT ads_position_check 
    CHECK (position IN ('side', 'bottom', 'popup'));
END $$;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Ads are viewable by everyone" ON ads;
  DROP POLICY IF EXISTS "Only authenticated users can manage ads" ON ads;
END $$;

-- Recreate policies
CREATE POLICY "Ads are viewable by everyone"
  ON ads
  FOR SELECT
  TO public
  USING (
    active = true 
    AND now() >= start_date 
    AND now() <= end_date
  );

CREATE POLICY "Only authenticated users can manage ads"
  ON ads
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure index exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_ads_active_dates'
  ) THEN
    CREATE INDEX idx_ads_active_dates ON ads (active, start_date, end_date);
  END IF;
END $$;
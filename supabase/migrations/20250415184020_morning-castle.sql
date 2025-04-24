/*
  # Add Advertisement System Tables

  1. New Tables
    - `ads` table for storing advertisement data
      - `id` (uuid, primary key)
      - `title` (text)
      - `image_url` (text)
      - `link_url` (text)
      - `position` (text)
      - `active` (boolean)
      - `start_date` (timestamp)
      - `end_date` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for viewing and managing ads
*/

CREATE TABLE IF NOT EXISTS ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  link_url text NOT NULL,
  position text NOT NULL CHECK (position IN ('side', 'bottom')),
  active boolean DEFAULT true,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;

-- Policies for ads
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

-- Create index for active ads
CREATE INDEX idx_ads_active_dates ON ads (active, start_date, end_date);
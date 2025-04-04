/*
  # Fix article metrics policies

  1. Changes
    - Drop existing policies on article_metrics table
    - Create new policies that allow:
      - Public viewing of metrics
      - Public creation of metrics
      - Public updates to metrics
    
  2. Security
    - Enable public access for metrics to allow view counting
    - No authentication required for basic metrics operations
    - Maintain data integrity through proper constraints
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN 
  DROP POLICY IF EXISTS "Article metrics are viewable by everyone" ON article_metrics;
  DROP POLICY IF EXISTS "Authenticated users can update metrics" ON article_metrics;
END $$;

-- Create new policies
CREATE POLICY "Enable read access for all users"
  ON article_metrics FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable insert access for all users"
  ON article_metrics FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable update access for all users"
  ON article_metrics FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);
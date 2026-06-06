CREATE TABLE IF NOT EXISTS experienced_leadership_section (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL DEFAULT 'Experienced Leadership',
  subtitle VARCHAR(255) NOT NULL DEFAULT 'Visionary Leaders Driving Innovation',
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO experienced_leadership_section (title, subtitle, description)
SELECT 'Experienced Leadership', 'Visionary Leaders Driving Innovation', 'Our leadership team brings a strong technical background, business insight, and a commitment to building long-lasting products and partnerships.'
WHERE NOT EXISTS (SELECT 1 FROM experienced_leadership_section);

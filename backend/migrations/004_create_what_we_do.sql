CREATE TABLE IF NOT EXISTS what_we_do (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL DEFAULT 'What We Do?',
  description TEXT NOT NULL DEFAULT '',
  services JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO what_we_do (title, description, services)
SELECT
  'What We Do',
  'We turn ideas into practical digital solutions, aligning technology with real business needs. Our work focuses on building smart, scalable, and user-friendly products across web, mobile, and systems.',
  '[
    {"icon": "Settings", "title": "Website Development", "description": "We design and develop modern, responsive websites that are fast, secure, and user-friendly.."},
    {"icon": "Smartphone", "title": "Mobile Apps", "description": "Cross-platform mobile applications using React Native and Flutter"},
    {"icon": "Cloud", "title": "Cloud Solutions", "description": "Scalable cloud infrastructure on AWS, GCP, and Azure."},
    {"icon": "Server", "title": "Enterprise Systems", "description": "Scalable ERP and CRM solutions that automate workflows and deliver real-time business intelligence."}
  ]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM what_we_do);

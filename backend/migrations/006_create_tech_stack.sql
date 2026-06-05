CREATE TABLE IF NOT EXISTS tech_stack (
  id SERIAL PRIMARY KEY,
  icon VARCHAR(100) DEFAULT 'Code',
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) DEFAULT 'Other',
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tech_stack_section (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL DEFAULT 'Our Tech Stack',
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO tech_stack_section (title, description)
SELECT 'Our Tech Stack', 'Cutting-edge technologies we use to build powerful solutions'
WHERE NOT EXISTS (SELECT 1 FROM tech_stack_section);

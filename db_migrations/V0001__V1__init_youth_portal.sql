
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'volunteer' CHECK (role IN ('volunteer', 'admin')),
  avatar_url TEXT,
  dobro_profile_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE volunteers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id),
  hours INTEGER NOT NULL DEFAULT 0,
  rank INTEGER,
  badge VARCHAR(10) DEFAULT '⭐',
  bio TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'Новости',
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  author_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  file_type VARCHAR(20) NOT NULL DEFAULT 'PDF',
  file_url TEXT,
  doc_year VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time VARCHAR(10),
  location TEXT,
  category VARCHAR(100),
  category_color VARCHAR(20) DEFAULT '#d33682',
  dobro_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE event_registrations (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id),
  user_id INTEGER REFERENCES users(id),
  registered_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

CREATE TABLE contests (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  deadline DATE,
  prize TEXT,
  link TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

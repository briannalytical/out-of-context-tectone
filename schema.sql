CREATE TABLE IF NOT EXISTS quotes (
id SERIAL PRIMARY KEY,
quote_text TEXT NOT NULL,
video_name TEXT,
date_added TIMESTAMP DEFAULT now(),
video_date DATE
);
CREATE TABLE quotes (
id SERIAL PRIMARY KEY,
quote_text TEXT NOT NULL,
video_name DATE NOT NULL,
date_added TIMESTAMP DEFAULT now()
);
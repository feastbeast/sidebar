-- psql -U yogitasheth apateezside -f /Users/yogitasheth/desktop/feastbeastsidebar/sidebar/database/postGresSeed.sql
CREATE DATABASE apateez IF NOT EXISTS;

\CONNECT apateez;

DROP TABLE IF EXISTS apateezside;

CREATE TABLE apateezside (
    "id" int,
    "name" text,
    "menu_url" text,
    "address" text,
    "location" text,
    "url" text,
    "phone" text,
    "hours" text[],
    "coordslat" float,
    "coordslng" float,
    PRIMARY KEY ("id")
);

-- /COPY apateezside
-- FROM '/Users/yogitasheth/desktop/feastbeastsidebar/sidebar/database/tenMillionList.csv' DELIMITER '|' csv;
\COPY apateezside FROM './tenMillionList.csv' DELIMITER '|' csv
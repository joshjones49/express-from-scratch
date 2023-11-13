



CREATE TABLE "owners"(
    "id" SERIAL PRIMARY KEY,
    "f_name" VARCHAR(255) NOT NULL,
    "l_name" VARCHAR(255) NOT NULL,
    "age" BIGINT NOT NULL,
    "email" VARCHAR(255) NOT NULL
);

CREATE TABLE "books"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "genre" VARCHAR(255) NOT NULL,
    "year_published" BIGINT NOT NULL,
    "owner_id" BIGINT REFERENCES owners(id)
);


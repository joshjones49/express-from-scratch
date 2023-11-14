//DEPENDENCIES======================
import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const port = 8000;
import pkg from 'pg';
const { Pool } = pkg;
//create instance of pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});
//MIDDLEWARE===========================
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
//ROUTES===================================
//GET ALL--------------------------------------------
            //OWNERS
app.get('/api/owners', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM owners ORDER BY id ASC;');
        res.send(rows)
    } catch (error) {
        res.json(error)
        console.log(error);
    }
});
            //BOOKS
app.get('/api/books', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM books ORDER BY id ASC;')
        res.send(rows)
    } catch (error) {
        res.json(error)
        console.log(error);
    }
});
//GET 1-----------------------------------------
            //OWNERS
app.get('/api/owners/:id', async (req, res) => {
    const id = req.params.id;
    if(isNaN(id)) {
        res.status(404).send('Invalid Entry');
        console.log('Invalid Entry');
    }
    try {
        const {rows} = await pool.query('SELECT * FROM owners WHERE id = $1', [id]);
        res.status(200).send(rows);
        console.log('Owner Found');
    } catch (error) {
        res.json(error)
        console.log(error);
    }
});
            //BOOKS
app.get('/api/books/:id', async (req, res) => {
    const id = req.params.id;
    if(isNaN(id)) {
        res.status(404).send('Invalid Entry');
        console.log('Invalid Entry');
    }
    try {
        const {rows} = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        res.status(200).send(rows);
        console.log('Book Found');
    } catch (error) {
        res.json(error)
        console.log(error);
    }
}); 
//CREATE 1-------------------------------------
            //OWNERS
app.post('/api/owners', async (req, res) => {
    const { f_name, l_name, age, email } = req.body;

    if (!f_name || !l_name || !age || !email ) {
        return res.status(400).json('All fields required');
    }
     try {
        const {rows} = await pool.query(
            'INSERT INTO owners (f_name, l_name, age, email) VALUES ($1, $2, $3, $4) RETURNING*',
            [f_name, l_name, age, email]
        );

        res.status(201).send(rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
}); 
            //BOOKS
app.post('/api/books', async (req, res) => {
    const { name, genre, year_published, owner_id } = req.body;

    if (!name && !genre && !year_published && !owner_id ) {
        return res.status(400).json('All fields required');
    }
     try {
        const {rows} = await pool.query(
            'INSERT INTO books (name, genre, year_published, owner_id) VALUES ($1, $2, $3, $4) RETURNING*',
            [name, genre, year_published, owner_id]
        );

        res.status(201).send(rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
});
//DELETE 1---------------------------------
            //OWNERS
app.delete('/api/owners/:id', async (req, res) => {
    const id = req.params.id;
    if(isNaN(id) || id < 0 ) {
        res.status(404).send('Not Found')
    }
    try {
        const {rows} = await pool.query('DELETE FROM owners WHERE id = $1', [id]);
        res.status(200).send(rows);
    } catch (error) {
        res.json(error)
        console.log(error);
    }
});
            //BOOKS
app.delete('/api/books/:id', async (req, res) => {
    const id = req.params.id;
    if(isNaN(id) || id < 0 ) {
        res.status(404).send('Not Found')
    }
    try {
        const {rows} = await pool.query('DELETE FROM books WHERE id = $1', [id]);
        res.status(200).send(rows);
    } catch (error) {
        res.json(error)
        console.log(error);
    }
}); 
//PATCH 1------------------------------------------- 
            //OWNERS
app.patch('/api/owners/:id', async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.status(404).send('Invalid Entry');
        console.log('Invalid Entry');
        return;
    }
    const {f_name, l_name, age, email } = req.body;

    if (!f_name && !l_name && !age && !email) {
        return res.status(400).json('At least one field required for update');
    }
    try {
        const { rows } = await pool.query(
            'UPDATE owners SET f_name = COALESCE($1, f_name), l_name = COALESCE($2, l_name), age = COALESCE($3, age), email = COALESCE($4, email) WHERE id = $5 RETURNING*',
            [f_name, l_name, age, email, id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Owner not found' });
        }
        res.status(200).json(rows[0]);
        console.log('Owner Updated');
    } catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
});
            //BOOKS
app.patch('/api/books/:id', async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.status(404).send('Invalid Entry');
        console.log('Invalid Entry');
        return;
    }
    const {name, genre, year_published, owner_id } = req.body;

    if (!name && !genre && !year_published && !owner_id) {
        return res.status(400).json('At least one field required for update');
    }
    try {
        const { rows } = await pool.query(
            'UPDATE books SET name = COALESCE($1, name), genre = COALESCE($2, genre), year_published = COALESCE($3, year_published), owner_id = COALESCE($4, owner_id) WHERE id = $5 RETURNING *',
            [name, genre, year_published, owner_id, id]
        );
        if (rows.length === 0) {
            return res.status(404).json('Book not found');
        }
        res.status(200).json(rows[0]);
        console.log('Book Updated');
    } catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
}); 
//LISTENER========================
app.listen(port, () => {
    console.log('server running');
})
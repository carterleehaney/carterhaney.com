const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_:)';

const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'website-test',
    password: 'postgres',
    port: 5432,
});

app.get("/api/message", (req, res) => {
    res.json({ message: "Hello from the backend!"});
});

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM "website-test".users WHERE username = $1', [username]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const isValid = await bcrypt.compare(password, user.rows[0].passwordHash);
        if (!isValid) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
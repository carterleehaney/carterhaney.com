const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

const app = express();
const port = 5000;

// Middleware
app.use(cors({
    // Allow requests from anywhere, change in production :)
    // But also I'm using apache2 as a reverse proxy, so this might not be necessary, not sure yet
    origin: true,
    credentials: true
}));
app.use(express.json());

// PostgreSQL Connection Pool
// These are now in .env instead of being hardcoded :skull:
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

// Test Route
app.get("/api/message", (req, res) => {
    res.json({ message: "Hello from the backend!"});
});

// Login Route
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM "website-test".users WHERE username = $1', [username]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const isValid = await bcrypt.compare(password, user.rows[0].passwordhash);
        if (!isValid) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Verify Route
app.post("/api/verify", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ valid: false });
    }
    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.json({ valid: true });
    } catch (err) {
        res.json({ valid: false });
    }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
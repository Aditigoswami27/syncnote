import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "",//add your database name
  password: "", //password that you created while installing postgre
  port: "", // your database's port number without strings
});
db.connect();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/savenote', async (req, res) => {
  const { url, title, notes } = req.body;
  console.log('Received data:', req.body); // Debugging line
  try {
      const result = await db.query(
          'INSERT INTO Webnotes (url, title, description) VALUES ($1, $2, $3) RETURNING *',
          [url, title, notes]
      );
      console.log('Inserted data:', result.rows[0]); // Debugging line
      res.status(201).json(result.rows[0]);
  } catch (error) {
      console.error('Error saving bookmark:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/editnote', async (req, res) => {
  const { url, title, notes } = req.body;
  try {
      const result = await db.query(
          'UPDATE Webnotes SET title = $2, description = $3 WHERE url = $1 RETURNING *',
          [url, title, notes]
      );
      console.log('Updated data:', result.rows[0]);
      res.status(200).json(result.rows[0]);
  } catch (error) {
      console.error('Error editing note:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/checkurl', async (req, res) => {
  const { url } = req.body;
  try {
      const result = await db.query(
          'SELECT * FROM Webnotes WHERE url = $1',
          [url]
      );
      if (result.rows.length > 0) {
          res.status(200).json({ exists: true, note: result.rows[0] });
      } else {
          res.status(200).json({ exists: false });
      }
  } catch (error) {
      console.error('Error checking URL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/removenote', async (req, res) => {
  const { url } = req.body;
  try {
      const result = await db.query(
          'DELETE FROM Webnotes WHERE url = $1 RETURNING *',
          [url]
      );
      if (result.rowCount > 0) {
          console.log('Deleted data:', result.rows[0]);
          res.status(200).json({ message: 'Note removed successfully', note: result.rows[0] });
      } else {
          res.status(404).json({ error: 'Note not found' });
      }
  } catch (error) {
      console.error('Error removing note:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getnotes', async (req, res) => {
  try {
      const result = await db.query('SELECT * FROM Webnotes');
      res.status(200).json(result.rows);
  } catch (error) {
      console.error('Error fetching notes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

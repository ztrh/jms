const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 9000;
const uri = 'mongodb+srv://shifa:1@cluster0.ww86u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

let db;
let collection;

app.use(bodyParser.json());
app.use(cors());

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('cartDB'); // Replace with your database name
    collection = db.collection('cartItems');
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToDatabase();

app.post('/api/cart', async (req, res) => {
  try {
    const cartItems = req.body;
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      await collection.insertMany(cartItems);
      res.status(200).json({ message: 'Cart items saved successfully!' });
    } else {
      res.status(400).json({ error: 'Invalid cart items' });
    }
  } catch (err) {
    console.error('Error saving cart items:', err);
    res.status(500).json({ error: 'Failed to save cart items' });
  }
});

app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await collection.find({}).toArray();
    res.status(200).json(cartItems);
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

app.delete('/api/cart/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { ObjectId } = require('mongodb');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Cart item deleted successfully!' });
    } else {
      res.status(404).json({ error: 'Cart item not found' });
    }
  } catch (err) {
    console.error('Error deleting cart item:', err);
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
});


app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
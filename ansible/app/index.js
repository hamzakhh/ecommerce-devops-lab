const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

// ─────────────────────────────────────────
// Connexion MongoDB
// ─────────────────────────────────────────
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ─────────────────────────────────────────
// Modèle Produit
// ─────────────────────────────────────────
const Product = mongoose.model('Product', new mongoose.Schema({
  name:  { type: String, required: true },
  price: { type: Number, required: true },
}));

// ─────────────────────────────────────────
// Seed — données initiales
// ─────────────────────────────────────────
async function seed() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: 'Laptop', price: 1200 },
      { name: 'Phone',  price: 800  },
      { name: 'Tablet', price: 450  },
    ]);
    console.log('🌱 Products seeded');
  }
}
seed();

// ─────────────────────────────────────────
// Routes
// ─────────────────────────────────────────
app.get('/', async (req, res) => {
  const products = await Product.find();
  const html = `
    <html><head><title>E-Commerce Store</title>
    <style>
      body { font-family: Arial, sans-serif; max-width: 800px;
             margin: 40px auto; padding: 0 20px; }
      h1   { color: #333; }
      .card { border: 1px solid #ddd; border-radius: 8px;
              padding: 16px; margin: 12px 0; display: flex;
              justify-content: space-between; align-items: center; }
      .price { font-size: 1.4em; color: #e63; font-weight: bold; }
    </style></head>
    <body>
      <h1>🛒 E-Commerce Store</h1>
      ${products.map(p => `
        <div class="card">
          <span>${p.name}</span>
          <span class="price">$${p.price}</span>
        </div>`).join('')}
    </body></html>`;
  res.send(html);
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ─────────────────────────────────────────
// Start
// ─────────────────────────────────────────
app.listen(PORT, () => console.log(`🚀 App running on port ${PORT}`));
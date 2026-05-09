const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample tour packages data
const tourPackages = [
  {
    id: 1,
    name: "Kabul City Explorer",
    level: "easy",
    duration: "3 days",
    price: 299,
    description: "Discover Kabul's rich history and culture with guided city tours."
  },
  {
    id: 2,
    name: "Bamiyan Valley Adventure",
    level: "classic",
    duration: "5 days",
    price: 599,
    description: "Explore the ancient Buddha statues and scenic valleys."
  },
  {
    id: 3,
    name: "Hindu Kush Trek",
    level: "giga",
    duration: "10 days",
    price: 1299,
    description: "Extreme trekking through Afghanistan's highest peaks."
  }
];

// Routes
app.get('/api/packages', (req, res) => {
  res.json({
    success: true,
    data: tourPackages
  });
});

app.get('/api/packages/:id', (req, res) => {
  const packageId = parseInt(req.params.id);
  const tourPackage = tourPackages.find(pkg => pkg.id === packageId);

  if (!tourPackage) {
    return res.status(404).json({
      success: false,
      message: 'Tour package not found'
    });
  }

  res.json({
    success: true,
    data: tourPackage
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Simple validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required'
    });
  }

  // In a real application, you would save this to a database
  console.log('Contact form submission:', { name, email, message });

  res.json({
    success: true,
    message: 'Thank you for your message! We will get back to you soon.'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`BroTravels API server running on port ${PORT}`);
});
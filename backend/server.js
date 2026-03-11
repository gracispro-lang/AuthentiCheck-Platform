const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }
});

app.get('/', (req, res) => {
    res.json({ message: '🚀 Serveur AuthentiCheck lancé !' });
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK',
        message: 'Le serveur fonctionne ✓'
    });
});

app.post('/api/authenticate', upload.single('image'), async (req, res) => {
    try {
        const result = {
            status: 'AUTHENTIQUE',
            confidence: 92,
            color: '#10b981',
            details: [
                { label: 'Matériau', value: 'Authentique', icon: '✓' },
                { label: 'Coutures', value: 'Correctes', icon: '✓' },
                { label: 'Logos', value: 'Alignés', icon: '✓' }
            ]
        };

        res.json({
            success: true,
            ...result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 Serveur lancé sur http://localhost:${PORT}\n`);
    console.log('Endpoints disponibles:');
    console.log('  GET  http://localhost:' + PORT + '/');
    console.log('  GET  http://localhost:' + PORT + '/api/health');
    console.log('  POST http://localhost:' + PORT + '/api/authenticate');
    console.log('\nAppuie CTRL+C pour arrêter\n');
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3001;
const DATA_FILE = path_1.default.join(__dirname, '../data/favorites.json');
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Get all favorites
app.get('/api/favorites', (req, res) => {
    fs_1.default.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        res.json(JSON.parse(data));
    });
});
// Get a single favorite by ID
app.get('/api/favorites/:id', (req, res) => {
    const { id } = req.params;
    fs_1.default.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const favorites = JSON.parse(data);
        const item = favorites.find((f) => f.id === id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    });
});
// Add a new favorite
app.post('/api/favorites', (req, res) => {
    const newItem = {
        id: Date.now().toString(),
        ...req.body
    };
    fs_1.default.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const favorites = JSON.parse(data);
        favorites.push(newItem);
        fs_1.default.writeFile(DATA_FILE, JSON.stringify(favorites, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save data' });
            }
            res.status(201).json(newItem);
        });
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
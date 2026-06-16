import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

app.use(cors());
app.use(bodyParser.json());

// Get all favorites
app.get('/api/favorites', async (req, res) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Get a single favorite by ID
app.get('/api/favorites/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Add a new favorite
app.post('/api/favorites', async (req, res) => {
  const newItem = {
    id: Date.now().toString(),
    ...req.body
  };

  const { data, error } = await supabase
    .from('favorites')
    .insert([newItem])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// CREATE
router.post('/', async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.send(recipe);
});

// READ ALL
router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.send(recipes);
});

// READ BY ID
router.get('/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.send(recipe);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.send({ message: 'Deleted Successfully' });
});

module.exports = router;

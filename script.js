const API_URL = 'http://localhost:5000/api/recipes';

// Load All Recipes
async function loadRecipes() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const container = document.getElementById('recipeList');
  const countDisplay = document.getElementById('recipeCount');

  if (!container) return;

  container.innerHTML = data.map(r => `
    <div class="recipe">
      <h3>${r.title}</h3>
      <p><b>Ingredients:</b> ${r.ingredients}</p>
      <p><b>Instructions:</b> ${r.instructions}</p>
      <button onclick="deleteRecipe('${r._id}')">🗑️ Delete</button>
    </div>
  `).join('');

  countDisplay.innerHTML = `<h3>Total Recipes: ${data.length}</h3>`;
  window.allRecipes = data; // store for searching
}

// Search Recipes
function searchRecipes() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const container = document.getElementById('recipeList');
  const filtered = window.allRecipes.filter(r =>
    r.title.toLowerCase().includes(query) ||
    r.ingredients.toLowerCase().includes(query)
  );

  container.innerHTML = filtered.map(r => `
    <div class="recipe">
      <h3>${r.title}</h3>
      <p><b>Ingredients:</b> ${r.ingredients}</p>
      <p><b>Instructions:</b> ${r.instructions}</p>
      <button onclick="deleteRecipe('${r._id}')">🗑️ Delete</button>
    </div>
  `).join('');
}

// Delete Recipe
async function deleteRecipe(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadRecipes();
}

// Add Recipe (used in add.html)
async function addRecipe() {
  const title = document.getElementById('title').value;
  const ingredients = document.getElementById('ingredients').value;
  const instructions = document.getElementById('instructions').value;

  if (!title || !ingredients || !instructions) {
    alert('Please fill all fields!');
    return;
  }

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, ingredients, instructions })
  });

  alert('✅ Recipe Added Successfully!');
  window.location.href = 'index.html';
}

window.onload = loadRecipes;

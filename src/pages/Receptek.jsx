import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importáld a Link komponenst

const Receptek = () => {
  const [category, setCategory] = useState('all');
  const recipes = [
    { id: 1, title: 'Tökfőzelék', category: 'főétel' },
    { id: 2, title: 'Tiramisu', category: 'desszert' },
    // Firebase-ből jönnének ezek
  ];

  const filteredRecipes = category === 'all' ? recipes : recipes.filter(recipe => recipe.category === category);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="text-center mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">Összes recept</option>
          <option value="desszert">Desszert</option>
          <option value="főétel">Főétel</option>
        </select>

        {/* Vissza gomb a blog oldalra */}
        <Link to="/blog" className="ml-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Vissza
          </button>
        </Link>
      </div>

      {/* Recept kártyák konténere */}
      <div className="recipe-container">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3 className="recipe-title">{recipe.title}</h3>
            <p className="recipe-category">Kategória: {recipe.category}</p>
            <Link
              to={`/blog/recipe/${recipe.id}`}
              className="recipe-button"
            >
              További részletek
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Receptek;
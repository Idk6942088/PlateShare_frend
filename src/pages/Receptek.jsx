import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

const Receptek = ({db}) => {
  const [category, setCategory] = useState('all');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Receptek betöltése Firebase-ből
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'receptek'));
        const recipesData = [];
        
        querySnapshot.forEach((doc) => {
          recipesData.push({
            id: doc.id,
            title: doc.data().nev,
            category: doc.data().kategoria
          });
        });

        setRecipes(recipesData);
        setLoading(false);
      } catch (err) {
        console.error('Hiba a receptek betöltésekor:', err);
        setError('Hiba történt a receptek betöltésekor');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Receptek szűrése kategória alapján
  const filteredRecipes = category === 'all' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === category);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 receptek">
      <div className="text-center mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded-md"
        >
          <option value="all">Összes recept</option>
          <option value="Főétel">Főétel</option>
          <option value="Leves">Leves</option>
          <option value="Desszert">Desszert</option>
          <option value="Saláta">Saláta</option>
          <option value="Snack">Snack</option>
          <option value="Szendvics">Szendvics</option>
        </select>

        <Link to="/blog" className="ml-4">
          <button className="px-4 py-2 text-white rounded-md">
            Vissza
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 receptek_kartyak">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              <p className="text-gray-600 mb-4">Kategória: {recipe.category}</p>
              <Link
                to={`/blog/recipe/${recipe.id}`}
                className="inline-block px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                További részletek
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p>Nincsenek receptek ebben a kategóriában</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Receptek;
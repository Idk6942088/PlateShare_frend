import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ReceptUpload = () => {
  const [recipe, setRecipe] = useState({ title: '', description: '', image: null, category: 'főétel' });
  const [fileName, setFileName] = useState('Nincs fájl kiválasztva');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRecipe({ ...recipe, image: file });
      setFileName(file.name);
    } else {
      setFileName('Nincs fájl kiválasztva');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Firebase adatküldés itt
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mt-8">Recept feltöltése</h1>
      <form className="mt-6 w-96" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recept címe"
          value={recipe.title}
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <textarea
          placeholder="Recept leírása"
          value={recipe.description}
          onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <select
          value={recipe.category}
          onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        >
          <option value="főétel">Főétel</option>
          <option value="desszert">Desszert</option>
        </select>
        <div className="file-input-container">
          <input
            type="file"
            onChange={handleImageChange}
            className="file-input"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="custom-file-button">
            Fájl kiválasztása
          </label>
          <div className="file-name">{fileName}</div>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Feltöltés
        </button>
        <Link to="/Blog">
          <button
            type="submit"
            className="w-full px-6 mt-3 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Vissza
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ReceptUpload;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../App';
import axios from 'axios';

const ReceptUpload = () => {
  const [recipe, setRecipe] = useState({ 
    nev: '', 
    kategoria: 'Főétel', 
    hozzavalok: '', 
    elkeszites: '' 
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      const add = await addDoc(collection(db, 'receptek'), {
        nev: recipe.nev,
        kategoria: recipe.kategoria,
        hozzavalok: recipe.hozzavalok,
        elkeszites: recipe.elkeszites,
        imageUrl: "",
        createdAt: new Date()
      });
      
      if(add!= null) {
        formData.append("fajl",imageFile);
        formData.append("publicID",add._key.path.segments[1]);
        const resp = await axios.post("http://localhost:88/recept",formData);
        await updateDoc(doc(db, "receptek", add._key.path.segments[1]), { imageUrl:resp.data.url });
      }
      
      // Sikeres feltöltés üzenet
      alert('A receptet sikeresen feltöltötted!');
      
      // Űrlap mezőinek törlése
      setRecipe({ 
        nev: '', 
        kategoria: 'Főétel', 
        hozzavalok: '', 
        elkeszites: '' 
      });
      
      // File input resetelése
      e.target.reset();
    } catch (error) {
      console.error('Hiba a feltöltés során:', error);
      alert('Hiba történt a feltöltés során!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Recept feltöltése</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Recept neve</label>
            <input
              type="text"
              name="nev"
              value={recipe.nev}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Kategória</label>
            <select
              name="kategoria"
              value={recipe.kategoria}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="Főétel">Főétel</option>
              <option value="Leves">Leves</option>
              <option value="Desszert">Desszert</option>
              <option value="Saláta">Saláta</option>
              <option value="Snack">Snack</option>
              <option value="Szendvics">Szendvics</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Hozzávalók (soronként egy)</label>
            <textarea
              name="hozzavalok"
              value={recipe.hozzavalok}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Elkészítés (soronként egy lépés)</label>
            <textarea
              name="elkeszites"
              value={recipe.elkeszites}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows="6"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Kép (opcionális)</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
              accept="image/*"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded ${isSubmitting ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            >
              {isSubmitting ? 'Feltöltés...' : 'Recept feltöltése'}
            </button>
            
            <Link to="/blog">
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Vissza
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceptUpload;
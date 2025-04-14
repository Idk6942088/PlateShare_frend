import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../App';
import axios from 'axios';

const ReceptUpload = ({user}) => {
  const [recipe, setRecipe] = useState({ 
    nev: '', 
    kategoria: 'Főétel', 
    hozzavalok: '', 
    elkeszites: '' 
  });
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('Nincs fájl kiválasztva');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setFileName(file ? file.name : 'Nincs fájl kiválasztva');
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
        userID: user.reloadUserInfo.localId,
        createdAt: new Date()
      });
      
      if(add != null && imageFile) {
        formData.append("fajl", imageFile);
        formData.append("publicID", add._key.path.segments[1]);
        const resp = await axios.post("http://localhost:88/recept", formData);
        await updateDoc(doc(db, "receptek", add._key.path.segments[1]), { 
          imageUrl: resp.data.url 
        });
      }
      
      alert('A receptet sikeresen feltöltötted!');
      
      // Űrlap resetelése
      setRecipe({ 
        nev: '', 
        kategoria: 'Főétel', 
        hozzavalok: '', 
        elkeszites: '' 
      });
      setImageFile(null);
      setFileName('Nincs fájl kiválasztva');
      e.target.reset();
    } catch (error) {
      console.error('Hiba a feltöltés során:', error);
      alert('Hiba történt a feltöltés során!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen receptUpl py-8 px-4">
      <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Recept feltöltése</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Recept neve */}
          <div className="mb-4">
            <label className="blockmb-2">Recept neve</label>
            <input
              type="text"
              name="nev"
              value={recipe.nev}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Pl. Tökfőzelék"
              required
            />
          </div>

          {/* Kategória */}
          <div className="mb-4">
            <label className="block mb-2">Kategória</label>
            <select
              name="kategoria"
              value={recipe.kategoria}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          {/* Hozzávalók */}
          <div className="mb-4">
            <label className="block mb-2">Hozzávalók (soronként egy)</label>
            <textarea
              name="hozzavalok"
              value={recipe.hozzavalok}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              placeholder="1 kg tök&#10;2 evőkanál olaj&#10;1 teáskanál só"
              required
            />
          </div>

          {/* Elkészítés */}
          <div className="mb-4">
            <label className="block mb-2">Elkészítés (soronként egy lépés)</label>
            <textarea
              name="elkeszites"
              value={recipe.elkeszites}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="6"
              placeholder="Megpucoljuk a tököt&#10;Felvágjuk kockára&#10;Pároljuk olajon"
              required
            />
          </div>

          {/* Fájl kiválasztó - új design */}
          <div className="mb-6">
            <label className="block mb-2">Recept képe (opcionális)</label>
            
            <div className="relative">
              <input
                type="file"
                id="fileInput"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
              />
              
              <div className={`px-4 py-3 rounded border ${fileName === 'Nincs fájl kiválasztva' ? 'border-gray-300 bg-gray-50' : 'border-blue-500 bg-blue-50'} text-center transition-colors`}>
                <div className="flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="truncate max-w-xs">{fileName}</span>
                </div>
              </div>
            </div>
            
            <p className="mt-1 text-sm text-gray-500">
              Kattints a feltöltéshez (JPG, PNG max. 5MB)
            </p>
          </div>

          {/* Gombok */}
          <div className="gombok flex space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-4 py-2 rounded ${isSubmitting ? 'feltoltes_gomb_masik' : 'feltoltes_gomb'} text-white transition-colors`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center feltoltes_gomb">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Feltöltés...
                </span>
              ) : 'Recept feltöltése'}
            </button>
            
            <Link to="/blog" className="flex-1">
              <button
                type="button"
                className=" py-2 rupl_megse rounded transition-colors"
              >
                Mégse
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceptUpload;
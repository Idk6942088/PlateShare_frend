import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../App';
import axios from 'axios';

const ReceptSzerkesztes = ({ db, user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recept, setRecept] = useState({
    nev: '',
    kategoria: 'Főétel',
    hozzavalok: '',
    elkeszites: '',
    kep: ''
  });
  const [newImage, setNewImage] = useState(null);
  const [fileName, setFileName] = useState('Nincs fájl kiválasztva');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [betoltes, setBetoltes] = useState(true);

  // Recept betöltése
  useEffect(() => {
    const betoltRecept = async () => {
      try {
        const docRef = doc(db, 'receptek', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Tulajdonos ellenőrzése
          if (data.userID !== user?.reloadUserInfo?.localId) {
            navigate('/receptjeim');
            return;
          }
          setRecept(data);
          setFileName(data.kep ? 'Jelenlegi kép' : 'Nincs fájl kiválasztva');
        } else {
          navigate('/receptjeim');
        }
      } catch (error) {
        console.error('Hiba a recept betöltésekor:', error);
        navigate('/receptjeim');
      } finally {
        setBetoltes(false);
      }
    };

    if (user) {
      betoltRecept();
    }
  }, [id, db, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecept(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setFileName(file ? file.name : 'Nincs fájl kiválasztva');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updateData = {
        nev: recept.nev,
        kategoria: recept.kategoria,
        hozzavalok: recept.hozzavalok,
        elkeszites: recept.elkeszites,
        updatedAt: new Date()
      };

      if (newImage) {
        const formData = new FormData();
        formData.append("fajl", newImage);
        formData.append("publicID", id);
        const resp = await axios.post("http://plateshare-bkend.onrender.com/recept", formData);
        updateData.kep = resp.data.url;
      }

      await updateDoc(doc(db, 'receptek', id), updateData);
      alert('A receptet sikeresen frissítettük!');
      navigate('/receptjeim');
    } catch (error) {
      console.error('Hiba a frissítés során:', error);
      alert('Hiba történt a frissítés során!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-xl font-bold text-red-500 mb-4">Be kell jelentkezned a szerkesztéshez</h2>
          <Link to="/auth/in" className="text-blue-500 hover:underline">
            Bejelentkezés
          </Link>
        </div>
      </div>
    );
  }

  if (betoltes) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Recept szerkesztése</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Recept neve</label>
            <input
              type="text"
              name="nev"
              value={recept.nev}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Kategória</label>
            <select
              name="kategoria"
              value={recept.kategoria}
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Hozzávalók (soronként egy)</label>
            <textarea
              name="hozzavalok"
              value={recept.hozzavalok}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Elkészítés (soronként egy lépés)</label>
            <textarea
              name="elkeszites"
              value={recept.elkeszites}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="6"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Recept képe</label>
            
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
            
            {recept.kep && !newImage && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Jelenlegi kép:</p>
                <img src={recept.kep} alt="Jelenlegi kép" className="mt-1 h-24 object-cover rounded" />
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-4 py-2 rounded ${isSubmitting ? 'bg-blue-300' : 'receptek_szerkeszt_gomb'} text-white transition-colors`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mentés...
                </span>
              ) : 'Mentés'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/receptjeim')}
              className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors"
            >
              Mégse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceptSzerkesztes;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

const ReceptReszlet = ({db}) => {
  const { id } = useParams();
  const [recept, setRecept] = useState(null);
  const [betoltes, setBetoltes] = useState(true);

  // Recept és értékelések betöltése
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Recept betöltése
        const docRef = doc(db, "receptek", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setRecept(docSnap.data());
          
        }
      } catch (error) {
        console.error("Hiba az adatok betöltésekor:", error);
      } finally {
        setBetoltes(false);
      }
    };

    fetchData();
  }, [id, db]);



  if (!recept) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-bold text-red-500 mb-2">Recept nem található</h2>
        <Link to="/blog/receptek" className="text-blue-500">Vissza a receptekhez</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Fejléc */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/blog/receptek" className="flex items-center vissza_gomb">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /> </svg>
            Vissza a receptekhez
          </Link>
        </div>

        {/* Recept kártya */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Recept képe */}
          {recept.imageUrl && (
            <div className="h-64 md:h-80 overflow-hidden">
              <img 
                src={recept.imageUrl} 
                alt={recept.nev} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Recept tartalma */}
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{recept.nev}</h1>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {recept.kategoria}
              </span>
            </div>
            
            {/* Hozzávalók */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-2">Hozzávalók</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recept.hozzavalok.split('\n').map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Elkészítés */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-2">Elkészítés</h2>
              <ol className="space-y-4">
                {recept.elkeszites.split('\n').map((step, i) => (
                  <li key={i} className="flex">
                    <span className="flex-shrink-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">
                      {i + 1}
                    </span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptReszlet;
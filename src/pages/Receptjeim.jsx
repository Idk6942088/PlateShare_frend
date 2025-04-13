import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

export const Receptjeim = ({ db, user }) => {
  const [receptek, setReceptek] = useState([]);
  const [betoltes, setBetoltes] = useState(true);
  const [hiba, setHiba] = useState(null);
  const [torlesFolyamatban, setTorlesFolyamatban] = useState(null);
  const [felhasznaloId, setFelhasznaloId] = useState(null);

  // Felhasználó ID lekérése

  console.log(user);

  // Receptek betöltése
  useEffect(() => {
    const betoltReceptek = async () => {

      try {
        if (user) {
          const q = query(
            collection(db, 'receptek'),
            where('userID', '==', user.reloadUserInfo.localId)
          );

          const querySnapshot = await getDocs(q);
          const receptLista = [];

          querySnapshot.forEach((doc) => {
            receptLista.push({
              id: doc.id,
              ...doc.data()
            });
          });
          setReceptek(receptLista);
          setBetoltes(false);
          setHiba(null);
        } else {
          setHiba('Be kell jelentkezned a receptjeid megtekintéséhez');
          setBetoltes(false);
          return;

        }




      } catch (error) {
        console.error('Hiba a receptek betöltésekor:', error);
        setHiba('Hiba történt a receptek betöltésekor');
        setBetoltes(false);
      }
    };

    betoltReceptek();
  }, [user]);

  // Recept törlése
  const torolReceptet = async (receptId) => {
    try {
      setTorlesFolyamatban(receptId);
      await deleteDoc(doc(db, 'receptek', receptId));
      setReceptek(receptek.filter(recept => recept.id !== receptId));
    } catch (error) {
      console.error('Hiba a recept törlésekor:', error);
      setHiba('Hiba történt a recept törlésekor');
    } finally {
      setTorlesFolyamatban(null);
    }
  };

  if (betoltes) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (hiba) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-xl font-bold text-red-500 mb-4">{hiba}</h2>
          {!user && (
            <Link
              to="/auth/in"
              className="text-blue-500 hover:underline"
            >
              Bejelentkezés
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (receptek.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">Még nincsenek receptjeid</h2>
          <Link
            to="/blog/receptupload"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Új recept létrehozása
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Receptjeim</h1>
          <Link
            to="/blog/receptupload"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            + Új recept
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {receptek.map((recept) => (
            <div key={recept.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {recept.kep && (
                <img
                  src={recept.kep}
                  alt={recept.nev}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{recept.nev}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {recept.kategoria}
                  </span>
                </div>
                <div className="flex justify-between mt-4">
                  <Link
                    to={`/receptjeim/${recept.id}`}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Szerkesztés
                  </Link>

                  <button
                    onClick={() => torolReceptet(recept.id)}
                    disabled={torlesFolyamatban === recept.id}
                    className={`text-sm ${torlesFolyamatban === recept.id ? 'text-gray-400' : 'text-red-500 hover:underline'}`}
                  >
                    {torlesFolyamatban === recept.id ? 'Törlés...' : 'Törlés'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
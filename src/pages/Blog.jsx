import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Header */}
      <header className="text-center p-4">
        <h1 className="text-3xl font-bold text-gray-800">Receptmegosztó</h1>
        <p className="text-lg text-gray-600 mt-2">Oszd meg a receptjeidet és fedezd fel másokét!</p>
      </header>

      {/* Külön elválasztott gombok */}
      <div className="flex space-x-4 mt-8">
        <Link to="/blog/receptupload">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Recept feltöltése
          </button>
        </Link>
        <Link to="/blog/receptek">
          <button className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600">
            Receptek megtekintése
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Blog;
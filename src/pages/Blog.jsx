import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div className="blog  flex flex-col items-center justify-center">
      {/* Header */}
      <header className="text-center p-4">
      <h1 className=" font-bold">Receptmegosztó</h1>
        <p className="text-lg text-gray-600 mt-2">Oszd meg a receptjeidet és fedezd fel másokét!</p>
      </header>

      {/* Külön elválasztott gombok */}
      <div className="flex space-x-4 mt-8">
        <Link to="/blog/receptupload">
        <button className="px-6 py-3 blog_bal rounded-md">
            Recept feltöltése
          </button>
        </Link>
        <Link to="/blog/receptek">
        <button className="px-6 py-3 blog_jobb rounded-md">
            Receptek megtekintése
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Blog;
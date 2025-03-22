import React from 'react'
import { Link } from 'react-router-dom';

export default function Notfound() {
  return (
    <div className='notfound-cimsor'>
      <h1 className='notfound-betumeret'>Ilyen oldal nem található!</h1>
      <Link to="/">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 notfound-button">Vissza a fő oldara</button>
      </Link>
    </div>
    

  )
}

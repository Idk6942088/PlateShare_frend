import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Upload({partner}) {

  async function upload() {
    console.log("uploading...");
    
    // upload the file
  }

  return (
    <div>{partner ? <div className='feltoltes  m-auto p-5 drop-shadow-xl'>
    <h1 className='text-2xl font-bold text-center mb-1'>Étel feltöltése</h1>
    <div className='flex flex-col gap-3'>
        <input type="text" placeholder='Étel neve' />
        <input type="number" placeholder='Étel ára' />
        <input type="text" placeholder='Étel leírása' />
        <select className='p-2 border-2 border-gray-300 rounded-md'>
          <option value="">Válassz egy kategóriát</option>
          <option value="leves">Leves</option>
          <option value="foetel">Főétel</option>
          <option value="desszert">Desszert</option>
          <option value="ital">Ital</option>
        </select>
        <input type="text" placeholder='Étel mennyisége' />
        <div className='flex gap-3'>
          <input type="date" placeholder='Étel átvehető' />
          <input type="time" placeholder='Mettől' />
          <input type="time" placeholder='Meddig' />
        </div>
        <input type="text" placeholder='Étel lejárati ideje' />
        <input type="text" placeholder='Étel helyszíne' />
        
        <input type="file" />
        <button className='bg-amber-500 text-white p-2 rounded-md cursor-pointer' onClick={upload}>Feltöltés</button>
    </div>
    </div>
     : <Navigate to="/"/>}</div>
  )
}

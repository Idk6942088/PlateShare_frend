import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom'

export default function Upload({partner,db}) {

  const [ar,setAr] = useState("");
  const [meddig,setMeddig] = useState("");
  const [mettol,setMettol] = useState("");
  const [mennyiseg,setMennyiseg] = useState("");
  const [leiras,setLeiras] = useState("");
  const [nev,setNev] = useState("");
  const [lejarat,setLejarat] = useState("");
  const [helyszin,setHelyszin] = useState("");
  const [kategoria,setKategoria] = useState("");
  const [file,setFile] = useState("");
  const[date,setDate] = useState("");

  const date1 = new Date(date);
  
  async function upload() {
    await addDoc(collection(db, "etelek"), {ar:ar,ddb:mennyiseg,helyszin:helyszin,mettol:Timestamp.fromDate(date1),meddig:meddig,partnernev:"Penny"}); // AutoID
    console.log("uploading...");
    
    console.log(ar,meddig,mettol,mennyiseg,leiras,nev,lejarat,helyszin,kategoria,file);
    
    // upload the file
  }

  return (
    <div>{partner ? <div className='feltoltes  m-auto p-5 drop-shadow-xl'>
    <h1 className='text-2xl font-bold text-center mb-1'>Étel feltöltése</h1>
    <div className='flex flex-col gap-3'>
        <input type="text" placeholder='Étel neve' value={nev} onChange={ e => setNev(e.target.value)} />
        <input type="number"  min={0} placeholder='Étel ára' value={ar} onChange={ e => setAr(e.target.value)}/>
        <input type="text" placeholder='Étel leírása' value={leiras} onChange={ e => setLeiras(e.target.value)}/>
        <select className='p-2 border-2 border-gray-300 rounded-md' onChange={e => setKategoria(e.target.value)} >
          <option value="">Válassz egy kategóriát</option>
          <option value="Leves">Leves</option>
          <option value="Főétel">Főétel</option>
          <option value="Desszert">Desszert</option>
          <option value="Ital">Ital</option>
        </select>
        <input type="number" min={1} placeholder='Étel mennyisége' value={mennyiseg} onChange={ e => setMennyiseg(e.target.value)} />
        <div className='flex gap-3'>
          <input type="date" placeholder='Étel átvehető' value={date} onChange={e => setDate(e.target.value)} />
          <input type="time" placeholder='Mettől' value={mettol} onChange={ e => setMettol(e.target.value)} />
          <input type="time" placeholder='Meddig' value={meddig} onChange={ e => setMeddig(e.target.value)}/>
        </div>
        <input type="text" placeholder='Étel lejárati ideje' value={lejarat} onChange={ e => setLejarat(e.target.value)} />
        <input type="text" placeholder='Étel helyszíne' value={helyszin} onChange={ e => setHelyszin(e.target.value)}/>
        
        <input type="file" />
        <button className='bg-amber-500 text-white p-2 rounded-md cursor-pointer' onClick={upload}>Feltöltés</button>
    </div>
    </div>
     : <Navigate to="/"/>}</div>
  )
}

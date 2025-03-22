import React from 'react';
import { useParams } from 'react-router-dom';

const ReceptRészlet = () => {
  const { id } = useParams(); // Az URL-ből kinyerjük a recept ID-jét

  return (
    <div>
      <h1>Recept részletei: {id}</h1>
      {/* Itt jelenítsd meg a recept részleteit */}
    </div>
  );
};

export default ReceptRészlet;
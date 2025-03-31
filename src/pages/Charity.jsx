import React from 'react';

const charities = [
  {
    name: 'Gyermekétkeztetési alapítvány',
    description: '​A Gyermekétkeztetési Alapítvány egy kiemelten közhasznú nonprofit szervezet, amelyet 1993-ban alapított Dr. Fekete Eszter ügyvéd. Az alapítvány célja, hogy Magyarországon minden gyermek rendszeresen elegendő, jó minőségű és egészséges táplálékhoz jusson, elősegítve ezzel a fiatalok megfelelő fizikai és szellemi fejlődését. ​',
    image: 'https://gyea.hu/gyea_media/images/_aktualis/kisfiu-panettone.jpg',
    link: 'https://gyea.hu/nyitooldal'
  },
  {
    name: 'Magyar Élelmiszerbank Egyesület',
    description: 'A Magyar Élelmiszerbank Egyesület non-profit szervezet. Célunk, hogy kapcsolatot teremtsünk az országunkban felhalmozódó élelmiszerfeleslegek és az arra rászorulók között. Elősegítjük az élelmiszerpazarlás és a nélkülözés csökkenését Magyarországon, hozzájárulva egyben az élelmiszerek megsemmisítése okozta környezetterhelés csökkentéséhez.',
    image: 'https://www.elelmiszerbank.hu/UploadedImages//hova-kerulnek-800x800.jpg',
    link: 'https://www.elelmiszerbank.hu/hu/rolunk/kik_vagyunk.html'
  },
  {
    name: 'Unicef',
    description: 'Az alultápláltság és az éhezés nagyon nagy problémát jelent a szegény, fejlődő országokban. Azok a gyerekek, akik éheznek, kisebbek, törékenyebbek az átlagnál, sokkal könnyebben betegednek meg fertőző betegségekben. Egy gyermek fogantatása és két éves kora között kb. ezer nap telik el. Ez az az időszak, amikor az agy és a test a leggyorsabban fejlődik, ezért ilyenkor van leginkább szüksége a jó minőségű, tápláló ételre.',
    image: 'https://unicef.hu/wp-content/uploads/2021/02/uni214140-300x200.jpg',
    link: 'https://unicef.hu/ehezes-felszamolasa?utm_source=chatgpt.com'
  }
];

export default function Charity() {
  return (
    <div className="charity-container">
      {charities.map((charity, index) => (
        <div key={index} className="charity-card">
          <img src={charity.image} alt={charity.name} className="charity-image" />
          <h2>{charity.name}</h2>
          <p>{charity.description}</p>
          <a href={charity.link} target="_blank" rel="noopener noreferrer" className="charity-button">Támogatás</a>
        </div>
      ))}
    </div>
  );
}
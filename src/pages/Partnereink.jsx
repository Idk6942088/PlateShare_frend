import React from 'react'
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';


export default function Partnereink() {
  return (
    <>
      <div className='partnereink'>
        <h1 className=''>Csatlakozz hozzánk, és csökkentsd az élelmiszer-pazarlást <span className='text-green-400'>nyereségesen!💸</span></h1>
        <p>Az élelmiszer-pazarlás világszerte <b className='text-red-500'>hatalmas probléma</b>, de együtt tehetünk ellene! <br /> Platformunk lehetőséget biztosít <b>boltoknak, pékségeknek és éttermeknek</b>, hogy a lejárathoz közeli, de még tökéletes minőségű termékeiket kedvezményes áron értékesítsék ahelyett, hogy kidobnák őket.</p>
        <hr className='mt-3' />
        <h3>Miért éri meg csatlakozni?</h3>
        <Grid container spacing={2}  className='partner_benefits'>
          <Grid size={{xs: 12, sm: 6, md: 3}}  className='partner_benefit' >
            <b>Kevesebb veszteség, több bevétel</b> Csökkentsd az eladhatatlan készletből származó veszteségeidet és növeld a forgalmadat!📈
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 3}} className='partner_benefit' >
            <b>Új vásárlók elérése</b>  Ismerd meg a tudatos fogyasztókat, akik szívesen térnek vissza hozzád!🧑🏻‍🤝‍🧑🏼
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 3}} className='partner_benefit' >
            <b>Fenntarthatóság és jó hírnév</b> Pozitív üzenetet közvetíthetsz a környezetvédelem és a társadalmi felelősségvállalás terén.♻️
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 3}} className='partner_benefit' >
            <b>Egyszerű és gyors rendszer</b>  Feltöltheted a felesleges termékeket, mi pedig gondoskodunk a vásárlók eléréséről!⚡
          </Grid>
        </Grid>
        <h3>Légy részese a változásnak!</h3>
        <p><b>Ne hagyd, hogy az értékes élelmiszerek kárba vesszenek!</b></p>
        <p>Csatlakozz hozzánk, és tedd gazdaságosabbá, fenntarthatóbbá és felelősségteljesebbé vállalkozásodat!</p>
        <br />
        <p>📩 Lépj kapcsolatba velünk még ma, és kezdjük el együtt a pazarlás elleni küzdelmet!</p>
        <br />
        <Link className='partner_join' to="/auth/up">Csatlakozz!</Link>
      </div>
      <div className="partner_list">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spar-logo.svg/2560px-Spar-logo.svg.png" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lidl-Logo.svg/640px-Lidl-Logo.svg.png" />
          <img src="https://images.weare365.io/filters:format(.webp)/1920x0/HU_Penny_Market_1183_80d25a5b8c.png" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Tesco_logo.png/1200px-Tesco_logo.png" />
          <img src="https://www.a-stat.hu/wp-content/uploads/2020/01/Auchan_logo.png" />
      </div>
    </>
  )
}

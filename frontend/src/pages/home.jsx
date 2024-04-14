import React from 'react';

import HomeBanner from '../components/Home/banner.jsx';
import PlaceCard from '../components/Home/placecard.jsx';
import Wrapper from '../components/Home/wrapper';
import Footer from '../components/Home/footer';

export default function Home() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <HomeBanner />
      <Wrapper />
      <br />
      <PlaceCard/>
      <Footer />
    </div>
  );
}

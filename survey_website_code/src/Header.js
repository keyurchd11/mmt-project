import React from 'react';
import bannerImage from './bg1.jpg';

const Header = () => {
  return (
    <header className="headerImage" style={{backgroundImage: `url(${bannerImage})` }}>
      {/* Add any additional content you want in your header */}
    </header>
  );
};

export default Header;

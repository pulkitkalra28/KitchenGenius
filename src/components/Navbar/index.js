import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons/lib';
import { animateScroll as scroll } from 'react-scroll';
import { MenuIcon, Nav, NavbarContainer, NavItem, NavLink, NavLogo, NavMenu } from './NavbarElements';
import kitchenGeniusLogo from '../../images/kitchenGeniusLogo.png'; // Import the image

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            {/* Logo: Click to scroll to the top */}
            <NavLogo to='/' onClick={toggleHome}>
              <img src={kitchenGeniusLogo} alt="Kitchen Genius Logo" style={{ width: '80px', height: '80px', marginBottom: '20px' }} /> {/* Your custom logo image */}
            </NavLogo>
            {/* Menu Icon: Replace with custom image */}
            <MenuIcon onClick={toggle}>
              <img 
                src={kitchenGeniusLogo} 
                alt="Kitchen Genius Logo" 
                style={{ width: '80px', height: '80px', marginBottom: '20px' }} 
              />
            </MenuIcon>
            <NavMenu>
              <NavItem>
                <NavLink to='about' smooth={true} duration={500} spy={true} exact='true' offset={-80}>
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='services' smooth={true} duration={500} spy={true} exact='true' offset={-80}>
                  How to Use?
                </NavLink>
              </NavItem>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;

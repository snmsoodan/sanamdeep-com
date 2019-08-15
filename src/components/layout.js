import React, { useState, useEffect } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import './layout.css';
import Switch from 'react-switch';
import storage from 'local-storage-fallback';
import moon from '../../static/moon.png';
import sun from '../../static/sun.png';

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  const [scroll, setScroll] = useState(false);
  
  const [darkMode, setDarkMode] = useState(false); 

  useEffect(() => {
    window.addEventListener('scroll', navOnScroll)
    return () => {
      window.removeEventListener('scroll', navOnScroll)
    }
  }, []);
  
  useEffect(() => {
    setDarkMode(storage.getItem('darkTheme')==='true')
  },[])

  const changeTheme = darkMode => {
    setDarkMode(darkMode);
    storage.setItem('darkTheme', darkMode);
  }
  
  const navOnScroll = () => {
    if (window.scrollY > 20) {
      setScroll(true);
      // console.log('scroll true', window.scrollY)
    } else {
      setScroll(false);
      // console.log('scroll false', window.scrollY)
    }
  }

  return (
    <div className={darkMode ? "container darkTheme" : "container"}>
      <div 
        className={ scroll? 'header header-sticky scroll' : 'header header-sticky'}
        style={{ 
          backgroundColor: darkMode? scroll ? '#131313' : 'rgb(32, 32, 32)' : 'white'
        }}
      >
        <Link to={`/`} 
          className="header-logo"
        >
          <h3 className='header-logo-text' style={{color: darkMode? '#c1c6d0' : 'black'}}>
            {data.site.siteMetadata.title}
          </h3>
        </Link>
        <div className='header-links'>
          <Link
            to={`/about/`}
            className='header-link-item'
            style={{color: darkMode? '#c1c6d0' : 'black'}}
          >
            About
          </Link>
          <Link
            to={`/blog/`}
            className='header-link-item'
            style={{color: darkMode? '#c1c6d0' : 'black'}}
          >
            Blog
          </Link>
          <Switch 
            onChange={changeTheme} 
            checked={darkMode} 
            uncheckedIcon={
                <img src={sun} height="100%" width="70%" />
              }
            checkedIcon={
                <img src={moon} height="100%" width="70%" />
            }
            offColor={'#282c35'}
            onColor={'#282c35'}
            height={24}
            width={53}
            handleDiameter={20}
            />
        </div>
      </div>
      <div className='content'>
        {children}
      </div>
    </div>
  )
}

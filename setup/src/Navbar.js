import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaTwitter } from 'react-icons/fa';
import { links, social } from './data';
import logo from './logo.svg';

//para mostrar y esconder los links al picar el boton hamburguesa, se podria usar simplemente "const [showLinks, setShowLinks] = useState(false)" , cambiando el state al picarle al boton y luego " {showLinks && (..." pa q muestre y esconda los links. Como esto solo monta y desmonta el componente, para poder animar la transicion se hace 'toggleando' el estilo css que va a poner la altura al container "className={`${showLinks ? 'links-container show-container' : 'links-container' }`}". Para poder ocuparlo asi, se va a pasar dinamicamente la altura del contenedos, para q si luego se agregan mas liks => se agrege solo mas altura

const Navbar = () => {
   const [showLinks, setShowLinks] = useState(false);
   const linksContainerRef = useRef(null);
   const linksRef = useRef(null);

   // checa la altura de los links y con eso pone la altura del container
   useEffect(() => {
      const linksHeight = linksRef.current.getBoundingClientRect().height;

      if (showLinks) {
         linksContainerRef.current.style.height = `${linksHeight}px`;
      } else {
         linksContainerRef.current.style.height = '0px';
      }
   });

   return (
      <nav>
         <div className="nav-center">
            <div className="nav-header">
               <img src={logo} alt="logo" />

               <button
                  className="nav-toggle"
                  onClick={() => setShowLinks(!showLinks)}
               >
                  <FaBars />
               </button>
            </div>

            <div className="links-container" ref={linksContainerRef}>
               <ul className="links" ref={linksRef}>
                  {links.map(link => {
                     const { id, url, text } = link;

                     return (
                        <li key={id}>
                           <a href={url}>{text}</a>
                        </li>
                     );
                  })}
               </ul>
            </div>

            <ul className="social-icons">
               {social.map(item => {
                  const { id, url, icon } = item;

                  return (
                     <li key={id}>
                        <a href={url}>{icon}</a>
                     </li>
                  );
               })}
            </ul>
         </div>
      </nav>
   );
};

export default Navbar;

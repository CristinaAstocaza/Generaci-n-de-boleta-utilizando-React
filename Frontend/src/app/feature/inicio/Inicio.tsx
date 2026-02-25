import React from 'react';
import './Inicio.scss';
import { useNavigate } from 'react-router-dom';
// Importa los subcomponentes desde la carpeta 'components'
// Asegúrate de usar las rutas relativas correctas según tu estructura
import Flayer from './Flayer/Flayer';
import Body1 from './Body-1/Body1';
import Body2 from './Body-2/Body2';
import Body3 from './Body-3/Body3';

/**
 * El componente principal de la página de inicio.
 * Combina todos los subcomponentes de la landing page.
 */
const Inicio: React.FC = () => {
  const navigate = useNavigate();
  // Manejadores de eventos (simulando navegación)
  const handleRegister = () => {
    console.log("Navegar a la página de Registro...");
    navigate('/autenticacion');
  };


  return (
    <div className="inicio-page-container">
      
      <Flayer 
        onRegisterClick={handleRegister} 
      />

    
      <Body1 />

      
      <Body2 />


      <Body3 />

    
    </div>
  );
};

export default Inicio;
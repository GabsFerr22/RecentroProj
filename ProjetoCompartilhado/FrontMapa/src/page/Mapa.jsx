import React, { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style/Maps.css";

function MyMap() {
  const [markersCoordinates, setMarkersCoordinates] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const navigate = useNavigate(); 


  useEffect(() => {
    axios.get('http://localhost:8800/api/coordinates')
      .then(response => {
        console.log('Dados Recebidos', response.data);
        setMarkersCoordinates(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  const handleMarkerClick = (index) => {
    setSelectedMarker(index);
  };

  const closeModal = () => {
    setSelectedMarker(null);
  };

  const handleAdminClick = () => {
    navigate('/Login'); 
  };

 
  const typeColorMapping = {
    'Coliving': 'blue',
    'Flat': 'green',
    'Hotel': 'red',
    'HIS': 'purple',
    'Hostel': 'orange',
    'Res. Misto': 'brown',
    'Res. Multifamiliar': 'pink',
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">Meu Mapa</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Serviços</a>
          <a href="#about">Sobre nós</a>
          <a href="#contact">Contatos</a>
        </div>
        <button className="admin-button" onClick={handleAdminClick}>ADMIN</button>
      </nav>
      <div className="mapContainer">
        <Map height={window.innerHeight - 60} defaultCenter={[-8.062447640491044, -34.88097132117445]} defaultZoom={15}>
          {markersCoordinates.map((coordinate, index) => (
            <Marker 
              key={index} 
              width={50} 
              anchor={coordinate.coords} 
              color={typeColorMapping[coordinate.tipo] || 'gray'} 
              onClick={() => handleMarkerClick(index)} 
            />
          ))}
        </Map>
      </div>


      {selectedMarker !== null && (
        <div className="modalContainer">
          <div className="modalContent">
            <span className="closeButton" onClick={closeModal}>X</span>
            <h2>{markersCoordinates[selectedMarker].tipo}</h2>
            <p><b>Endereço:</b> {markersCoordinates[selectedMarker].endereco}</p>
            <p><b>Descrição:</b> "ut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
            <img className="ImgModal"src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZupdeKpRDdnCu7jIeSpfG1wc8iQdJ5aFng&s" alt="Imagem" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyMap;

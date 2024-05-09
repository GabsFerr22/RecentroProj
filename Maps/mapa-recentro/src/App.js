import React from "react";
import { Map, Marker } from "pigeon-maps";
import "./Maps.css"

export function MyMap() {
  return (
    <div>
      <header className="headerMapa">
        <img className="logo" src="caminho/para/sua/logo.png" alt="Logo"  />
        <input className="Pesquisar" type="text" placeholder="Pesquisar" />
        <button className="BotaoAdmin">Admin</button>
      </header>
      <Map height={1920} defaultCenter={[-8.059361, -34.872528]} defaultZoom={11}>
        <Marker width={50} anchor={[-8.059361, -34.872528]} />
      </Map>
    </div>
  );
}

export default MyMap;
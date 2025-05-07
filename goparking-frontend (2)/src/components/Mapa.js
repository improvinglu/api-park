import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocateUser({ setPosition }) {
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.setView(e.latlng, 15);
    });
  }, [map, setPosition]);

  return null;
}

function Mapa({ estacionamientos }) {
  const [position, setPosition] = React.useState([ -34.6037, -58.3816 ]); // CABA
  const token = localStorage.getItem("token");

  const reservar = async (id) => {
    if (!token) {
      alert("Necesitás iniciar sesión");
      return;
    }

    const res = await fetch("http://localhost:3000/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ estacionamiento_id: id })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Reserva realizada con éxito");
    } else {
      alert(data.error || "Error al reservar");
    }
  };

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocateUser setPosition={setPosition} />
      <Marker position={position}>
        <Popup>Estás aquí</Popup>
      </Marker>
      {estacionamientos.map((e) => (
        <Marker key={e.id} position={[e.lat, e.lng]}>
          <Popup>
            <div>
              <strong>{e.nombre}</strong><br />
              {e.direccion}<br />
              <button
                onClick={() => reservar(e.id)}
                className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
              >
                Reservar
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Mapa;
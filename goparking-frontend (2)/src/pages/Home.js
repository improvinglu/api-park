import React, { useEffect, useState } from "react";
import Mapa from "../components/Mapa";

function Home() {
  const [estacionamientos, setEstacionamientos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/estacionamientos")
      .then((res) => res.json())
      .then((data) => setEstacionamientos(data));
  }, []);

  return (
    <div>
      <Mapa estacionamientos={estacionamientos} />
    </div>
  );
}

export default Home;
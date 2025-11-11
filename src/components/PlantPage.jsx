import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((error) => console.log(error));
  }, []);

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  function toggleSoldOut(id) {
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, isSoldOut: !plant.isSoldOut } : plant
    );
    setPlants(updatedPlants);
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant}/>
      <Search onSearchChange={setSearchQuery}/>
      <PlantList plants={filteredPlants} onToggleSoldOut={toggleSoldOut}/>
    </main>
  );
}

export default PlantPage;

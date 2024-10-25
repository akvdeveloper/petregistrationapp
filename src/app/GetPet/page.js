"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 
const GetPets = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("https://petregister.vercel.app/api/pets");
        setPets(response.data);
      } catch (err) {
        setError("Error fetching pet data.");
        console.error(err);
      }
    };

    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://petregister.vercel.app/api/pets/${id}`);
      setPets(pets.filter((pet) => pet._id !== id));
      alert("Pet deleted successfully!");
    } catch (err) {
      setError("Error deleting pet.");
      console.error(err);
    }
  };

  const handleUpdate = (pet) => {
    router.push(`/UpdatePet/${pet._id}`);
  };

  const handleAddPet = () => {

    router.push("/PetRegister"); 
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white text-gray-800 shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Registered Pets</h1>
      <button 
        onClick={handleAddPet} 
        className="mb-4 p-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
      >
        Add New Pet
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {pets.length > 0 ? (
        <ul className="space-y-4">
          {pets.map((pet) => (
            <li key={pet._id} className="p-6 border border-gray-300 rounded-lg shadow-lg">
              <h2 className="font-semibold text-2xl mb-2 text-blue-600">{pet.petName}</h2>
              <div className="text-gray-700">
                <p><strong>Owner Name:</strong> {pet.name}</p>
                <p><strong>Address:</strong> {pet.address}</p>
                <p><strong>Pin Code:</strong> {pet.pinCode}</p>
                <p><strong>Pet Type:</strong> {pet.petType}</p>
                <p><strong>Pet Nature:</strong> {pet.petNature}</p>
                <p><strong>Gender:</strong> {pet.gender}</p>
                <p><strong>Price:</strong> ${pet.price}</p>
                <p><strong>Breed Type:</strong> {pet.breedType}</p>
                <p><strong>Primary Breed:</strong> {pet.primaryBreed}</p>
                <p><strong>Size:</strong> {pet.size}</p>
                <p><strong>Weight:</strong> {pet.weight} {pet.weightUnit}</p>
                <p><strong>Behavior:</strong> {pet.behavior}</p>
                <p><strong>Date of Birth:</strong> {new Date(pet.dob).toLocaleDateString()}</p>
                <p><strong>Good with Kids:</strong> {pet.goodWithKids}</p>
                <p><strong>Parvo Infected:</strong> {pet.parvoInfected}</p>
                <p><strong>Activity Level:</strong> {pet.activityLevel}</p>
                <p><strong>Potty Trained:</strong> {pet.pottyTrained}</p>
                <p><strong>KCI Certified:</strong> {pet.checks.kciCertified}</p>
                <p><strong>Microchip:</strong> {pet.checks.microChip}</p>
                <p><strong>Vaccinated:</strong> {pet.checks.vaccinated}</p>
                <p><strong>Health Check-Up:</strong> {pet.checks.healthCheckUp}</p>  
              </div>
              <div className="flex space-x-4 mt-4">
                <button 
                  onClick={() => handleUpdate(pet)} 
                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                  Update
                </button>
                <button 
                  onClick={() => handleDelete(pet._id)} 
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pets registered yet.</p>
      )}
    </div>
  );
};

export default GetPets;

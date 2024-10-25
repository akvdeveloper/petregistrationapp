"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const UpdatePet = ({ params }) => {
  const { id } = params;
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pinCode: "",
    petType: "",
    petNature: "",
    petName: "",
    gender: "",
    price: "",
    breedType: "",
    primaryBreed: "",
    checks: {
      kciCertified: false,
      microChip: false,
      vaccinated: false,
      healthCheckUp: false,
    },
    size: "",
    weight: "",
    weightUnit: "kg",
    behavior: "",
    dob: "",
    goodWithKids: "Don't Know",
    parvoInfected: "Don't Know",
    activityLevel: "Don't Know",
    pottyTrained: "Don't Know",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`https://petregister.vercel.app/api/pets/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching pet data:", error);
        alert("Error fetching pet data. Please try again.");
      }
    };

    fetchPet();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        checks: { ...prevData.checks, [name]: checked },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://petregister.vercel.app/api/pets/${id}`, formData);
      alert("Pet updated successfully!");
      router.push("/GetPet"); 
    } catch (error) {
      console.error("Error updating pet:", error);
      alert("There was an error updating the pet. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 max-w-lg mx-auto bg-white text-gray-800 shadow-md rounded-lg"
    >
      <h1 className="text-2xl font-semibold mb-4">Update Pet</h1>

      <div>
        <label className="block mb-1" htmlFor="petName">
          Pet Name
        </label>
        <input
          type="text"
          id="petName"
          name="petName"
          value={formData.petName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="name">
          Owner Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="pinCode">
          Pin Code
        </label>
        <input
          type="text"
          id="pinCode"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="petType">
          Pet Type
        </label>
        <input
          type="text"
          id="petType"
          name="petType"
          value={formData.petType}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="petNature">
          Pet Nature
        </label>
        <input
          type="text"
          id="petNature"
          name="petNature"
          value={formData.petNature}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="gender">
          Gender
        </label>
        <input
          type="text"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="price">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="breedType">
          Breed Type
        </label>
        <input
          type="text"
          id="breedType"
          name="breedType"
          value={formData.breedType}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="primaryBreed">
          Primary Breed
        </label>
        <input
          type="text"
          id="primaryBreed"
          name="primaryBreed"
          value={formData.primaryBreed}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="size">
          Size
        </label>
        <input
          type="text"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="weight">
          Weight
        </label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>

      <div>
        <label className="block mb-1" htmlFor="weightUnit">
          Weight Unit
        </label>
        <select
          id="weightUnit"
          name="weightUnit"
          value={formData.weightUnit}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        >
          <option value="kg">kg</option>
          <option value="lb">lb</option>
        </select>
      </div>

      <div>
        <label className="block mb-1" htmlFor="behavior">
          Behavior
        </label>
        <input
          type="text"
          id="behavior"
          name="behavior"
          value={formData.behavior}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>
      <div>
        <label className="block mb-1" htmlFor="dob">
          Date of Birth
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        />
      </div>

      <div>
        <label className="block mb-1" htmlFor="goodWithKids">
          Good With Kids
        </label>
        <select
          id="goodWithKids"
          name="goodWithKids"
          value={formData.goodWithKids}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        >
          <option value="Don't Know">Don't Know</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div>
        <label className="block mb-1" htmlFor="parvoInfected">
          Parvo Infected
        </label>
        <select
          id="parvoInfected"
          name="parvoInfected"
          value={formData.parvoInfected}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        >
          <option value="Don't Know">Don't Know</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div>
        <label className="block mb-1" htmlFor="activityLevel">
          Activity Level
        </label>
        <select
          id="activityLevel"
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        >
          <option value="Don't Know">Don't Know</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label className="block mb-1" htmlFor="pottyTrained">
          Potty Trained
        </label>
        <select
          id="pottyTrained"
          name="pottyTrained"
          value={formData.pottyTrained}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-gray-900"
        >
          <option value="Don't Know">Don't Know</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <fieldset>
        <legend className="text-lg font-semibold mb-2">Checks</legend>
        {Object.entries(formData.checks).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <input
              type="checkbox"
              id={key}
              name={key}
              checked={value}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor={key} className="text-gray-700">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </label>
          </div>
        ))}
      </fieldset>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Update Pet
      </button>
    </form>
  );
};

export default UpdatePet;

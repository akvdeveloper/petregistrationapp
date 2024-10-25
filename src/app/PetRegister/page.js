"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
function PetForm({ onSubmit, selectedPet }) {
  const [successMessage, setSuccessMessage] = useState(""); 
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
      kciCertified: "",
      microChip: "",
      vaccinated: "",
      healthCheckUp: ""
    },
    size: "",
    weight: "",
    weightUnit: "kg",
    behavior: "",
    dob: "",
    goodWithKids: "Don't Know",
    parvoInfected: "Don't Know",
    activityLevel: "Don't Know",
    pottyTrained: "Don't Know"
  });

  useEffect(() => {
    if (selectedPet) {
      setFormData(selectedPet);
    }
  }, [selectedPet]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (name in formData.checks) {
      setFormData({
        ...formData,
        checks: { ...formData.checks, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`https://petregister.vercel.app/api/pets/${formData._id}`, formData);
      } else {
        await axios.post("https://petregister.vercel.app/api/pets", formData);
      }
      setSuccessMessage("Pet registered successfully!");
      
      if (typeof onSubmit === 'function') {
        onSubmit();
      }
      setFormData({
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
          kciCertified: "",
          microChip: "",
          vaccinated: "",
          healthCheckUp: ""
        },
        size: "",
        weight: "",
        weightUnit: "kg",
        behavior: "",
        dob: "",
        goodWithKids: "Don't Know",
        parvoInfected: "Don't Know",
        activityLevel: "Don't Know",
        pottyTrained: "Don't Know"
      });
    } catch (error) {
      console.error("Error saving pet:", error);
      alert("There was an error saving the pet.");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-lg mx-auto bg-white text-gray-800 shadow-md rounded-lg">
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Owner Name" required className="w-full p-2 border border-gray-300 rounded text-gray-900" />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="w-full p-2 border border-gray-300 rounded text-gray-900" />
      <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pin Code" required className="w-full p-2 border border-gray-300 rounded text-gray-900" />

      <div className="text-gray-800">
        <span className="font-semibold">Pet Type</span>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="petType" value="Dog" checked={formData.petType === "Dog"} onChange={handleChange} className="mr-2" /> Dog
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="petType" value="Cat" checked={formData.petType === "Cat"} onChange={handleChange} className="mr-2" /> Cat
        </label>
      </div>

      <div className="text-gray-800">
        <span className="font-semibold">Pet Nature</span>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="petNature" value="Friendly" checked={formData.petNature === "Friendly"} onChange={handleChange} className="mr-2" /> Friendly
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="petNature" value="Aggressive" checked={formData.petNature === "Aggressive"} onChange={handleChange} className="mr-2" /> Aggressive
        </label>
      </div>
      <input type="text" name="petName" value={formData.petName} onChange={handleChange} placeholder="Pet Name" className="w-full p-2 border border-gray-300 rounded text-gray-900" />
      <div className="text-gray-800">
        <span className="font-semibold">Gender</span>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} className="mr-2" /> Male
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} className="mr-2" /> Female
        </label>
      </div>

      <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border border-gray-300 rounded text-gray-900" />

      <div className="text-gray-800">
        <div className="font-semibold">What's The Breed Of Your Pet?</div>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="breedType" value="Purebred" checked={formData.breedType === "Purebred"} onChange={handleChange} className="mr-2" /> Purebred
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="breedType" value="Crossbred" checked={formData.breedType === "Crossbred"} onChange={handleChange} className="mr-2" /> Crossbred (Mixed Breed)
        </label>
      </div>

      <div className="text-gray-800">
        <label htmlFor="primaryBreed" className="font-semibold">Primary Breed</label>
        <select name="primaryBreed" value={formData.primaryBreed} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded text-gray-900">
          <option value="">Select Primary Breed</option>
          <option value="Labrador">Labrador</option>
          <option value="Golden Retriever">Golden Retriever</option>
          <option value="German Shepherd">German Shepherd</option>
        </select>
      </div>

      <div className="text-gray-800">
        <span className="font-semibold">KCI Certified</span>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="kciCertified" value="Yes" checked={formData.checks.kciCertified === "Yes"} onChange={handleChange} className="mr-2" /> Yes
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="kciCertified" value="No" checked={formData.checks.kciCertified === "No"} onChange={handleChange} className="mr-2" /> No
        </label>
      </div>

      <div className="text-gray-800">
        <span className="font-semibold">Micro Chip</span>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="microChip" value="Yes" checked={formData.checks.microChip === "Yes"} onChange={handleChange} className="mr-2" /> Yes
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="microChip" value="No" checked={formData.checks.microChip === "No"} onChange={handleChange} className="mr-2" /> No
        </label>
      </div>

      <div className="text-gray-800">
        <span className="font-semibold">Vaccinated</span>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="vaccinated" value="Yes" checked={formData.checks.vaccinated === "Yes"} onChange={handleChange} className="mr-2" /> Yes
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="vaccinated" value="No" checked={formData.checks.vaccinated === "No"} onChange={handleChange} className="mr-2" /> No
        </label>
      </div>

      <div className="text-gray-800">
        <span className="font-semibold">Health Check Up</span>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="healthCheckUp" value="Yes" checked={formData.checks.healthCheckUp === "Yes"} onChange={handleChange} className="mr-2" /> Yes
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="healthCheckUp" value="No" checked={formData.checks.healthCheckUp === "No"} onChange={handleChange} className="mr-2" /> No
        </label>
      </div>


      <div className="text-gray-800">
        <div className="font-semibold">How Big Is Your Pet?</div>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="size" value="Small" checked={formData.size === "Small"} onChange={handleChange} className="mr-2" /> Small
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="size" value="Medium" checked={formData.size === "Medium"} onChange={handleChange} className="mr-2" /> Medium
        </label>
      </div>
      
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded text-gray-900" />

      <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight (kg)" className="w-full p-2 border border-gray-300 rounded text-gray-900" />

      <input type="text" name="behavior" value={formData.behavior} onChange={handleChange} placeholder="Behavior" className="w-full p-2 border border-gray-300 rounded text-gray-900" />

      <div className="text-gray-800">
        <span className="font-semibold">Good With Kids?</span>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="goodWithKids" value="Yes" checked={formData.goodWithKids === "Yes"} onChange={handleChange} className="mr-2" /> Yes
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="goodWithKids" value="No" checked={formData.goodWithKids === "No"} onChange={handleChange} className="mr-2" /> No
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="goodWithKids" value="Don't Know" checked={formData.goodWithKids === "Don't Know"} onChange={handleChange} className="mr-2" /> Don't Know
        </label>
      </div>

      <div className="text-gray-800">
        <span className="font-semibold">Parvo Infected?</span>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="parvoInfected" value="Yes" checked={formData.parvoInfected === "Yes"} onChange={handleChange} className="mr-2" /> Yes
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="parvoInfected" value="No" checked={formData.parvoInfected === "No"} onChange={handleChange} className="mr-2" /> No
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="parvoInfected" value="Don't Know" checked={formData.parvoInfected === "Don't Know"} onChange={handleChange} className="mr-2" /> Don't Know
        </label>
      </div>

      <div className="text-gray-800">
        <span className="font-semibold">Activity Level</span>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="activityLevel" value="Yes" checked={formData.activityLevel === "Yes"} onChange={handleChange} className="mr-2" /> Yes
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="activityLevel" value="No" checked={formData.activityLevel === "No"} onChange={handleChange} className="mr-2" /> No
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="activityLevel" value="Don't Know" checked={formData.activityLevel === "Don't Know"} onChange={handleChange} className="mr-2" /> Don't Know
        </label>
      </div>

      <div className="text-gray-800">
        <span className="font-semibold">Potty Trained?</span>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="pottyTrained" value="Yes" checked={formData.pottyTrained === "Yes"} onChange={handleChange} className="mr-2" /> Yes
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="pottyTrained" value="No" checked={formData.pottyTrained === "No"} onChange={handleChange} className="mr-2" /> No
        </label>
        <label className="inline-flex items-center ml-2">
          <input type="radio" name="pottyTrained" value="Don't Know" checked={formData.pottyTrained === "Don't Know"} onChange={handleChange} className="mr-2" /> Don't Know
        </label>
      </div>
        
        <div className="text-center">
            {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        </div>
        <div className="flex justify-between">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
            <Link type="button" href="/GetPet"  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">View All Pets</Link>
        </div>
      
    </form>
  );
}

export default PetForm;


"use client"; 
import Link from 'next/link';
import React from 'react';


export default function Home() {
  return (
    <div className='flex gap-4 justify-center items-center' style={{height:"100%", width:"100%"}}>
        <Link type="button" href="/PetRegister"  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Register Your Pet</Link>
        <Link type="button" href="/GetPet"  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">View All Pets</Link>
       </div>
  );
}

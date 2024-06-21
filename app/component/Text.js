import React from 'react'
import "../../app/globals.css";
import Link from 'next/link';

export default function Text() {
  return (
    <div className="absolute flex flex-col text-[5.5vw] uppercase w-[80vw] items-start leading-tight">
      <p>Stephanie Ugboaja</p>
      <p className="self-end">Front End Developer</p>
      <p>Creative Coding</p>
      {/* <p className="self-end">Portfolio@2024</p> */}
    </div>
  )
}
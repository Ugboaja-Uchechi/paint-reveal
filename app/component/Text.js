import React from 'react'
import "../../app/globals.css";
import Link from 'next/link';

export default function Text() {
  return (
    <div className="absolute flex flex-col text-[5.5vw] uppercase w-[80vw] items-start leading-tight">
      <p>Stephanie Ugboaja</p>
      <p className="self-end">Front End Developer</p>
      <Link href="">Reach Out</Link>
      <Link className="self-end" href="https://tired-coder.vercel.app/" target='blank'>Portfolio</Link>
    </div>
  )
}
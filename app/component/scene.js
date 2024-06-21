'use client'
import React, { useEffect, useRef } from 'react'
import useWindow from './useWindow'

export default function Scene() {
  const { dimension } = useWindow();
  const canvas = useRef();

  useEffect(() => {
    dimension.width > 0 && init();
  }, [dimension])

  const init = () => {
    const ctx = canvas.current.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, dimension.width, dimension.height);
    //the destination-out global composite operation is used on the canvas so that every time we draw additional shapes on the canvas, it will erase the black rectangle used as a background.
    ctx.globalCompositeOperation = "destination-out";
  };

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;

    draw(clientX, clientY, 50)
  };

  const draw = (x, y, radius) => {
    const ctx = canvas.current.getContext("2d");

    ctx.beginPath();

    ctx.arc(x, y, radius, 0, 2 * Math.PI);

    ctx.fill();
  };

  return (
    <div className='relative w-full h-full'>
      {dimension.width == 0 && <div className='absolute w-full h-full bg-black' />}
      <canvas ref={canvas} height={dimension.height} width={dimension.width} onMouseMove={manageMouseMove} />
    </div>
  )
}
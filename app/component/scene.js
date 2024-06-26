'use client'
import React, { useEffect, useRef } from 'react'
import useWindow from './useWindow'
import "../../app/globals.css";

export default function Scene() {
  const { dimension } = useWindow();
  //created a reference to target the canvas
  const canvas = useRef();

  const prevPosition = useRef(null);

  //Linear interpolation is a key concept in animations.
  //it is a form of interpolation, which involves the generation of new values based on an existing set of values
  //x: The value we want to interpolate from (start)
  //y: The target value we want to interpolate to (end)
  //a: The amount by which we want x to be closer to y.
  const lerp = (x, y, a) => x * (1 - a) + y * a;

  useEffect(() => {
    dimension.width > 0 && init();
  }, [dimension])


  const init = () => {
    const ctx = canvas.current.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, dimension.width, dimension.height);
    //the destination-out global composite operation is used on the canvas so that every time we draw additional shapes on the canvas, it will erase the black rectangle used as a background.
    // try xor instead of destination-out really cool
    ctx.globalCompositeOperation = "destination-out";
  };

  const manageMouseMove = (e) => {
    // const { clientX, clientY, movementX, movementY } = e;


    //mobile start
    // When it's a touch event, get the position from first touch point
    let clientX = e.clientX, clientY = e.clientY;
    let movementX = e.movementX, movementY = e.movementY;

    if (e.type === 'touchmove') {
      e.preventDefault(); // Prevent scrolling when touching the canvas
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;

      // Calculate movementX and movementY for touch events
      if (prevPosition.current) {
        movementX = clientX - prevPosition.current.x;
        movementY = clientY - prevPosition.current.y;
      } else {
        movementX = 0;
        movementY = 0;
      }
    }
    //mobile end

    //makes the circles erasing smoother
    const nbOfCircles = Math.max(Math.abs(movementX), Math.abs(movementY)) / 10;

    // we are checking if there is a previous position of the mouse and then we're drawing circles and a bunch of circles between eachother
    if (prevPosition.current != null) {
      const { x, y } = prevPosition.current;

      for (let i = 0; i < nbOfCircles; i++) {

        const targetX = lerp(x, clientX, (1 / nbOfCircles) * i);

        const targetY = lerp(y, clientY, (1 / nbOfCircles) * i);

        draw(targetX, targetY, 50)
      }
    }

    prevPosition.current = {
      x: clientX,
      y: clientY
    }
  };

  const draw = (x, y, radius) => {
    const ctx = canvas.current.getContext("2d");

    ctx.beginPath();

    ctx.arc(x, y, radius, 0, 2 * Math.PI);

    ctx.fill();
  };

  return (
    <div className='relative w-full h-full'>
      {/* displays on the 1st render */}
      {dimension.width == 0 && <div className='absolute w-full h-full bg-black' />}
      <canvas ref={canvas} height={dimension.height} width={dimension.width} onMouseMove={manageMouseMove} onTouchMove={manageMouseMove} />
    </div>
  )
}
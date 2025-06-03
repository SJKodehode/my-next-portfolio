// components/CannonBall.js
"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./themeProvider";

export default function CannonBall({ width = 300, height = 300 }) {
  const { colors } = useTheme();
  const bg        = colors[0];
  const primary   = colors[1];
  const secondary = colors[2];

  const sceneRef       = useRef(null);
  const canShoot       = useRef(true);
  const lastPointerPos = useRef({ x: width / 2, y: height / 2 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const Matter = require("matter-js");
    const {
      Engine, Render, Runner, World, Bodies,
      Composites, Body, Mouse, MouseConstraint,
    } = Matter;

    // 1) Create engine + world
    const engine = Engine.create();
    const world  = engine.world;

    // 2) Create renderer and append to sceneRef
    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: bg,
      },
    });
    Render.run(render);

    // 3) Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 4) Add static ground
    const ground = Bodies.rectangle(width / 2, height + 10, width, 20, {
      isStatic: true,
      render: { fillStyle: bg },
    });
    World.add(world, ground);

    // 5) Define “cannon” position
    const cannonX = 60;
    const cannonY = height - 80;

    // 6) Stack of cubes
    const cubeSize = 40;
    const boxes = Composites.stack(
      180, height - 80 - 5 * cubeSize,
      5, 5,
      0, 0,
      (x, y) =>
        Bodies.rectangle(x, y, cubeSize, cubeSize, {
          restitution: 0.4,
          friction: 0.02,
          render: { fillStyle: secondary },
        })
    );
    World.add(world, boxes);

    // 7) Optional: visual cannon barrel
    

    // 8) Function to shoot a cannonball toward lastPointerPos
    const shootBall = () => {
      if (!canShoot.current) return;
      canShoot.current = false;

      const ball = Bodies.circle(cannonX, cannonY, 30, {
        density     : 0.1,
        frictionAir : 0.002,
        restitution : 0.9,
        render      : { fillStyle: primary },
      });

      const { x: targetX, y: targetY } = lastPointerPos.current;
      const dx  = targetX - cannonX;
      const dy  = targetY - cannonY;
      const mag = Math.hypot(dx, dy) || 1;
      const speed = 15;
      const vx = (dx / mag) * speed;
      const vy = (dy / mag) * speed;

      Body.setVelocity(ball, { x: vx, y: vy });
      World.add(world, ball);

      setTimeout(() => {
        canShoot.current = true;
      }, 1000);
    };

    // 9) Mouse interaction for dragging cubes
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // 10) Update lastPointerPos on mousemove
    const canvasEl = render.canvas;
    const handleMouseMove = (e) => {
      const rect = canvasEl.getBoundingClientRect();
      lastPointerPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvasEl.addEventListener("mousemove", handleMouseMove);

    // 11) Listen for keydown 'F' to shoot toward lastPointerPos
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "f") {
        shootBall();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const parent = sceneRef.current;
    // 12) Cleanup on unmount
    return () => {
      canvasEl.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);

      if (parent) {
        Array.from(parent.children).forEach((child) => {
          parent.removeChild(child);
        });
      }
      Runner.stop(runner);
      Render.stop(render);
      World.clear(world, false);
      Engine.clear(engine);

      // Remove all children (including <canvas>) from sceneRef
      
    };
  }, [width, height, bg, primary, secondary]);

  return (
    <div
      ref={sceneRef}
      className="flex justify-center"
      style={{
        position: "relative",
        width : `${width}px`,
        height: `${height}px`,
        backgroundColor: bg,
      }}
    >
      {/* Press "F" to shoot a cannonball toward the cursor */}
    </div>
  );
}

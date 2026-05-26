"use client";

import { ElementType, ReactNode, useMemo, useState } from "react";

type Hover3DProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
};

type Rotation = {
  x: number;
  y: number;
};

const baseRotation: Rotation = { x: 0, y: 0 };

export default function Hover3D<T extends ElementType = "div">({
  as,
  children,
  className,
  wrapperClassName,
}: Hover3DProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const [rotation, setRotation] = useState<Rotation>(baseRotation);

  const gridCells = useMemo(() => {
    return Array.from({ length: 9 }, (_, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      const isCenter = row === 1 && col === 1;

      const rotationX = row === 0 ? -8 : row === 2 ? 8 : 0;
      const rotationY = col === 0 ? -8 : col === 2 ? 8 : 0;

      return {
        id: `${row}-${col}`,
        isCenter,
        rotation: { x: rotationX, y: rotationY },
      };
    });
  }, []);

  return (
    <div
      className={`relative ${wrapperClassName ?? ""}`.trim()}
      style={{ perspective: "900px" }}
      onMouseLeave={() => setRotation(baseRotation)}
    >
      <Component
        className={className}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 180ms ease-out",
        }}
      >
        {children}
      </Component>
      <div className="absolute inset-0 z-20 grid grid-cols-3 grid-rows-3">
        {gridCells.map((cell) => (
          <div
            key={cell.id}
            className={cell.isCenter ? "pointer-events-none" : ""}
            onMouseEnter={() => {
              if (cell.isCenter) return;
              setRotation(cell.rotation);
            }}
          />
        ))}
      </div>
    </div>
  );
}

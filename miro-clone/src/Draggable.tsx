import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  x: number;
  y: number;
}

export const Draggable = ({ id, children, x, y }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {
        position: 'absolute' as const,
        left: x,
        top: y,
      };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Card } from './Card';

export const Tray = () => {
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: 'tray',
  });

  const { attributes, listeners, setNodeRef: setDraggableRef, transform } = useDraggable({
    id: 'card-1',
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const combinedRef = (node: HTMLDivElement) => {
    setDroppableRef(node);
  };

  return (
    <div ref={combinedRef} style={{ position: 'absolute', top: 10, left: 10, backgroundColor: 'white', padding: 10, zIndex: 1 }}>
      <div ref={setDraggableRef} style={style} {...listeners} {...attributes}>
        <Card id="card-1">
          Card 1
        </Card>
      </div>
    </div>
  );
};

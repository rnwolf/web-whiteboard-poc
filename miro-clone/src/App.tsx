import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Canvas } from './Canvas';
import { Tray } from './Tray';
import { Card as CardType } from './types';
import { Card } from './Card';
import { customCollisionDetection } from './collisionDetection';
import { Draggable } from './Draggable';
import { snapToGrid } from './snapToGrid';

function App() {
  const [cards, setCards] = useState<CardType[]>([]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;

    if (over && over.id === 'canvas') {
      const newCard: CardType = {
        id: `card-${Date.now()}`,
        x: snapToGrid(delta.x),
        y: snapToGrid(delta.y),
      };
      setCards((cards) => [...cards, newCard]);
    } else if (over) {
      const cardId = active.id;
      const card = cards.find((c) => c.id === cardId);
      if (card) {
        setCards((cards) =>
          cards.map((c) =>
            c.id === cardId
              ? { ...c, x: snapToGrid(c.x + delta.x), y: snapToGrid(c.y + delta.y) }
              : c
          )
        );
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={customCollisionDetection(cards)}>
      <Canvas>
        {cards.map((card) => (
          <Draggable key={card.id} id={card.id} x={card.x} y={card.y}>
            <Card id={card.id}>{card.id}</Card>
          </Draggable>
        ))}
      </Canvas>
      <Tray />
    </DndContext>
  );
}

export default App;

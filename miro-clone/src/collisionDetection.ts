import { rectIntersection, CollisionDetection, pointerWithin, getFirstCollision } from '@dnd-kit/core';
import { Card } from './types';

export const customCollisionDetection = (cards: Card[]): CollisionDetection => (args) => {
  const { active, droppableContainers } = args;

  const tray = droppableContainers.find((container) => container.id === 'tray');
  if (tray && active.rect.current.translated) {
    const trayRect = tray.rect.current;
    if (
      active.rect.current.translated.left < trayRect.right &&
      active.rect.current.translated.right > trayRect.left &&
      active.rect.current.translated.top < trayRect.bottom &&
      active.rect.current.translated.bottom > trayRect.top
    ) {
      return [{ id: 'tray', data: {} }];
    }
  }

  const pointerCollisions = pointerWithin(args);
  if (pointerCollisions.length > 0) {
    return pointerCollisions;
  }

  const rectCollisions = rectIntersection(args);

  const collisions = rectCollisions.filter((collision) => {
    if (collision.id === 'canvas') {
      return true;
    }

    const card = cards.find((c) => c.id === collision.id);
    if (!card) {
      return false;
    }

    const activeCard = cards.find((c) => c.id === active.id);
    if (!activeCard) {
      return false;
    }

    const activeRect = active.rect.current.translated;
    if (!activeRect) {
        return false;
    }

    const cardRect = {
      left: card.x,
      top: card.y,
      right: card.x + 100,
      bottom: card.y + 100,
    };

    const activeCardRect = {
        left: activeCard.x + activeRect.left,
        top: activeCard.y + activeRect.top,
        right: activeCard.x + activeRect.right,
        bottom: activeCard.y + activeRect.bottom,
    }


    return (
      activeCardRect.left < cardRect.right &&
      activeCardRect.right > cardRect.left &&
      activeCardRect.top < cardRect.bottom &&
      activeCardRect.bottom > cardRect.top
    );
  });

  return getFirstCollision(collisions) ? [] : rectCollisions;
};

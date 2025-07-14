const gridSize = 20;

export const snapToGrid = (value: number) => {
  return Math.round(value / gridSize) * gridSize;
};

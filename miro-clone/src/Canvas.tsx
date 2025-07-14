import React, { useRef, useState, useMemo, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import { useDroppable } from '@dnd-kit/core';

interface CanvasProps {
  children: React.ReactNode;
}

export const Canvas = ({ children }: CanvasProps) => {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState(d3.zoomIdentity);

  const updateTransform = (event: d3.D3ZoomEvent<HTMLDivElement, unknown>) => {
    setTransform(event.transform);
  };

  const zoomBehavior = useMemo(() => d3.zoom<HTMLDivElement, unknown>(), []);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const selection = d3.select<HTMLDivElement, unknown>(canvasRef.current);

    zoomBehavior.on('zoom', updateTransform);
    selection.call(zoomBehavior);

    return () => {
      selection.on('.zoom', null);
    };
  }, [zoomBehavior]);

  const combinedRef = (node: HTMLDivElement) => {
    canvasRef.current = node;
    setNodeRef(node);
  };

  return (
    <div ref={combinedRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div
        style={{
          transformOrigin: 'top left',
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.k})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

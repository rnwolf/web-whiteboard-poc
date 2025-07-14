import React from 'react';

interface CardProps {
  id: string;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ id, children, ...props }, ref) => {
  return (
    <div ref={ref} {...props} style={{ width: 100, height: 100, backgroundColor: 'lightyellow', margin: 10 }}>
      {children}
    </div>
  );
});

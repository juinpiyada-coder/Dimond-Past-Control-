import React from 'react';

const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px', 
  className = '', 
  style = {} 
}) => {
  return (
    <div 
      className={`skeleton ${className}`} 
      style={{ 
        width, 
        height, 
        borderRadius, 
        ...style 
      }} 
    />
  );
};

export default Skeleton;

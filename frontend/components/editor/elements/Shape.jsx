import React from 'react';

const shapeGen = (shape) => {
  for (let index = 0; index < window.bundles.length; index += 1) {
    const { bundle } = window.bundles[index];
    const item = bundle.find(({ name }) => name === shape);
    if (item) return <use href={item.url} />;
  }
  return null;
};

const Shape = ({
  elementAttr: {
    shape, width, height, color,
  },
  zoom,
}) => (
  <svg width={width * zoom} height={height * zoom} className="cursor" style={{ fill: color }}>
    {shapeGen(shape)}
  </svg>
);

export default Shape;

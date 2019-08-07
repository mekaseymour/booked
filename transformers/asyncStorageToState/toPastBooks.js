const toPastBooks = ([key, data]) => {
  const transformed = {};
  transformed[key] = JSON.parse(data).map(d => JSON.parse(d));

  return transformed;
};

export default toPastBooks;

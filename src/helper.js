const ascSort = key => {
  return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
};

const descSort = key => {
  return (a, b) => (a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0);
};

export { ascSort, descSort };

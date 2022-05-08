export const generateCategoryTree = (categories) => {
  const idMapping = categories.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});

  let root = [];

  categories.forEach((el) => {
    // Handle the root element
    if (el.parent_id === null) {
      root.push(el);
      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = categories[idMapping[el.parent_id]];
    // Add our current el to its parent's `children` array
    parentEl.children = [...(parentEl.children || []), el];
  });

  return root;
};

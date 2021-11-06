type Item = {
  createdAt: string;
};

export const sortByDate = (a: Item, b: Item) => {
  const d1 = new Date(a.createdAt);
  const d2 = new Date(b.createdAt);

  const t1 = d1.getTime();
  const t2 = d2.getTime();

  return t1 - t2;
};

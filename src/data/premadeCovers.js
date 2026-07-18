export const premadeCovers = [
  {
    id: 'snake-king',
    title: 'The Snake King',
    genre: 'Fantasy',
    prices: { USD: 180, EUR: 170 },
    image: '/assets/p1.png',
    taken: false,
  },
  {
    id: 'secret-garden',
    title: 'The Secret Garden',
    genre: 'Fiction&Ya',
    prices: { USD: 200, EUR: 190 },
    image: '/assets/premade2.png',
    taken: false,
  },
];

export const getPremadeCoverById = (coverId) =>
  premadeCovers.find((cover) => cover.id === coverId);
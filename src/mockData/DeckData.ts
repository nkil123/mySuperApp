export const DeckData: DeckDataType[] = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    text: 'Card #5',
    uri: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 6,
    text: 'Card #6',
    uri: 'https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 7,
    text: 'Card #7',
    uri: 'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 8,
    text: 'Card #8',
    uri: 'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export type DeckDataType = {
  id: number;
  text: string;
  uri?: string;
};

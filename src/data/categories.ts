import { Category } from '../types/game';

export const defaultCategories: Category[] = [
  {
    id: 'animals',
    name: 'Animals',
    icon: '🐾',
    words: [
      'Dog', 'Cat', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Wolf', 'Eagle',
      'Shark', 'Dolphin', 'Penguin', 'Kangaroo', 'Giraffe', 'Zebra', 'Monkey',
      'Snake', 'Crocodile', 'Owl', 'Rabbit', 'Fox', 'Deer', 'Horse', 'Whale',
      'Octopus', 'Butterfly', 'Frog', 'Turtle', 'Parrot', 'Panda', 'Koala',
    ],
  },
  {
    id: 'food',
    name: 'Food',
    icon: '🍕',
    words: [
      'Pizza', 'Burger', 'Sushi', 'Pasta', 'Tacos', 'Ice Cream', 'Chocolate',
      'Salad', 'Steak', 'Soup', 'Bread', 'Cheese', 'Rice', 'Chicken', 'Fish',
      'Apple', 'Banana', 'Orange', 'Sandwich', 'Cake', 'Cookies', 'Pancakes',
      'French Fries', 'Hot Dog', 'Popcorn', 'Nachos', 'Waffles', 'Donut',
    ],
  },
  {
    id: 'movies',
    name: 'Movies',
    icon: '🎬',
    words: [
      'Titanic', 'Avatar', 'Inception', 'Matrix', 'Jaws', 'Frozen', 'Shrek',
      'Batman', 'Spiderman', 'Avengers', 'Joker', 'Gladiator', 'Rocky', 'Alien',
      'Terminator', 'Jurassic Park', 'Star Wars', 'Harry Potter', 'Toy Story',
      'Finding Nemo', 'The Lion King', 'Forrest Gump', 'Interstellar', 'Coco',
    ],
  },
  {
    id: 'places',
    name: 'Places',
    icon: '🌍',
    words: [
      'Beach', 'Mountain', 'Forest', 'Desert', 'City', 'Airport', 'Hospital',
      'School', 'Restaurant', 'Museum', 'Library', 'Park', 'Mall', 'Stadium',
      'Church', 'Castle', 'Island', 'Cave', 'Volcano', 'Waterfall', 'Zoo',
      'Gym', 'Cinema', 'Bakery', 'Bank', 'Hotel', 'Farm', 'Jungle', 'Aquarium',
    ],
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    words: [
      'Soccer', 'Basketball', 'Tennis', 'Golf', 'Baseball', 'Swimming',
      'Boxing', 'Wrestling', 'Hockey', 'Rugby', 'Volleyball', 'Skiing',
      'Surfing', 'Cycling', 'Running', 'Gymnastics', 'Karate', 'Archery',
      'Fencing', 'Bowling', 'Skateboarding', 'Snowboarding', 'Badminton',
      'Table Tennis', 'Cricket', 'Rowing', 'Diving', 'Climbing',
    ],
  },
  {
    id: 'professions',
    name: 'Jobs',
    icon: '💼',
    words: [
      'Doctor', 'Teacher', 'Engineer', 'Chef', 'Pilot', 'Lawyer', 'Artist',
      'Musician', 'Actor', 'Writer', 'Nurse', 'Police', 'Firefighter',
      'Farmer', 'Mechanic', 'Dentist', 'Architect', 'Photographer',
      'Scientist', 'Astronaut', 'Detective', 'Librarian', 'Electrician',
      'Plumber', 'Journalist', 'Surgeon', 'Veterinarian', 'Carpenter',
    ],
  },
  {
    id: 'technology',
    name: 'Tech',
    icon: '💻',
    words: [
      'Computer', 'Smartphone', 'Tablet', 'Laptop', 'Television', 'Camera',
      'Headphones', 'Keyboard', 'Mouse', 'Monitor', 'Printer', 'Router',
      'Drone', 'Robot', 'Satellite', 'Console', 'Smartwatch', 'Speaker',
      'Microphone', 'Projector', 'Scanner', 'Charger', 'Battery', 'Cable',
    ],
  },
  {
    id: 'music',
    name: 'Music',
    icon: '🎵',
    words: [
      'Guitar', 'Piano', 'Drums', 'Violin', 'Trumpet', 'Saxophone', 'Flute',
      'Cello', 'Harp', 'Accordion', 'Harmonica', 'Ukulele', 'Bass', 'Clarinet',
      'Trombone', 'Banjo', 'Organ', 'Synthesizer', 'Tambourine', 'Xylophone',
    ],
  },
];

export const getRandomWord = (category: Category): string => {
  const randomIndex = Math.floor(Math.random() * category.words.length);
  return category.words[randomIndex];
};

export const getCategoryById = (id: string): Category | undefined => {
  return defaultCategories.find(cat => cat.id === id);
};
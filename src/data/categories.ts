import { Category } from '../types/game';
import { Language } from '../i18n/translations';

/**
 * Extended category type that includes Spanish word translations.
 * This allows the game to serve language-appropriate words at runtime.
 */
export interface ExtendedCategory extends Category {
  /** Spanish translations for all words in this category */
  wordsEs: string[];
}

/**
 * All game categories with both English and Spanish word lists.
 * The `words` field contains English words (default).
 * The `wordsEs` field contains Spanish translations.
 * Each category has exactly 45 words for consistent replayability.
 */
export const defaultCategories: ExtendedCategory[] = [
  {
    id: 'animals',
    name: 'Animals',
    icon: '🐾',
    words: [
      'Dog', 'Cat', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Wolf', 'Eagle',
      'Shark', 'Dolphin', 'Penguin', 'Kangaroo', 'Giraffe', 'Zebra', 'Monkey',
      'Snake', 'Crocodile', 'Owl', 'Rabbit', 'Fox', 'Deer', 'Horse', 'Whale',
      'Octopus', 'Butterfly', 'Frog', 'Turtle', 'Parrot', 'Panda', 'Koala',
      'Seal', 'Camel', 'Lemur', 'Cheetah', 'Hippo', 'Rhinoceros', 'Peacock',
      'Flamingo', 'Hedgehog', 'Squirrel', 'Hamster', 'Goat', 'Sheep', 'Duck',
      'Pig',
    ],
    wordsEs: [
      'Perro', 'Gato', 'Elefante', 'León', 'Tigre', 'Oso', 'Lobo', 'Águila',
      'Tiburón', 'Delfín', 'Pingüino', 'Canguro', 'Jirafa', 'Cebra', 'Mono',
      'Serpiente', 'Cocodrilo', 'Búho', 'Conejo', 'Zorro', 'Ciervo', 'Caballo', 'Ballena',
      'Pulpo', 'Mariposa', 'Rana', 'Tortuga', 'Loro', 'Panda', 'Koala',
      'Foca', 'Camello', 'Lémur', 'Guepardo', 'Hipopótamo', 'Rinoceronte', 'Pavo Real',
      'Flamenco', 'Erizo', 'Ardilla', 'Hámster', 'Cabra', 'Oveja', 'Pato',
      'Cerdo',
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
      'Brownie', 'Muffin', 'Burrito', 'Quesadilla', 'Empanada', 'Ramen', 'Paella',
      'Ceviche', 'Croissant', 'Pretzel', 'Granola', 'Hummus', 'Falafel', 'Lasagna',
      'Tiramisu', 'Smoothie', 'Churros',
    ],
    wordsEs: [
      'Pizza', 'Hamburguesa', 'Sushi', 'Pasta', 'Tacos', 'Helado', 'Chocolate',
      'Ensalada', 'Bistec', 'Sopa', 'Pan', 'Queso', 'Arroz', 'Pollo', 'Pescado',
      'Manzana', 'Plátano', 'Naranja', 'Sándwich', 'Pastel', 'Galletas', 'Panqueques',
      'Papas Fritas', 'Perro Caliente', 'Palomitas', 'Nachos', 'Gofres', 'Dona',
      'Brownie', 'Muffin', 'Burrito', 'Quesadilla', 'Empanada', 'Ramen', 'Paella',
      'Ceviche', 'Croissant', 'Pretzel', 'Granola', 'Hummus', 'Falafel', 'Lasaña',
      'Tiramisú', 'Batido', 'Churros',
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
      'Moana', 'Brave', 'Ratatouille', 'Up', 'Inside Out', 'The Godfather',
      'Pulp Fiction', 'Fight Club', 'The Dark Knight', 'Iron Man', 'Thor',
      'Black Panther', 'Wonder Woman', 'Transformers', 'Pirates of the Caribbean', 'Shang-Chi',
      'Encanto', 'Barbie', 'Oppenheimer', 'Dune', 'Top Gun',
    ],
    wordsEs: [
      'Titanic', 'Avatar', 'Inception', 'Matrix', 'Tiburón', 'Frozen', 'Shrek',
      'Batman', 'Spiderman', 'Avengers', 'Joker', 'Gladiador', 'Rocky', 'Alien',
      'Terminator', 'Parque Jurásico', 'Star Wars', 'Harry Potter', 'Toy Story',
      'Buscando a Nemo', 'El Rey León', 'Forrest Gump', 'Interstellar', 'Coco',
      'Moana', 'Valiente', 'Ratatouille', 'Up', 'Intensamente', 'El Padrino',
      'Pulp Fiction', 'El Club de la Pelea', 'El Caballero Oscuro', 'Iron Man', 'Thor',
      'Pantera Negra', 'Mujer Maravilla', 'Transformers', 'Piratas del Caribe', 'Shang-Chi',
      'Encanto', 'Barbie', 'Oppenheimer', 'Dune', 'Top Gun',
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
      'Lighthouse', 'Bridge', 'Harbor', 'Market', 'Cathedral', 'Palace', 'Canyon',
      'Glacier', 'Swamp', 'Meadow', 'Valley', 'Plains', 'Tavern', 'Theater',
      'Prison', 'Orphanage',
    ],
    wordsEs: [
      'Playa', 'Montaña', 'Bosque', 'Desierto', 'Ciudad', 'Aeropuerto', 'Hospital',
      'Escuela', 'Restaurante', 'Museo', 'Biblioteca', 'Parque', 'Centro Comercial', 'Estadio',
      'Iglesia', 'Castillo', 'Isla', 'Cueva', 'Volcán', 'Cascada', 'Zoológico',
      'Gimnasio', 'Cine', 'Panadería', 'Banco', 'Hotel', 'Granja', 'Selva', 'Acuario',
      'Faro', 'Puente', 'Puerto', 'Mercado', 'Catedral', 'Palacio', 'Cañón',
      'Glaciar', 'Pantano', 'Pradera', 'Valle', 'Llanura', 'Taberna', 'Teatro',
      'Prisión', 'Orfanato',
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
      'Marathon', 'Triathlon', 'Sailing', 'Polo', 'Lacrosse', 'Judo',
      'Taekwondo', 'Squash', 'Curling', 'Figure Skating', 'Horse Riding',
      'Handball', 'Water Polo', 'Sumo', 'Bobsleigh', 'Parkour',
      'Luge',
    ],
    wordsEs: [
      'Fútbol', 'Baloncesto', 'Tenis', 'Golf', 'Béisbol', 'Natación',
      'Boxeo', 'Lucha Libre', 'Hockey', 'Rugby', 'Voleibol', 'Esquí',
      'Surf', 'Ciclismo', 'Atletismo', 'Gimnasia', 'Kárate', 'Tiro con Arco',
      'Esgrima', 'Bolos', 'Monopatín', 'Snowboard', 'Bádminton',
      'Tenis de Mesa', 'Cricket', 'Remo', 'Buceo', 'Escalada',
      'Maratón', 'Triatlón', 'Vela', 'Polo', 'Lacrosse', 'Judo',
      'Taekwondo', 'Squash', 'Curling', 'Patinaje Artístico', 'Equitación',
      'Balonmano', 'Waterpolo', 'Sumo', 'Bobsleigh', 'Parkour',
      'Luge',
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
      'Tailor', 'Barber', 'Judge', 'Sailor', 'Soldier', 'Coach',
      'Translator', 'Baker', 'Welder', 'Paramedic', 'Florist',
      'Janitor', 'Psychologist', 'Biologist', 'Geologist', 'Animator',
      'Butcher',
    ],
    wordsEs: [
      'Doctor', 'Profesor', 'Ingeniero', 'Chef', 'Piloto', 'Abogado', 'Artista',
      'Músico', 'Actor', 'Escritor', 'Enfermero', 'Policía', 'Bombero',
      'Granjero', 'Mecánico', 'Dentista', 'Arquitecto', 'Fotógrafo',
      'Científico', 'Astronauta', 'Detective', 'Bibliotecario', 'Electricista',
      'Plomero', 'Periodista', 'Cirujano', 'Veterinario', 'Carpintero',
      'Sastre', 'Barbero', 'Juez', 'Marinero', 'Soldado', 'Entrenador',
      'Traductor', 'Panadero', 'Soldador', 'Paramédico', 'Florista',
      'Conserje', 'Psicólogo', 'Biólogo', 'Geólogo', 'Animador',
      'Carnicero',
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
      'USB Drive', 'Webcam', 'Hard Drive', 'Graphics Card', 'Modem',
      'Virtual Reality', '3D Printer', 'Calculator', 'Flashlight', 'GPS',
      'Solar Panel', 'Thermostat', 'Security Camera', 'Smart TV', 'E-Reader',
      'Laser Printer', 'Server', 'Memory Card', 'VR Headset', 'Digital Frame',
      'Power Bank',
    ],
    wordsEs: [
      'Computadora', 'Teléfono', 'Tableta', 'Portátil', 'Televisión', 'Cámara',
      'Auriculares', 'Teclado', 'Ratón', 'Monitor', 'Impresora', 'Router',
      'Dron', 'Robot', 'Satélite', 'Consola', 'Reloj Inteligente', 'Altavoz',
      'Micrófono', 'Proyector', 'Escáner', 'Cargador', 'Batería', 'Cable',
      'Memoria USB', 'Cámara Web', 'Disco Duro', 'Tarjeta Gráfica', 'Módem',
      'Realidad Virtual', 'Impresora 3D', 'Calculadora', 'Linterna', 'GPS',
      'Panel Solar', 'Termostato', 'Cámara de Seguridad', 'Smart TV', 'Lector Digital',
      'Impresora Láser', 'Servidor', 'Tarjeta de Memoria', 'Casco VR', 'Marco Digital',
      'Batería Portátil',
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
      'Oboe', 'Mandolin', 'Bongo', 'Conga', 'Maracas', 'Castanets',
      'Timpani', 'Bagpipes', 'Cornet', 'Tuba', 'Viola', 'Sitar',
      'Didgeridoo', 'Kalimba', 'Theremin', 'Koto', 'Pan Flute', 'Djembe',
      'Lyre', 'Triangle', 'Gong', 'Harmonium', 'Steel Drum', 'Zither',
      'Lap Steel Guitar',
    ],
    wordsEs: [
      'Guitarra', 'Piano', 'Batería', 'Violín', 'Trompeta', 'Saxofón', 'Flauta',
      'Violonchelo', 'Arpa', 'Acordeón', 'Armónica', 'Ukulele', 'Bajo', 'Clarinete',
      'Trombón', 'Banjo', 'Órgano', 'Sintetizador', 'Pandereta', 'Xilófono',
      'Oboe', 'Mandolina', 'Bongó', 'Conga', 'Maracas', 'Castañuelas',
      'Tímpano', 'Gaita', 'Corneta', 'Tuba', 'Viola', 'Sitar',
      'Didgeridoo', 'Kalimba', 'Theremin', 'Koto', 'Flauta de Pan', 'Djembe',
      'Lira', 'Triángulo', 'Gong', 'Harmonio', 'Steel Drum', 'Cítara',
      'Guitarra Lap Steel',
    ],
  },
  {
    id: 'bible',
    name: 'Bible',
    icon: '📖',
    words: [
      'Moses', 'Jesus', 'Abraham', 'David', 'Solomon', 'Noah', 'Eve', 'Adam',
      'Mary', 'Joseph', 'Peter', 'Paul', 'John', 'Matthew', 'Mark', 'Luke',
      'Genesis', 'Exodus', 'Psalms', 'Proverbs', 'Matthew', 'Revelation',
      'Commandments', 'Miracle', 'Prayer', 'Faith', 'Baptism', 'Resurrection',
      'Cross', 'Angel', 'Disciple', 'Parable', 'Temple', 'Ark', 'Manna',
      'Covenant', 'Prophet', 'Shepherd', 'Lamb', 'Olive', 'Bread', 'Wine',
      'Fish', 'Star', 'Dove',
    ],
    wordsEs: [
      'Moisés', 'Jesús', 'Abraham', 'David', 'Salomón', 'Noé', 'Eva', 'Adán',
      'María', 'José', 'Pedro', 'Pablo', 'Juan', 'Mateo', 'Marcos', 'Lucas',
      'Génesis', 'Éxodo', 'Salmos', 'Proverbios', 'Mateo', 'Apocalipsis',
      'Mandamientos', 'Milagro', 'Oración', 'Fe', 'Bautismo', 'Resurrección',
      'Cruz', 'Ángel', 'Discípulo', 'Parábola', 'Templo', 'Arca', 'Maná',
      'Pacto', 'Profeta', 'Pastor', 'Cordero', 'Olivo', 'Pan', 'Vino',
      'Pez', 'Estrella', 'Paloma',
    ],
  },
  {
    id: 'colombianBrands',
    name: 'Colombian things',
    icon: '🙈',
    words: [
      'Chocorramo', 'Alpina', 'Juan Valdez', 'Colanta', 'Postobón', 'Águila',
      'Coca-Cola', 'Doría', 'Arequipe',
      'Jet', 'Colombina', 'Nucal', 'Cerveza Poker', 'Ramo', 'Nescafé', 'Cerveza Andina',
      'Color Royal "especia"', 'Papel Familia', 'Bimbo', 'Arturo Calle', 'Studio F', 'Éxito',
      'Carrefour', 'Homecenter', 'Sofasa', 'Renault', 'Parmalat', 'Lechesan',
      'Choclitos', 'Chiclets Adams', 'Bom Bom Bun', 'Trident', 'Halls',
      'Gelatina de pata', 'Barrilete', 'Arequipe Alpina',
      'Costeñita', 'Pony Malta', 'Cristal', 'La Colina',
      'Gatorade', 'Kola Román', 'Bon Ice', 'Milo', 'Café Oma',
    ],
    wordsEs: [
      'Chocorramo', 'Alpina', 'Juan Valdez', 'Colanta', 'Postobón', 'Águila',
      'Coca-Cola', 'Doría', 'Arequipe',
      'Jet', 'Colombina', 'Nucal', 'Cerveza Poker', 'Ramo', 'Nescafé', 'Cerveza Andina',
      'Color Royal "especia"', 'Papel Familia', 'Bimbo', 'Arturo Calle', 'Studio F', 'Éxito',
      'Carrefour', 'Homecenter', 'Sofasa', 'Renault', 'Parmalat', 'Lechesan',
      'Choclitos', 'Chiclets Adams', 'Bom Bom Bun', 'Trident', 'Halls',
      'Gelatina de pata', 'Barrilete', 'Arequipe Alpina',
      'Costeñita', 'Pony Malta', 'Cristal', 'La Colina',
      'Gatorade', 'Kola Román', 'Bon Ice', 'Milo', 'Café Oma',
    ],
  },
];

/**
 * Returns the appropriate word list for a given category and language.
 */
export const getWords = (category: ExtendedCategory, language: Language): string[] => {
  return language === 'es' ? category.wordsEs : category.words;
};

/**
 * Picks a random word from the category, respecting the specified language.
 */
export const getRandomWord = (category: ExtendedCategory, language: Language): string => {
  const words = getWords(category, language);
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

/**
 * Finds a category by its ID.
 */
export const getCategoryById = (id: string): ExtendedCategory | undefined => {
  return defaultCategories.find(cat => cat.id === id);
};

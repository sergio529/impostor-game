const en = {
  // Common
  back: 'BACK',
  next: 'NEXT',
  confirm: 'CONFIRM',
  cancel: 'CANCEL',
  skip: 'SKIP',
  close: 'CLOSE',

  // Home Screen
  home: {
    title: 'IMPOSTOR',
    subtitle: 'Find the fake among you',
    newGame: 'NEW GAME',
    howToPlay: 'HOW TO PLAY',
    language: 'LANGUAGE',
  },

  // Setup Screen
  setup: {
    title: 'GAME SETUP',
    players: 'PLAYERS',
    impostors: 'IMPOSTORS',
    maxImpostors: 'Maximum {{count}} impostor(s) for {{players}} players',
    selectCategory: 'SELECT CATEGORY',
    selected: 'SELECTED',
    startGame: 'CONTINUE',
    selectCategoryHint: 'Select a category to continue',
    words: 'words',
  },

  // Player Names Screen
  playerNames: {
    title: 'PLAYER NAMES',
    subtitle: 'Enter names for each player (optional)',
    placeholder: 'Player {{number}}',
    continue: 'START GAME',
  },

  // Pass Device Screen
  passDevice: {
    instruction: 'PASS DEVICE TO',
    warning: 'Make sure no one else can see the screen',
    ready: "I'M READY",
    playerOf: 'Player {{current}} of {{total}}',
  },

  // Role Reveal Screen
  roleReveal: {
    decrypting: 'DECRYPTING...',
    yourRole: 'YOUR ROLE',
    impostor: 'IMPOSTOR',
    crewmate: 'CREWMATE',
    secretWord: 'THE SECRET WORD IS',
    impostorTip: 'Blend in and figure out the word without getting caught!',
    crewmateTip: 'Find the impostor by asking clever questions!',
    gotIt: 'GOT IT',
    memorizeHint: "Press when you've memorized your role",
    hiding: 'HIDING...',
  },

  // Discussion Screen
  discussion: {
    title: 'DISCUSSION PHASE',
    round: 'Round {{number}}',
    noTimeLimit: 'NO TIME LIMIT',
    timeRemaining: 'TIME REMAINING',
    howToPlayTitle: 'HOW TO PLAY',
    rule1: 'Take turns describing the secret word WITHOUT saying it',
    rule2: "Ask questions to find who doesn't know the word",
    rule3: 'The impostor must blend in and guess the word',
    category: 'CATEGORY',
    playersInfo: '{{players}} Players • {{impostors}} Impostor(s)',
    startVoting: 'START VOTING',
    timesUp: "TIME'S UP - START VOTING",
  },

  // Voting Screen
  voting: {
    title: 'VOTING PHASE',
    voterOf: 'Voter {{current}} of {{total}}',
    currentVoter: 'CURRENT VOTER',
    instruction: 'Select the player you think is the impostor',
    confirmVote: 'CONFIRM VOTE',
    skipVote: 'SKIP VOTE',
  },

  // Voting Results Screen
  votingResults: {
    title: 'VOTE RESULTS',
    eliminated: 'ELIMINATED',
    noElimination: 'NO ONE ELIMINATED',
    tieVote: 'The vote was a tie!',
    wasImpostor: 'was an IMPOSTOR',
    wasCrewmate: 'was a CREWMATE',
    impostorsRemaining: '{{count}} impostor(s) remaining',
    crewmatesRemaining: '{{count}} crewmate(s) remaining',
    continueGame: 'CONTINUE',
    gameOver: 'SEE FINAL RESULTS',
  },

  // Results Screen
  results: {
    title: 'GAME OVER',
    tie: "IT'S A TIE!",
    noElimination: 'No one was eliminated',
    crewmatesWin: 'CREWMATES WIN!',
    impostorsWin: 'IMPOSTORS WIN!',
    eliminated: 'ELIMINATED',
    wasImpostor: 'WAS THE IMPOSTOR',
    wasCrewmate: 'WAS A CREWMATE',
    secretWordWas: 'THE SECRET WORD WAS',
    impostorWas: 'THE IMPOSTOR WAS',
    impostorsWere: 'THE IMPOSTORS WERE',
    voteSummary: 'VOTE SUMMARY',
    vote: 'vote',
    votes: 'votes',
    playAgain: 'PLAY AGAIN',
    newSetup: 'NEW SETUP',
    homeButton: 'HOME',
    allImpostorsEliminated: 'All impostors were eliminated!',
    impostorsMajority: 'Impostors reached majority!',
    eliminatedPlayers: 'ELIMINATED PLAYERS',
    survivingPlayers: 'SURVIVING PLAYERS',
    rounds: 'rounds',
  },

  // How to Play Modal
  howToPlay: {
    title: 'HOW TO PLAY',
    objective: 'OBJECTIVE',
    objectiveText:
      "Find the impostor among the players! The impostor doesn't know the secret word and must blend in.",
    rolesTitle: 'ROLES',
    crewmateRole: 'CREWMATE',
    crewmateDesc:
      "You know the secret word. Describe it without saying it and find who doesn't know it.",
    impostorRole: 'IMPOSTOR',
    impostorDesc:
      "You don't know the word. Listen carefully, blend in, and try to figure out the word.",
    gameplayTitle: 'GAMEPLAY',
    step1: 'Each player sees their role privately',
    step2: 'Take turns describing the secret word',
    step3: 'Ask questions to find suspicious players',
    step4: 'Vote to eliminate the suspected impostor',
    step5: 'Crewmates win if they eliminate all impostors',
    step6: 'Impostors win if they equal or outnumber crewmates',
    tipsTitle: 'TIPS',
    tip1: "Be vague enough that the impostor can't guess",
    tip2: 'But specific enough to prove you know the word',
    tip3: 'Watch for players who give generic answers',
    gotIt: 'GOT IT!',
  },

  // Categories
  categories: {
    animals: 'Animals',
    food: 'Food',
    movies: 'Movies',
    places: 'Places',
    sports: 'Sports',
    professions: 'Jobs',
    technology: 'Tech',
    music: 'Music',
  },
};

const es = {
  // Common
  back: 'ATRÁS',
  next: 'SIGUIENTE',
  confirm: 'CONFIRMAR',
  cancel: 'CANCELAR',
  skip: 'SALTAR',
  close: 'CERRAR',

  // Home Screen
  home: {
    title: 'IMPOSTOR',
    subtitle: 'Encuentra al falso entre ustedes',
    newGame: 'NUEVO JUEGO',
    howToPlay: 'CÓMO JUGAR',
    language: 'IDIOMA',
  },

  // Setup Screen
  setup: {
    title: 'CONFIGURACIÓN',
    players: 'JUGADORES',
    impostors: 'IMPOSTORES',
    maxImpostors: 'Máximo {{count}} impostor(es) para {{players}} jugadores',
    selectCategory: 'SELECCIONAR CATEGORÍA',
    selected: 'SELECCIONADO',
    startGame: 'CONTINUAR',
    selectCategoryHint: 'Selecciona una categoría para continuar',
    words: 'palabras',
  },

  // Player Names Screen
  playerNames: {
    title: 'NOMBRES',
    subtitle: 'Ingresa los nombres de cada jugador (opcional)',
    placeholder: 'Jugador {{number}}',
    continue: 'INICIAR JUEGO',
  },

  // Pass Device Screen
  passDevice: {
    instruction: 'PASA EL DISPOSITIVO A',
    warning: 'Asegúrate de que nadie más pueda ver la pantalla',
    ready: 'ESTOY LISTO',
    playerOf: 'Jugador {{current}} de {{total}}',
  },

  // Role Reveal Screen
  roleReveal: {
    decrypting: 'DESCIFRANDO...',
    yourRole: 'TU ROL',
    impostor: 'IMPOSTOR',
    crewmate: 'TRIPULANTE',
    secretWord: 'LA PALABRA SECRETA ES',
    impostorTip: '¡Mézclate y descubre la palabra sin ser descubierto!',
    crewmateTip: '¡Encuentra al impostor haciendo preguntas inteligentes!',
    gotIt: 'ENTENDIDO',
    memorizeHint: 'Presiona cuando hayas memorizado tu rol',
    hiding: 'OCULTANDO...',
  },

  // Discussion Screen
  discussion: {
    title: 'FASE DE DISCUSIÓN',
    round: 'Ronda {{number}}',
    noTimeLimit: 'SIN LÍMITE DE TIEMPO',
    timeRemaining: 'TIEMPO RESTANTE',
    howToPlayTitle: 'CÓMO JUGAR',
    rule1: 'Tomen turnos describiendo la palabra secreta SIN decirla',
    rule2: 'Hagan preguntas para encontrar quién no conoce la palabra',
    rule3: 'El impostor debe mezclarse y adivinar la palabra',
    category: 'CATEGORÍA',
    playersInfo: '{{players}} Jugadores • {{impostors}} Impostor(es)',
    startVoting: 'INICIAR VOTACIÓN',
    timesUp: 'TIEMPO AGOTADO - INICIAR VOTACIÓN',
  },

  // Voting Screen
  voting: {
    title: 'FASE DE VOTACIÓN',
    voterOf: 'Votante {{current}} de {{total}}',
    currentVoter: 'VOTANTE ACTUAL',
    instruction: 'Selecciona al jugador que crees que es el impostor',
    confirmVote: 'CONFIRMAR VOTO',
    skipVote: 'SALTAR VOTO',
  },

  // Voting Results Screen
  votingResults: {
    title: 'RESULTADOS DE VOTACIÓN',
    eliminated: 'ELIMINADO',
    noElimination: 'NADIE FUE ELIMINADO',
    tieVote: '¡La votación fue un empate!',
    wasImpostor: 'era un IMPOSTOR',
    wasCrewmate: 'era un TRIPULANTE',
    impostorsRemaining: '{{count}} impostor(es) restante(s)',
    crewmatesRemaining: '{{count}} tripulante(s) restante(s)',
    continueGame: 'CONTINUAR',
    gameOver: 'VER RESULTADOS FINALES',
  },

  // Results Screen
  results: {
    title: 'FIN DEL JUEGO',
    tie: '¡ES UN EMPATE!',
    noElimination: 'Nadie fue eliminado',
    crewmatesWin: '¡GANAN LOS TRIPULANTES!',
    impostorsWin: '¡GANAN LOS IMPOSTORES!',
    eliminated: 'ELIMINADO',
    wasImpostor: 'ERA EL IMPOSTOR',
    wasCrewmate: 'ERA UN TRIPULANTE',
    secretWordWas: 'LA PALABRA SECRETA ERA',
    impostorWas: 'EL IMPOSTOR ERA',
    impostorsWere: 'LOS IMPOSTORES ERAN',
    voteSummary: 'RESUMEN DE VOTOS',
    vote: 'voto',
    votes: 'votos',
    playAgain: 'JUGAR DE NUEVO',
    newSetup: 'NUEVA CONFIG.',
    homeButton: 'INICIO',
    allImpostorsEliminated: '¡Todos los impostores fueron eliminados!',
    impostorsMajority: '¡Los impostores alcanzaron la mayoría!',
    eliminatedPlayers: 'JUGADORES ELIMINADOS',
    survivingPlayers: 'JUGADORES SOBREVIVIENTES',
    rounds: 'rondas',
  },

  // How to Play Modal
  howToPlay: {
    title: 'CÓMO JUGAR',
    objective: 'OBJETIVO',
    objectiveText:
      '¡Encuentra al impostor entre los jugadores! El impostor no conoce la palabra secreta y debe mezclarse.',
    rolesTitle: 'ROLES',
    crewmateRole: 'TRIPULANTE',
    crewmateDesc:
      'Conoces la palabra secreta. Descríbela sin decirla y encuentra quién no la conoce.',
    impostorRole: 'IMPOSTOR',
    impostorDesc:
      'No conoces la palabra. Escucha atentamente, mézclate e intenta descubrir la palabra.',
    gameplayTitle: 'JUGABILIDAD',
    step1: 'Cada jugador ve su rol en privado',
    step2: 'Tomen turnos describiendo la palabra secreta',
    step3: 'Hagan preguntas para encontrar jugadores sospechosos',
    step4: 'Voten para eliminar al sospechoso de ser impostor',
    step5: 'Los tripulantes ganan si eliminan a todos los impostores',
    step6: 'Los impostores ganan si igualan o superan a los tripulantes',
    tipsTitle: 'CONSEJOS',
    tip1: 'Sé lo suficientemente vago para que el impostor no adivine',
    tip2: 'Pero lo suficientemente específico para demostrar que conoces la palabra',
    tip3: 'Observa a los jugadores que dan respuestas genéricas',
    gotIt: '¡ENTENDIDO!',
  },

  // Categories
  categories: {
    animals: 'Animales',
    food: 'Comida',
    movies: 'Películas',
    places: 'Lugares',
    sports: 'Deportes',
    professions: 'Trabajos',
    technology: 'Tecnología',
    music: 'Música',
  },
};

export const translations = {
  en,
  es,
};

export type Language = 'en' | 'es';
export type Translations = typeof en;
export const cards = [
  { title: '1 Advance to Go', description: 'Collect £200 as you pass Go.' },

  {
    title: '2 Advance to Pall Mall',
    description: 'If you pass Go, collect £200.',
  },
  {
    title: '3 Advance to The Strand',
    description: 'If you pass Go, collect £200.',
  },
  {
    title: '4 Advance to the nearest Station',
    description:
      'If unowned, you may buy it from the bank. If owned, pay owner twice the rental value.',
  },
  {
    title: '5 Advance to the nearest Utility',
    description:
      'If unowned, you may buy it from the bank. If owned, throw die and pay owner a total of 10 times the amount thrown.',
  },
  // {
  //   title: "Take a Trip to King's Cross Station",
  //   description: 'If you pass Go, collect £200.',
  // },
  // { title: 'You have won a Beauty Contest', description: 'Collect £10.' },
  // { title: 'Inheritance comes to you', description: 'Collect £100.' },

  // { title: 'Pay School Fees', description: 'Pay £50.' },
  // { title: 'Bank pays you Dividend', description: 'Collect £50.' },
  // {
  //   title: 'Get Out of Jail Free',
  //   description: 'Keep this card until you use it or sell it.',
  // },
  // {
  //   title: 'Go Back 3 Spaces',
  //   description: 'Move back 3 spaces on the board.',
  // },
  // { title: 'Go to Mayfair', description: 'If you pass Go, collect £200.' },
];

export const specialCards = [
  {
    title: 'Go to Jail',
    description: 'Go directly to Jail. Do not pass Go, do not collect £200.',
    result: 'HOST',
  },
  {
    title: 'You are Assessed for Street Repairs',
    description: 'Pay £40 per house and £115 per hotel you own.',
    result: 'QUOTE',
  },
];

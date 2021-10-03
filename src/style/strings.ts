const Strings = {
  root: 'Star Wars App',
  home: 'Home',
  explore: 'Explore',
  settings: 'Settings',
  list: 'List',
  loadMore: 'Load More',
  reload: 'Reload',
  relations: 'Relations',
  empty: {
    title: 'Title',
    subtitle: 'Sub Title',
  },
  films: 'Films',
  pilots: 'Pilots',
  people: 'People',
  species: 'Species',
  starships: 'Starships',
  vehicles: 'Vehicles',
  characters: 'Characters',
  planets: 'Planets',

  film: 'Film',
  pilot: 'Pilot',
  person: 'Person',
  specie: 'Species',
  starship: 'Starship',
  vehicle: 'Vehicle',
  character: 'Character',
  planet: 'Planet',

  residents: 'Residents',
  noInternetMessage: 'Please connect to the internet to fetch recipes',
  errorTitle: 'Oooops..',
  errorMessage: 'Something went wrong 😞 \nPlease try again later',
  version: 'version',
  loading: 'Loading',
  warnings: {
    noInternet: 'No internet connection',
  },
  validation: {
    required: 'This field is required',
    valid: (field: string): string => {
      return `Please enter valid ${field}`;
    },
    empty: (field: string): string => {
      return `${field.toUpperCase()} cannot be empty`;
    },
  },

  reset: 'Reset',
};

export {Strings};

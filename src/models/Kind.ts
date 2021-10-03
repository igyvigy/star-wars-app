import {Strings} from '@style/strings';
import {ImageSourcePropType} from 'react-native';
import Film from '@models/Film';
import Person from '@models/Person';
import Planet from '@models/Planet';
import Species from '@models/Species';
import Starship from '@models/Starship';
import SWModel from '@models/SWModel';
import Vehicle from '@models/Vehicle';

enum Kind {
  PEOPLE = 'people',
  FILMS = 'films',
  SPECIES = 'species',
  STARSHIPS = 'starships',
  VEHICLES = 'vehicles',
  PLANETS = 'planets',
}

export type KindObjects = {
  [Property in keyof Kind]: {};
};

export type KindArrays = {
  [Property in keyof Kind]: [];
};

export type KindNulls = {
  [Property in keyof Kind]: undefined;
};

export const modelTypeForKind = (kind: Kind): typeof SWModel => {
  switch (kind) {
    case Kind.FILMS:
      return Film;
    case Kind.PEOPLE:
      return Person;
    case Kind.PLANETS:
      return Planet;
    case Kind.SPECIES:
      return Species;
    case Kind.STARSHIPS:
      return Starship;
    case Kind.VEHICLES:
      return Vehicle;
  }
};

export const nameForKind = (kind: Kind, plural: boolean = true): string => {
  switch (kind) {
    case Kind.FILMS:
      return plural ? Strings.films : Strings.film;
    case Kind.PEOPLE:
      return plural ? Strings.people : Strings.person;
    case Kind.PLANETS:
      return plural ? Strings.planets : Strings.planet;
    case Kind.SPECIES:
      return plural ? Strings.species : Strings.specie;
    case Kind.STARSHIPS:
      return plural ? Strings.starships : Strings.starship;
    case Kind.VEHICLES:
      return plural ? Strings.vehicles : Strings.vehicle;
  }
};

export const imageForKind = (kind: Kind): ImageSourcePropType => {
  switch (kind) {
    case Kind.FILMS:
      return require('@assets/images/films.jpeg');
    case Kind.PEOPLE:
      return require('@assets/images/people.jpg');
    case Kind.PLANETS:
      return require('@assets/images/planets.png');
    case Kind.SPECIES:
      return require('@assets/images/species.jpg');
    case Kind.STARSHIPS:
      return require('@assets/images/starships.jpg');
    case Kind.VEHICLES:
      return require('@assets/images/vehicles.jpg');
  }
};

export const extractKindFromModelUrl = (url: string): Kind => {
  let _url = url;
  if (_url.charAt(_url.length - 1) === '/') {
    _url = _url.substring(0, _url.length - 1);
  }
  const parts = _url.split('/');
  const kind = parts[parts.length - 2];
  switch (kind) {
    case Kind.FILMS:
      return Kind.FILMS;
    case Kind.PEOPLE:
      return Kind.PEOPLE;
    case Kind.PLANETS:
      return Kind.PLANETS;
    case Kind.SPECIES:
      return Kind.SPECIES;
    case Kind.STARSHIPS:
      return Kind.STARSHIPS;
    case Kind.VEHICLES:
      return Kind.VEHICLES;
    default:
      return Kind.PEOPLE;
  }
};

export default Kind;

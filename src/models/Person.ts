import SWModel, {SWModelDataSource} from '@models/SWModel';
import {maybeUrlsFromArray} from '@utils/.';
import {Strings} from '@style/strings';
import Film from '@models/Film';
import Planet from '@models/Planet';
import Species from '@models/Species';
import Starship from '@models/Starship';
import Vehicle from '@models/Vehicle';
import Link from '@models/Link';
import Kind from '@models/Kind';

class Person extends SWModel {
  _body: object = {};
  _links: Link[] = [];
  _title?: string;
  _subtitle?: string;

  name?: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
  homeworld?: Planet;
  films?: Film[];
  species?: Species[];
  vehicles?: Vehicle[];
  starships?: Starship[];

  constructor(dataSource: SWModelDataSource) {
    super(dataSource);
    if (typeof this.dataSource === 'object') {
      const json = this.dataSource;
      this.name = json['name'];
      this.height = json['height'];
      this.mass = json['mass'];
      this.hair_color = json['hair_color'];
      this.skin_color = json['skin_color'];
      this.eye_color = json['eye_color'];
      this.birth_year = json['birth_year'];
      this.gender = json['gender'];
      if (json['homeworld']) {
        this.homeworld = new Planet({
          data: json['homeworld'],
          byId: dataSource.byId,
        });
      }
      this.films =
        json['films'] &&
        json['films'].map(
          urlOrJson => new Film({data: urlOrJson, byId: dataSource.byId}),
        );

      this.species =
        json['species'] &&
        json['species'].map(
          urlOrJson => new Species({data: urlOrJson, byId: dataSource.byId}),
        );
      this.vehicles =
        json['vehicles'] &&
        json['vehicles'].map(
          urlOrJson => new Vehicle({data: urlOrJson, byId: dataSource.byId}),
        );
      this.starships =
        json['starships'] &&
        json['starships'].map(
          urlOrJson => new Starship({data: urlOrJson, byId: dataSource.byId}),
        );

      this._title = this.name;
      this._subtitle = `height: ${this.height}, mass: ${this.mass}, birth: ${this.birth_year}`;
      this._body = {
        name: this.name,
        height: this.height,
        mass: this.mass,
        hair_color: this.hair_color,
        skin_color: this.skin_color,
        eye_color: this.eye_color,
        birth_year: this.birth_year,
        gender: this.gender,
        homeworld: this.homeworld,
      };
      this._links = [
        {
          type: Kind.FILMS,
          title: Strings.films,
          values: maybeUrlsFromArray(this.films),
        },
        {
          type: Kind.SPECIES,
          title: Strings.species,
          values: maybeUrlsFromArray(this.species),
        },
        {
          type: Kind.STARSHIPS,
          title: Strings.starships,
          values: maybeUrlsFromArray(this.starships),
        },
        {
          type: Kind.VEHICLES,
          title: Strings.vehicles,
          values: maybeUrlsFromArray(this.vehicles),
        },
      ];
    }
  }
}

export default Person;

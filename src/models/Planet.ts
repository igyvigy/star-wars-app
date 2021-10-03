import SWModel, {SWModelDataSource} from '@models/SWModel';
import Film from '@models/Film';
import Person from '@models/Person';
import Link from './Link';
import {Strings} from '@style/strings';
import {maybeUrlsFromArray} from '@utils/.';
import Kind from './Kind';

class Planet extends SWModel {
  _body: object = {};
  _links: Link[] = [];
  _title?: string;
  _subtitle?: string;

  name?: string;
  diameter?: string;
  rotation_period?: string;
  orbital_period?: string;
  gravity?: string;
  climate?: string;
  terrain?: string;
  surface_water?: string;
  residents?: Person[];
  films?: Film[];

  constructor(dataSource: SWModelDataSource) {
    super(dataSource);
    if (typeof this.dataSource === 'object') {
      const json = this.dataSource;
      this.name = json['name'];
      this.diameter = json['diameter'];
      this.rotation_period = json['rotation_period'];
      this.orbital_period = json['orbital_period'];
      this.gravity = json['gravity'];
      this.climate = json['climate'];
      this.terrain = json['terrain'];
      this.surface_water = json['surface_water'];
      this.residents =
        json['residents'] &&
        json['residents'].map(
          urlOrJson => new Person({data: urlOrJson, byId: dataSource.byId}),
        );
      this.films =
        json['films'] &&
        json['films'].map(
          urlOrJson => new Film({data: urlOrJson, byId: dataSource.byId}),
        );

      this._title = this.name;
      this._subtitle = `diameter: ${this.diameter}, gravity: ${this.gravity}, climate: ${this.climate}`;
      this._body = {
        name: this.name,
        diameter: this.diameter,
        rotation_period: this.rotation_period,
        orbital_period: this.orbital_period,
        gravity: this.gravity,
        climate: this.climate,
        terrain: this.terrain,
        surface_water: this.surface_water,
      };
      this._links = [
        {
          type: Kind.PEOPLE,
          title: Strings.residents,
          values: maybeUrlsFromArray(this.residents),
        },
        {
          type: Kind.FILMS,
          title: Strings.films,
          values: maybeUrlsFromArray(this.films),
        },
      ];
    }
  }
}

export default Planet;

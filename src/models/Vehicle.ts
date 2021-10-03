import SWModel, {SWModelDataSource} from '@models/SWModel';
import Film from '@models/Film';
import Person from '@models/Person';
import Link from '@models/Link';
import Kind from '@models/Kind';
import {Strings} from '@style/strings';
import {maybeUrlsFromArray} from '@utils/.';

class Vehicle extends SWModel {
  _body: object = {};
  _links: Link[] = [];
  _title?: string;
  _subtitle?: string;

  name?: string;
  model?: string;
  vehicle_class?: string;
  manufacturer?: string;
  cost_in_credits?: string;
  length?: string;
  crew?: string;
  passengers?: string;
  max_atmosphering_speed?: string;
  cargo_capacity?: string;
  consumables?: string;

  films?: Film[];
  pilots?: Person[];

  constructor(dataSource: SWModelDataSource) {
    super(dataSource);
    if (typeof this.dataSource === 'object') {
      const json = this.dataSource;
      this.name = json['name'];
      this.model = json['model'];
      this.vehicle_class = json['vehicle_class'];
      this.manufacturer = json['manufacturer'];
      this.cost_in_credits = json['cost_in_credits'];
      this.length = json['length'];
      this.crew = json['crew'];
      this.passengers = json['passengers'];
      this.max_atmosphering_speed = json['max_atmosphering_speed'];
      this.cargo_capacity = json['cargo_capacity'];
      this.consumables = json['consumables'];
      this.films =
        json['films'] &&
        json['films'].map(
          urlOrJson => new Film({data: urlOrJson, byId: dataSource.byId}),
        );
      this.pilots =
        json['pilots'] &&
        json['pilots'].map(
          urlOrJson => new Person({data: urlOrJson, byId: dataSource.byId}),
        );

      this._title = this.name;
      this._subtitle = `model: ${this.model}, class: ${this.vehicle_class}, cost: ${this.cost_in_credits}`;
      this._body = {
        name: this.name,
        model: this.model,
        vehicle_class: this.vehicle_class,
        manufacturer: this.manufacturer,
        cost_in_credits: this.cost_in_credits,
        length: this.length,
        crew: this.crew,
        passengers: this.passengers,
        max_atmosphering_speed: this.max_atmosphering_speed,
        cargo_capacity: this.cargo_capacity,
        consumables: this.consumables,
      };
      this._links = [
        {
          type: Kind.FILMS,
          title: Strings.films,
          values: maybeUrlsFromArray(this.films),
        },
        {
          type: Kind.PEOPLE,
          title: Strings.pilots,
          values: maybeUrlsFromArray(this.pilots),
        },
      ];
    }
  }
}

export default Vehicle;

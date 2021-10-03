import SWModel, {SWModelDataSource} from '@models/SWModel';
import {maybeUrlsFromArray} from '@utils/.';
import {Strings} from '@style/strings';
import Film from '@models/Film';
import Person from '@models/Person';
import Planet from '@models/Planet';
import Link from '@models/Link';
import Kind from '@models/Kind';

class Species extends SWModel {
  _body: object = {};
  _links: Link[] = [];
  _title?: string;
  _subtitle?: string;

  name?: string;
  classification?: string;
  designation?: string;
  average_height?: string;
  average_lifespan?: string;
  eye_colors?: string;
  hair_colors?: string;
  skin_colors?: string;
  language?: string;
  homeworld?: Planet;
  people?: Person[];
  films?: Film[];

  constructor(dataSource: SWModelDataSource) {
    super(dataSource);
    if (typeof this.dataSource === 'object') {
      const json = this.dataSource;
      this.name = json['name'];
      this.classification = json['classification'];
      this.designation = json['designation'];
      this.average_height = json['average_height'];
      this.average_lifespan = json['average_lifespan'];
      this.eye_colors = json['eye_colors'];
      this.hair_colors = json['hair_colors'];
      this.skin_colors = json['skin_colors'];
      this.language = json['language'];
      if (json['homeworld']) {
        this.homeworld = new Planet({
          data: json['homeworld'],
          byId: dataSource.byId,
        });
      }
      this.people =
        json['people'] &&
        json['people'].map(
          urlOrJson => new Person({data: urlOrJson, byId: dataSource.byId}),
        );
      this.films =
        json['films'] &&
        json['films'].map(
          urlOrJson => new Film({data: urlOrJson, byId: dataSource.byId}),
        );

      this._title = this.name;
      this._subtitle = `classification: ${this.classification}, language: ${this.language}, lifespan: ${this.average_lifespan}`;
      this._body = {
        name: this.name,
        classification: this.classification,
        designation: this.designation,
        average_height: this.average_height,
        average_lifespan: this.average_lifespan,
        eye_colors: this.eye_colors,
        hair_colors: this.hair_colors,
        skin_colors: this.skin_colors,
        language: this.language,
        homeworld: this.homeworld,
      };
      this._links = [
        {
          type: Kind.PEOPLE,
          title: Strings.people,
          values: maybeUrlsFromArray(this.people),
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

export default Species;

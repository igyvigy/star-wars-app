import SWModel, {SWModelDataSource} from '@models/SWModel';
import {maybeUrlsFromArray, nameForKind} from '@utils/.';
import Person from '@models/Person';
import Planet from '@models/Planet';
import Species from '@models/Species';
import Starship from '@models/Starship';
import Vehicle from '@models/Vehicle';
import Link from '@models/Link';
import Kind from '@models/Kind';

class Film extends SWModel {
  _body: object = {};
  _links: Link[] = [];
  _title?: string;
  _subtitle?: string;

  title?: string;
  episode_id?: number;
  opening_crawl?: string;
  director?: string;
  producer?: string;
  release_date?: Date;
  species?: Species[];
  starships?: Starship[];
  vehicles?: Vehicle[];
  characters?: Person[];
  planets?: Planet[];

  constructor(dataSource: SWModelDataSource) {
    super(dataSource);
    if (typeof this.dataSource === 'object') {
      const data = this.dataSource;
      this.title = data['title'];
      this.episode_id = data['episode_id'];
      this.opening_crawl = data['opening_crawl'];
      this.director = data['director'];
      this.producer = data['producer'];
      this.release_date = data['release_date'];
      this.species =
        data['species'] &&
        data['species'].map(
          urlOrJson => new Species({data: urlOrJson, byId: dataSource.byId}),
        );
      this.starships =
        data['starships'] &&
        data['starships'].map(
          urlOrJson => new Starship({data: urlOrJson, byId: dataSource.byId}),
        );
      this.vehicles =
        data['vehicles'] &&
        data['vehicles'].map(
          urlOrJson => new Vehicle({data: urlOrJson, byId: dataSource.byId}),
        );
      this.characters =
        data['characters'] &&
        data['characters'].map(
          urlOrJson => new Person({data: urlOrJson, byId: dataSource.byId}),
        );
      this.planets =
        data['planets'] &&
        data['planets'].map(
          urlOrJson => new Planet({data: urlOrJson, byId: dataSource.byId}),
        );

      this._title = this.title;
      this._subtitle = `date: ${this.release_date}, director: ${this.director}, producer: ${this.producer}`;
      this._body = {
        title: this.title,
        episode_id: this.episode_id,
        opening_crawl: this.opening_crawl,
        director: this.director,
        producer: this.producer,
        release_date: this.release_date,
      };
      this._links = [
        {
          type: Kind.SPECIES,
          title: nameForKind(Kind.SPECIES),
          values: maybeUrlsFromArray(this.species),
        },
        {
          type: Kind.STARSHIPS,
          title: nameForKind(Kind.STARSHIPS),
          values: maybeUrlsFromArray(this.starships),
        },
        {
          type: Kind.VEHICLES,
          title: nameForKind(Kind.VEHICLES),
          values: maybeUrlsFromArray(this.vehicles),
        },
        {
          type: Kind.PEOPLE,
          title: nameForKind(Kind.PEOPLE),
          values: maybeUrlsFromArray(this.characters),
        },
        {
          type: Kind.PLANETS,
          title: nameForKind(Kind.PLANETS),
          values: maybeUrlsFromArray(this.planets),
        },
      ];
    } else if (
      typeof dataSource.data !== 'object' &&
      typeof this.dataSource === 'object'
    ) {
      console.error(
        'typeof dataSource.data',
        typeof dataSource.data,
        this.dataSource,
      );
    }
  }
}

export default Film;

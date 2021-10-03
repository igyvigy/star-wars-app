import {extractIdFromModelUrl, extractKindFromModelUrl} from '@utils/.';
import Kind from '@models/Kind';
import Link from '@models/Link';

export type SWModelDataSource = {
  data: object | string;
  byId: (kind: Kind, id: number) => SWModel;
};

abstract class SWModel {
  abstract _title?: string;
  abstract _subtitle?: string;
  abstract _links: Link[];
  abstract _body: object;

  id?: number;
  kind?: Kind;
  created?: Date;
  edited?: Date;
  url?: string;

  dataSource: object | string;
  byId: (kind: Kind, id: number) => SWModel | undefined;

  needsFetch = true;
  isLinked = false;

  constructor(dataSource: SWModelDataSource) {
    this.dataSource = dataSource.data;
    this.byId = dataSource.byId;
    if (typeof dataSource.data === 'string') {
      this.url = dataSource.data;
      this.kind = extractKindFromModelUrl(this.url);
      this.id = extractIdFromModelUrl(this.url);
      const existing = this.byId(this.kind, this.id);
      if (existing) {
        this.needsFetch = false;
        this.isLinked = true;
      }
    }

    if (typeof this.dataSource === 'object') {
      let data = this.dataSource;
      this.url = data['url'];
      this.kind = extractKindFromModelUrl(data['url']);
      this.id = extractIdFromModelUrl(data['url']);
      this.created = new Date(data['created']);
      this.edited = new Date(data['edited']);
      this.needsFetch = false;
    }
  }
}

export default SWModel;

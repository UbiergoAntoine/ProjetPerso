
import { observable, computed } from 'mobx-angular';
import {
  createModelSchema,
  primitive,
  reference,
  list,
  object,
  identifier,
  serialize,
  deserialize,
  getDefaultModelSchema,
  serializable,
} from 'serializr';
import * as moment from 'moment';

export class Notes {

  @serializable id: string = null;
  @serializable note: string;
  @serializable date: string;
  @serializable order: number;
  constructor(data?) {
    this.setData(data);
  }
  setData(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
  @computed get prettyDate() {
    return moment(this.date).format('DD/MM/YY à HH:mm');
  }
}

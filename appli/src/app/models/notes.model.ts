
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
import * as moment from 'moment'; // Y'a un bug mais ça marche donc Fack it




export class Notes {

  @serializable id: string = null;
  @serializable singlenote: string;
  @serializable date: string = "";
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
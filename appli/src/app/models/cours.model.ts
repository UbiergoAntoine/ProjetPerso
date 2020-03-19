import { computed, observable } from 'mobx-angular';
import * as moment from 'moment'; // Y'a un bug mais ça marche donc Fack it
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

export class Cours {
  @serializable id = '';
  @serializable @observable name = '';
  @serializable photo = '';
  @serializable date = '';

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

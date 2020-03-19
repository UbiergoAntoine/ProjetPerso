import { computed, observable } from 'mobx-angular';
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
import { Cours } from './cours.model';

export class Matiere {
  @serializable id = '';
  @serializable @observable name = '';
  @serializable photo = '';
  // @serializable(list(primitive())) coursId: string[] = [];
  // @observable cours: Cours[] = [];
  constructor(data?) {
    this.setData(data);
  }

  setData(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
  // Pas de filter donc on va comparer les names et mettre le meme id si meme name
  // Mais je sais pas l'écrire

  // En fait on s'en fout quand on aura le meme objet
  // il saura déjà que c'est le meme name donc même ID

}

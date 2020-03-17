// import { observable, computed } from 'mobx-angular';
// import * as moment from 'moment'; // Y'a un bug mais ça marche donc Fack it

// export class KeyWord {
// }

// export class Musique {

//   @serializable id: string;
//   @serializable titre: string;
//   @serializable auteur: string;
//   @serializable(list(object(KeyWord))) keyWords: KeyWord[] = new Array<KeyWord>();
//   @serializable photo: string;
//   @serializable audio: string;
//   @serializable notes: string;
//   @serializable theme: string;
//   @serializable stackBlitz: string;
//   @serializable date: string = "";


//   constructor(data?) {
//     this.setData(data);
//   }

//   setData(data?: any) {
//     if (data) {
//       Object.assign(this, data);
//     }
//   }

//   @computed get postDate() {
//     return moment(this.date || new Date()).format('DD/MM/YY');
//   }

//   @computed get getKeyWords() {
//     if (this.keyWords) {
//       return this.keyWords.map(keyWord => keyWord.name.toLowerCase());
//     }
//   }
// }

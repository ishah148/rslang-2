export class UtilsService {
  static getCurrentDate() {
    const date = new Date();
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }
}

//!Возвращает дату в формате `2022/9/6` которая служит ключом объекта
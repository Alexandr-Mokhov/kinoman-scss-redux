import {
  CONFLICTING_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  AUTHORISATION_ERROR,
  BAD_REQUEST_ERROR,
} from '../constans';

export default function handleError(err, page) {
  console.log(err);
  if (err === CONFLICTING_REQUEST_ERROR) {
    return 'Пользователь с таким E-mail уже существует.';
  } else if (err === INTERNAL_SERVER_ERROR) {
    return '500 На сервере произошла ошибка.';
  } else if (err === AUTHORISATION_ERROR) {
    return 'Вы ввели неправильный логин или пароль.';
  } else if (err === BAD_REQUEST_ERROR) {
    return 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.';
  } else {
    if (page === 'register') {
      return 'При регистрации на сервере произошла ошибка.';
    } else if (page === 'login') {
      return 'При авторизации на сервере произошла ошибка.';
    } else if (page === 'profile') {
      return 'При обновлении профиля произошла ошибка.';
    } else {
      return 'На сервере произошла ошибка';
    }
  }
}


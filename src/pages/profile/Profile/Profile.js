/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormWithValidation } from '../../../utils/formValidator';
import { updateUserInfo } from '../../../api/MainApi';
import handleError from '../../../utils/handleError';
import { setIsLoading } from '../../../store/features/loadingSlice';
import { setCurrentUser } from '../../../store/features/userSlice';
import {
  NAME_RULE,
  EMAIL_RULE,
} from '../../../constans';

export default function Profile({ onSignOut }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loading.isLoading);
  const currentUser = useSelector(state => state.user);
  const [profileEdit, setProfileEdit] = useState(false);
  const [isMatches, setIsMatches] = useState(true);
  const { values, handleChange, errors, isValid, isRegEx } = useFormWithValidation();
  const [notificationText, setNotificationText] = useState('');

  function changeProfileEdit() {
    setProfileEdit(!profileEdit);
    setNotificationText('');
  }

  useEffect(() => {
    values['name'] = currentUser.name;
    values['email'] = currentUser.email;
  }, [])

  useEffect(() => {
    if (values['name'] === currentUser.name && values['email'] === currentUser.email) {
      setIsMatches(true);
    } else {
      setIsMatches(false);
      setNotificationText('');
    }
  }, [values])

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(setIsLoading(true));
    setNotificationText('');

    updateUserInfo({
      name: values['name'],
      email: values['email']
    })
      .then((res) => {
        if (res.email) {
          dispatch(setCurrentUser({ name: res.name, email: res.email }));
          localStorage.setItem('name', res.name);
          localStorage.setItem('email', res.email);
          setProfileEdit(false);
          setNotificationText('Данные успешно сохранены!');
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch((err) => {
        const page = 'profile';
        setNotificationText(handleError(err, page));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
        setIsMatches(true);
      })
  }

  return (
    <main className="profile">
      <section className="profile__section">
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <div className="profile__form-container">
            <div className="profile__inputs-container">
              <label className="profile__label" htmlFor="input-name">Имя</label>
              <input
                id="input-name"
                className={`profile__input ${errors['name'] && 'profile__input_type_error'}`}
                name="name"
                type="text"
                placeholder="Ваше имя"
                required
                minLength="2"
                maxLength="45"
                value={profileEdit ? values['name'] : currentUser.name || ''}
                onChange={handleChange}
                autoComplete="off"
                disabled={!profileEdit}
                pattern="[a-zA-Zа-яёА-ЯЁ\-\s]+"
              />
            </div>
            <span className="profile__input-error">
              {errors['name'] && !isRegEx['name'] && values['name'] ? NAME_RULE : errors['name']}
            </span>
            <div className="profile__inputs-container">
              <label className="profile__label" htmlFor="input-email">E-mail</label>
              <input
                id="input-email"
                className={`profile__input ${errors['email'] && 'profile__input_type_error'}`}
                name="email"
                type="email"
                placeholder="Ваша почта"
                required
                value={profileEdit ? values['email'] : currentUser.email || ''}
                onChange={handleChange}
                autoComplete="off"
                disabled={!profileEdit}
                pattern=".+@.+\.[a-z]{2,}"
              />
            </div>
            <span className="profile__input-error">
              {errors['email'] && !isRegEx['email'] && values['email'] ? EMAIL_RULE : errors['email']}  
            </span>
          </div>
          {profileEdit && <div className="profile__profile-edit">
            <span className="profile__notification profile__notification_type_error">
              {notificationText}
            </span>
            <button
              className={
                `profile__button 
                profile__button_type_save 
                profile__button_type_${isLoading || !isValid || isMatches ? 'inactive' : 'active'}`
              }
              type="submit"
              disabled={isLoading || !isValid || isMatches}
            >
              {!isLoading ? 'Сохранить' : 'Сохранение...'}
            </button>
          </div>}
          {!profileEdit && <div className="profile__buttons">
            <span className="profile__notification profile__notification_type_completed">{notificationText}</span>
            <button className="profile__button profile__button_type_edit" onClick={changeProfileEdit}>Редактировать</button>
            <button className="profile__button profile__button_type_exit" onClick={onSignOut}>Выйти из аккаунта</button>
          </div>}
        </form>
      </section>
    </main>
  )
}

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../../../components/Form/Form';
import { useFormWithValidation } from '../../../utils/formValidator';
import { registerUser, authorizeUser } from '../../../api/MainApi';
import handleError from '../../../utils/handleError';
import { setLoggedIn } from '../../../store/features/loggedSlice';
import { setIsLoading } from '../../../store/features/loadingSlice';
import { setCurrentUser } from '../../../store/features/userSlice';
import { setErrorText } from '../../../store/features/errorSlice';
import {
  NAME_RULE,
  EMAIL_RULE,
} from '../../../constans';

export default function Register() {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm, isRegEx } = useFormWithValidation();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loading.isLoading);

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(setIsLoading(true));
    dispatch(setErrorText(''));

    registerUser({
      name: values['name'],
      email: values['email'],
      password: values['password'],
    })
      .then((res) => {
        if (res.email) {
          dispatch(setCurrentUser({ name: res.name, email: res.email }));
          localStorage.setItem('name', res.name);
          localStorage.setItem('email', res.email);
        } else {
          return Promise.reject(res.status);
        }
      })
      .then(() => {
        authorizeUser({
          email: values['email'],
          password: values['password'],
        })
          .then((res) => {
            if (res.token) {
              localStorage.setItem('token', res.token);
              dispatch(setLoggedIn(true));
              navigate('/movies', { replace: true });
              resetForm();
            } else {
              return Promise.reject(res.status);
            }
          })
      })
      .catch((err) => {
        const page = 'register';
        dispatch(setErrorText(handleError(err, page)));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }

  return (
    <main className="auth">
      <section className="auth__container">
        <Link className="auth__link" to="/"><div className="auth__logo" /></Link>
        <h1 className="auth__title">Добро пожаловать!</h1>
        <Form
          name={"register"}
          buttonText={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          onSubmit={handleSubmit}
          isDisabledButton={!isValid}
        >
          <label className="form__label" htmlFor="input-name">Имя</label>
          <input
            id="input-name"
            className={`form__input ${errors['name'] && 'form__input_type_error'}`}
            name="name"
            type="text"
            placeholder="Ваше имя"
            required
            minLength="2"
            maxLength="45"
            value={values['name'] || ''}
            onChange={handleChange}
            autoComplete="off"
            pattern="[a-zA-Zа-яёА-ЯЁ\-\s]+"
          />
          <span className="form__input-error">
            {errors['name'] && !isRegEx['name'] && values['name'] ? NAME_RULE : errors['name']}
          </span>
          <label className="form__label" htmlFor="input-email">E-mail</label>
          <input
            id="input-email"
            className={`form__input ${errors['email'] && 'form__input_type_error'}`}
            name="email"
            type="email"
            placeholder="Ваша почта"
            required
            value={values['email'] || ''}
            onChange={handleChange}
            autoComplete="off"
            pattern=".+@.+\.[a-z]{2,}"
          />
          <span className="form__input-error">
            {errors['email'] && !isRegEx['email'] && values['email'] ? EMAIL_RULE : errors['email']}
          </span>
          <label className="form__label" htmlFor="input-password">Пароль</label>
          <input
            id="input-password"
            className={`form__input ${errors['password'] && 'form__input_type_error'}`}
            name="password"
            type="password"
            placeholder="Пароль"
            required
            minLength="4"
            value={values['password'] || ''}
            onChange={handleChange}
            autoComplete="off"
          />
          <span className="form__input-error">{errors['password']}</span>
        </Form>
      </section>
    </main>
  )
}

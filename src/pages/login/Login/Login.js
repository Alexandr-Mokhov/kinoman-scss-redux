import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormWithValidation } from '../../../utils/formValidator';
import Form from '../../../components/Form/Form';
import { authorizeUser } from '../../../api/MainApi';
import handleError from '../../../utils/handleError';
import { EMAIL_RULE } from '../../../constans';
import { setLoggedIn } from '../../../store/features/loggedSlice';
import { setIsLoading } from '../../../store/features/loadingSlice';
import { setErrorText } from '../../../store/features/errorSlice';

export default function Login() {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm, isRegEx } = useFormWithValidation();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loading.isLoading);

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(setIsLoading(true));
    dispatch(setErrorText(''));

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
      .catch((err) => {
        const page = 'login';
        dispatch(setLoggedIn(false));
        dispatch(setErrorText(handleError(err, page)));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      })
  }

  return (
    <main className="auth">
      <section className="auth__container">
        <Link className="auth__link" to="/"><div className="auth__logo" /></Link>
        <h1 className="auth__title">Рады видеть!</h1>
        <Form
          name={"login"}
          buttonText={isLoading ? 'Вход...' : 'Войти'}
          onSubmit={handleSubmit}
          isDisabledButton={!isValid}
        >
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

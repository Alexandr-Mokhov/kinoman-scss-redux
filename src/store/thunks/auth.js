import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
	'auth/login',
	async (data, { rejectWithValue }) => {
		const user = () => {
			return fetch(`https://api.diploma.mokhov.nomoredomains.rocks/signin`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: data.email, password: data.password }),
			})
				.then(res => {
					if (res.ok) {
						return res.json();
					} else {
						return Promise.reject(res.status);
					};
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
	}
)


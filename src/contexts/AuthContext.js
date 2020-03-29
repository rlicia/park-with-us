import AsyncStorage from '@react-native-community/async-storage';

import createDataContext from './createDataContext';
import router from '../api/router';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signin':
            return { ...state, token: action.payload, loading: '' };
        case 'signout':
            return { token: null, account: {}, errorMessage: '', loading: '' };
        case 'fetch_account':
            return { ...state, account: action.payload, loading: '' };
        case 'add_error':
            return { ...state, errorMessage: action.payload, loading: '' };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'loading':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

//clear error message
const clearErrorMessage = dispatch => async () => {
    dispatch({ type: 'clear_error_message' });
};

//try local login
const tryLocalSignin = dispatch => async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            dispatch({ type: 'loading', payload: 'Connecting to Server...' });
            dispatch({ type: 'signin', payload: token });
            dispatch({ type: 'loading', payload: 'Syncing...' });
            const account = await router.get('/account');
            dispatch({ type: 'fetch_account', payload: account.data.account });
            if (account.data.account.status === 1) {
                navigate('Client');
            }
            if (account.data.account.status === 0) {
                navigate('User');
            }
        } else {
            navigate('LoginHome');
        }
    } catch (err) {
        await AsyncStorage.removeItem('token');
        navigate('LoginHome');
        dispatch({ type: 'signout' });
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//signup
const signup = dispatch => async ({ username, password, confirmPassword, firstName, lastName, email, gender }) => {
    if (!username || !password || !confirmPassword || !firstName || !lastName || !email || !(gender || gender === 0)) {
        return dispatch({ type: 'add_error', payload: 'Must provide all fields' });
    }
    if (password !== confirmPassword) {
        return dispatch({ type: 'add_error', payload: 'Password Mismatch' });
    }
    if (password.length < 8) {
        return dispatch({ type: 'add_error', payload: 'Password must be at least 8 characters' });
    }

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email) || email !== email.toLowerCase()) {
        return dispatch({ type: 'add_error', payload: 'Invalid Email' });
    }

    try {
        dispatch({ type: 'loading', payload: 'Connecting to Server...' });
        const response = await router.post('/signup', { username, password, firstName, lastName, email, gender });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        dispatch({ type: 'loading', payload: 'Syncing...' });
        const account = await router.get('/account');
        dispatch({ type: 'fetch_account', payload: account.data.account });
        if (account.data.account.status === 1) {
            navigate('Client');
        }
        if (account.data.account.status === 0) {
            navigate('User');
        }
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//signin
const signin = dispatch => async ({ username, password }) => {
    if (!username || !password) {
        return dispatch({ type: 'add_error', payload: 'Must provide username and password' });
    }

    try {
        dispatch({ type: 'loading', payload: 'Connecting to Server...' });
        const response = await router.post('/signin', { username, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        dispatch({ type: 'loading', payload: 'Syncing...' });
        const account = await router.get('/account');
        dispatch({ type: 'fetch_account', payload: account.data.account });
        if (account.data.account.status === 1) {
            navigate('Client');
        }
        if (account.data.account.status === 0) {
            navigate('User');
        }
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//signout
const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('LoginHome');
};

//edit profile
const editAccount = dispatch => async ({ firstName, lastName, email }) => {
    if (!firstName || !lastName || !email) {
        return dispatch({ type: 'add_error', payload: 'Must provide all fields' });
    }

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email) || email !== email.toLowerCase()) {
        return dispatch({ type: 'add_error', payload: 'Invalid Email' });
    }

    try {
        dispatch({ type: 'loading', payload: 'Saving...' });
        await router.put('/account', { firstName, lastName, email });
        const account = await router.get('/account');
        dispatch({ type: 'fetch_account', payload: account.data.account });
        navigate('Setting');
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//change password
const changePassword = dispatch => async ({ password, newPassword, confirmNewPassword }) => {
    if (!password || !newPassword || !confirmNewPassword) {
        return dispatch({ type: 'add_error', payload: 'Must provide all fields' });
    }
    if (newPassword !== confirmNewPassword) {
        return dispatch({ type: 'add_error', payload: 'Password Mismatch' });
    }
    if (newPassword.length < 8) {
        return dispatch({ type: 'add_error', payload: 'Password must be at least 8 characters' });
    }
    if (password === newPassword) {
        return dispatch({ type: 'add_error', payload: 'Current and new password are same' });
    }

    try {
        dispatch({ type: 'loading', payload: 'Saving...' });
        await router.put('/account/password', { password, newPassword });
        const account = await router.get('/account');
        dispatch({ type: 'fetch_account', payload: account.data.account });
        navigate('Setting');
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//refresh
const refreshing = dispatch => async () => {
    try {
        dispatch({ type: 'loading', payload: 'Refreshing...' });
        const response = await router.get('/account');
        dispatch({ type: 'fetch_account', payload: response.data.account });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

export const { Context, Provider } = createDataContext(
    authReducer,
    {
       signup,
       signin,
       signout,
       tryLocalSignin,
       editAccount,
       changePassword,
       clearErrorMessage,
       refreshing
    },
    { token: null, account: {}, errorMessage: '', loading: '' }
);
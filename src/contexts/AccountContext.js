import createDataContext from './createDataContext';
import router from '../api/router';

import { navigate } from '../navigationRef';

const accountReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_users':
            return { ...state, account: action.payload, loading: '' };
        case 'refresh_users':
            return { ...state, account: action.payload, refreshing: false };
        case 'fetch_user_detail':
            return { ...state, accountDetail: action.payload, loading: '' };
        case 'refresh_user_detail':
            return { ...state, accountDetail: action.payload, refreshing: false };
        case 'clear_account_data':
            return { ...state, account: [] };
        case 'clear_account_detail_data':
            return { ...state, accountDetail: {} };
        case 'add_error':
            return { ...state, errorMessage: action.payload, loading: '', refreshing: false };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'loading':
            return { ...state, loading: action.payload };
        case 'refresh':
            return { ...state, refreshing: true };
        default:
            return state;
    }
};

//Clear error message
const clearErrorMessage = dispatch => async () => {
    dispatch({ type: 'clear_error_message' });
};

//Clear Account Data
const clearAccountData = dispatch => async () => {
    dispatch({ type: 'clear_account_data' });
};

//Clear Account Detail Data
const clearAccountDetailData = dispatch => async () => {
    dispatch({ type: 'clear_account_detail_data' });
};

//Create User Account
const createUserAccount = dispatch => async ({ username, password, confirmPassword, firstName, lastName, email, tierId, gender }) => {
    if (!username || !password || !confirmPassword || !firstName || !lastName || !email || !tierId || !(gender || gender === 0)) {
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
        dispatch({ type: 'loading', payload: 'Creating...' });
        const response = await router.post('/user/createuser', { username, password, firstName, lastName, email, tierId, gender });
        dispatch({ type: 'loading', payload: '' });
        navigate('UserCreated', { user: response.data });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Fetch Accounts
const fetchAccounts = dispatch => async ({ username, status }) => {
    try {
        dispatch({ type: 'loading', payload: 'Loading...' });
        const response = await router.get(`/user/account/search/${status}/${username}`);
        dispatch({ type: 'fetch_users', payload: response.data.user });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Refresh Accounts
const refreshAccounts = dispatch => async ({ username, status }) => {
    try {
        dispatch({ type: 'refresh' });
        const response = await router.get(`/user/account/search/${status}/${username}`);
        dispatch({ type: 'refresh_users', payload: response.data.user });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Fetch Account Detail
const fetchAccountDetail = dispatch => async ({ id, status }) => {
    try {
        const response = await router.get(`/user/account/detail/${status}/${id}`);
        dispatch({ type: 'fetch_user_detail', payload: response.data.detail });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Fetch Account Detail
const refreshAccountDetail = dispatch => async ({ id, status }) => {
    try {
        dispatch({ type: 'refresh' });
        const response = await router.get(`/user/account/detail/${status}/${id}`);
        dispatch({ type: 'refresh_user_detail', payload: response.data.detail });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Update Account Tier
const updateAccountTier = dispatch => async ({ id, newTierId, status }) => {
    if (!newTierId) {
        return dispatch({ type: 'add_error', payload: 'Must provide new tier' });
    }
    try {
        dispatch({ type: 'loading', payload: 'Saving...' });
        await router.put(`/user/account/detail/tier/${status}/${id}`, { newTierId });
        dispatch({ type: 'loading', payload: '' });
        navigate('AccountDetail');
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Update Account Rfid Tag
const updateAccountRfidTag = dispatch => async ({ id, rfidTag, newRfidTag }) => {
    if (!newRfidTag) {
        return dispatch({ type: 'add_error', payload: 'Must provide new RFID tag' });
    }
    if (rfidTag === newRfidTag) {
        return dispatch({ type: 'add_error', payload: 'Current and new RFID tag are same' });
    }

    try {
        dispatch({ type: 'loading', payload: 'Saving...' });
        await router.put(`/user/account/detail/rfid/${id}`, { newRfidTag });
        dispatch({ type: 'loading', payload: '' });
        navigate('AccountDetail');
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Update Account Status [Activate, Deactivate]
const updateAccountStatus = dispatch => async ({ id, status }) => {
    try {
        dispatch({ type: 'loading', payload: 'Updating...' });
        const response = await router.put(`/user/account/detail/${status}/${id}/rfid/status`);
        dispatch({ type: 'fetch_user_detail', payload: response.data.detail });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

export const { Context, Provider } = createDataContext(
    accountReducer,
    {
        createUserAccount,
        fetchAccounts,
        refreshAccounts,
        fetchAccountDetail,
        refreshAccountDetail,
        updateAccountTier,
        updateAccountRfidTag,
        updateAccountStatus,
        clearErrorMessage,
        clearAccountData,
        clearAccountDetailData
    },
    { account: [], accountDetail: {}, errorMessage: '', loading: '', refreshing: false }
);
import createDataContext from './createDataContext';
import router from '../api/router';

import { navigate } from '../navigationRef';

const tierReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_tiers':
            return { ...state, tier: action.payload, loading: '' };
        case 'refresh_tiers':
            return { ...state, tier: action.payload, refreshing: false };
        case 'add_permissions':
            return { ...state, permissions: action.payload };
        case 'clear_tier_data':
            return { ...state, tier: [] };
        case 'clear_permissions':
            return { ...state, permissions: [] };
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

//Clear Tier Data
const clearTierData = dispatch => async () => {
    dispatch({ type: 'clear_tier_data' });
};

//Clear Permissions
const clearPermissions = dispatch => async () => {
    dispatch({ type: 'clear_permissions' });
};

//Fetch Tier
const fetchTiers = dispatch => async ({ status }) => {
    try {
        const response = await router.get(`/user/tier/${status}`);
        dispatch({ type: 'fetch_tiers', payload: response.data.tier });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Refresh Tier
const refreshTiers = dispatch => async ({ status }) => {
    try {
        dispatch({ type: 'refresh' });
        const response = await router.get(`/user/tier/${status}`);
        dispatch({ type: 'refresh_tiers', payload: response.data.tier });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Create Tier
const createTier = dispatch => async ({ tierName, order, orderTierLevel, permissions, status }) => {
    if (!tierName) {
        return dispatch({ type: 'add_error', payload: 'Must provide tier name' });
    }

    if (status === 0 && !permissions) {
        return dispatch({ type: 'add_error', payload: 'Must provide permissions' });
    }

    try {
        dispatch({ type: 'loading', payload: 'Creating...' });
        await router.post(`/user/tier/${status}`, { tierName, order, orderTierLevel, permissions });
        dispatch({ type: 'loading', payload: '' });
        navigate('TierList');
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Edit Tier
const editTier = dispatch => async ({ id, tierName, order, orderTierLevel, permissions, status }) => {
    if (!tierName) {
        return dispatch({ type: 'add_error', payload: 'Must provide tier name' });
    }

    if (!order && order !== 0 && orderTierLevel) {
        return dispatch({ type: 'add_error', payload: 'Must provide after or before' });
    }

    try {
        dispatch({ type: 'loading', payload: 'Saving...' });
        await router.put(`/user/tier/${status}/${id}`, { tierName, order, orderTierLevel, permissions });
        dispatch({ type: 'loading', payload: '' });
        navigate('TierList');
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Delete Tier
const deleteTier = dispatch => async ({ id, status }) => {
    try {
        dispatch({ type: 'loading', payload: 'Deleting...' });
        await router.delete(`/user/tier/${status}/${id}`);
        dispatch({ type: 'loading', payload: '' });
        navigate('TierList');
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const selectPermissions = dispatch => async (value) => {
    dispatch({ type: 'add_permissions', payload: value });
};

//get permissions
const fetchPermissions = dispatch => async ({ id }) => {
    try {
        dispatch({ type: 'loading', payload: 'Loading...' });
        const response = await router.get(`/user/tier/permissions/${id}`);
        dispatch({ type: 'add_permissions', payload: response.data.permissions });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

export const { Context, Provider } = createDataContext(
    tierReducer,
    {
        fetchTiers,
        refreshTiers,
        createTier,
        editTier,
        deleteTier,
        selectPermissions,
        fetchPermissions,
        clearTierData,
        clearPermissions,
        clearErrorMessage
    },
    { tier: [], permissions: [], errorMessage: '', loading: '', refreshing: false } //tier = array
);



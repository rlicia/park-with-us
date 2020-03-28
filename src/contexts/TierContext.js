import createDataContext from './createDataContext';
import router from '../api/router';

import { navigate } from '../navigationRef';

const tierReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_tiers':
            return { ...state, tier: action.payload, loading: '' };
        case 'clear_tier_data':
            return { ...state, tier: [] };
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

//Clear error message
const clearErrorMessage = dispatch => async () => {
    dispatch({ type: 'clear_error_message' });
};

//Clear Tier Data
const clearTierData = dispatch => async () => {
    dispatch({ type: 'clear_tier_data' });
};

//Fetch Tier
const fetchTiers = dispatch => async ({ status, loading }) => {
    try {
        dispatch({ type: 'loading', payload: 'Loading...' });
        const response = await router.get(`/user/tier/${status}`);
        dispatch({ type: 'fetch_tiers', payload: response.data.tier });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Create Tier
const createTier = dispatch => async ({ tierName, status }) => {
    if (!tierName) {
        return dispatch({ type: 'add_error', payload: 'Must provide tier name' });
    }

    try {
        dispatch({ type: 'loading', payload: 'Creating...' });
        await router.post(`/user/tier/${status}`, { tierName, status });
        dispatch({ type: 'loading', payload: '' });
        navigate('TierList');
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Edit Tier
const editTier = dispatch => async ({ id, tierName, order, orderTierLevel, status }) => {
    if (!tierName) {
        return dispatch({ type: 'add_error', payload: 'Must provide tier name' });
    }

    if (!order && order !== 0 && orderTierLevel) {
        return dispatch({ type: 'add_error', payload: 'Must provide after or before' });
    }

    try {
        dispatch({ type: 'loading', payload: 'Saving...' });
        await router.put(`/user/tier/${status}/${id}`, { tierName, order, orderTierLevel });
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

export const { Context, Provider } = createDataContext(
    tierReducer,
    {
        fetchTiers,
        createTier,
        editTier,
        deleteTier,
        clearTierData,
        clearErrorMessage
    },
    { tier: [], errorMessage: '', loading: '' } //tier = array
);


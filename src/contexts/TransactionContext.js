import createDataContext from './createDataContext';
import router from '../api/router';

import { navigate } from '../navigationRef';

const getDistance = (longitude, latitude, location) => {
    const toRad = (x) => {
        return x * Math.PI / 180;
    }
    
    var lon1 = longitude;
    var lat1 = latitude;
    
    //our location
    var lon2 = location[0];
    var lat2 = location[1];
    
    var R = 6371; // km
    
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    console.log(d);
    var range;
    if (d > 5) {
        range = d-5;
    } else {
        range = false
    }
    return range;
};

const transactionReducer = (state, action) => {
    switch (action.type) {
        case 'add_license':
            return { ...state, license: action.payload, loading: '' };
        case 'fetch_zones':
            return { ...state, zoneList: action.payload, loading: '' };
        case 'fetch_slots':
            return { ...state, slotsName: action.payload.slotsName, slotsStatus: action.payload.slotsStatus, loading: '' };
        case 'fetch_histories':
            return { ...state, histories: action.payload, loading: '' };
        case 'fetch_historyDetails':
            return { ...state, historyDetails: action.payload, loading: '' };
        case 'select_slot':
            return { ...state, selectedSlot: action.payload, loading: '' };
        case 'load_transaction':
            return { ...state, transaction: action.payload, loading: '' };
        case 'add_range':
            return { ...state, range: action.payload, loading: '' };
        case 'clear_zones':
            return { ...state, zoneList: [] };
        case 'clear_slots':
            return { ...state, slotsName: [], slotsStatus: [] };
        case 'clear_selected_slot':
            return { ...state, selectedSlot: '' };
        case 'clear_transaction':
            return { ...state, transaction: {} };
        case 'clear_histories':
            return { ...state, histories: [] };
        case 'clear_historyDetails':
            return { ...state, historyDetails: [] };
        case 'clear_range':
            return { ...state, range: null };
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

//Clear Zone List
const clearZoneList = dispatch => async () => {
    dispatch({ type: 'clear_zones' });
};

//Clear Slot List
const clearSlotList = dispatch => async () => {
    dispatch({ type: 'clear_slots' });
};

//Clear Selected Slot
const clearSelectedSlot = dispatch => async () => {
    dispatch({ type: 'clear_selected_slot' });
};

//Clear Transaction
const clearTransaction = dispatch => async () => {
    dispatch({ type: 'clear_transaction' });
};

//Clear Histories
const clearHistories = dispatch => async () => {
    dispatch({ type: 'clear_histories' });
};
//Clear History Details
const clearHistoryDetails = dispatch => async () => {
    dispatch({ type: 'clear_historyDetails' });
};

//Clear Range
const clearRange = dispatch => async () => {
    dispatch({ type: 'clear_range' });
};

//Set License
const setLicense = dispatch => async ({ licenseTitle, licenseNumber, latitude, longitude }) => {
    if (!licenseTitle || !licenseNumber) {
        return dispatch({ type: 'add_error', payload: 'Invalid License' });
    }

    let reg = /^\d+$/;
    for(i=1; i<licenseTitle.length; i++) {
        if (reg.test(licenseTitle.charAt(i))) {
            return dispatch({ type: 'add_error', payload: 'Invalid License' });
        }
    }
    if (licenseTitle.length === 1 && reg.test(licenseTitle)) {
        return dispatch({ type: 'add_error', payload: 'Invalid License' });
    }
    if (licenseTitle.length === 3 && !reg.test(licenseTitle.charAt(0))) {
        return dispatch({ type: 'add_error', payload: 'Invalid License' });
    }
    if (!reg.test(licenseNumber)) {
        return dispatch({ type: 'add_error', payload: 'Invalid License' });
    }

    const license = licenseTitle.toUpperCase() + ' ' + licenseNumber;
    
    try {
        const loc = await router.get('/location');
        const location = loc.data;
        console.log(loc.data);
        const range = getDistance(longitude, latitude, location);
        if (range) {
            return dispatch({ type: 'add_range', payload: range });
        }

        dispatch({ type: 'loading', payload: 'Loading...' });
        const response = await router.post('/transaction/license', { license });
        dispatch({ type: 'add_license', payload: response.data });
        navigate('Zone');
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//fetch Zones
const fetchZones = dispatch => async () => {
    try {
        dispatch({ type: 'loading', payload: 'Loading...' });
        const response = await router.get('/transaction/zone');
        dispatch({ type: 'fetch_zones', payload: response.data.tier });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const selectSlot = dispatch => async ({ name }) => {
    dispatch({ type: 'select_slot', payload: name });
};

const fetchSlots = dispatch => async ({ zone }) => {
    try {
        dispatch({ type: 'loading', payload: 'Loading...' });
        const response = await router.get(`/transaction/${zone}/slot`);
        dispatch({ type: 'fetch_slots', payload: { slotsName: response.data.name, slotsStatus: response.data.status } }); 
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const saveTransaction = dispatch => async ({ slot, license, zone, latitude, longitude }) => {
    if (!slot) {
        return dispatch({ type: 'add_error', payload: 'Please Select Slot' });
    }

    try {
        const loc = await router.get('/location');
        const location = loc.data;
        const range = getDistance(longitude, latitude, location);
        if (range) {
            return dispatch({ type: 'add_range', payload: range });
        }

        dispatch({ type: 'loading', payload: 'Checking...' });
        await router.post('/transaction/reservation', { slot, license, zone });
        dispatch({ type: 'loading', payload: '' });
        navigate('Transaction');
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const loadTransaction = dispatch => async () => {
    try {
        dispatch({ type: 'loading', payload: 'Loading...' });
        const response = await router.get('/transaction/load');
        dispatch({ type: 'load_transaction', payload: response.data });
        if (!response.data) {
            navigate('License');
        }
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const initialLoadTransaction = dispatch => async () => {
    try {
        dispatch({ type: 'loading', payload: 'Loading...' });
        const response = await router.get('/transaction/load');
        dispatch({ type: 'loading', payload: '' });
        if (response.data) {
            navigate('Transaction');
        }
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const cancelBooking = dispatch => async () => {
    try {
        dispatch({ type: 'loading', payload: 'Loading...' });
        const response = await router.delete('/transaction/cancel');
        const update = response.data.update;
        if (update === 1) {
            dispatch({ type: 'loading', payload: '' });
            navigate('License');
        } else if (update === 2) {
            const response = await router.get('/transaction/load');
            dispatch({ type: 'load_transaction', payload: response.data });
        }
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const fetchHistories = dispatch => async () => {
    try {
        dispatch({ type: 'loading', payload: 'Loading...' });
        response = await router.get('/transaction/history');
        dispatch({ type: 'fetch_histories', payload: response.data });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const fetchHistoryDetails = dispatch => async ({ createdDate }) => {
    try {
        dispatch({ type: 'loading', payload: 'Loading...' });
        response = await router.post('/transaction/history/detail', { createdDate });
        dispatch({ type: 'fetch_historyDetails', payload: response.data });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

export const { Context, Provider } = createDataContext(
    transactionReducer,
    {
        setLicense,
        fetchZones,
        fetchSlots,
        fetchHistories,
        fetchHistoryDetails,
        selectSlot,
        saveTransaction,
        loadTransaction,
        initialLoadTransaction,
        cancelBooking,
        clearErrorMessage,
        clearZoneList,
        clearSlotList,
        clearSelectedSlot,
        clearTransaction,
        clearHistories,
        clearHistoryDetails,
        clearRange
    },
    { license: null, zoneList: [], slotsName: [], slotsStatus: [], selectedSlot: '', transaction: {}, histories: [], historyDetails: [], range: null ,errorMessage: '', loading: '' }
);
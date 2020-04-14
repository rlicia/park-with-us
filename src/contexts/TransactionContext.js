import createDataContext from './createDataContext';
import router from '../api/router';

import { navigate } from '../navigationRef';

const getDistance = (longitude, latitude, location, within) => {
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
    if (d > within) {
        range = d-within;
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
        case 'refresh_zones':
            return { ...state, zoneList: action.payload, refreshing: false };
        case 'fetch_slots':
            return { ...state, slotsName: action.payload.slotsName, slotsStatus: action.payload.slotsStatus, loading: '' };
        case 'refresh_slots':
            return { ...state, slotsName: action.payload.slotsName, slotsStatus: action.payload.slotsStatus, refreshing: false };
        case 'fetch_histories':
            return { ...state, histories: action.payload, loading: '' };
        case 'refresh_histories':
            return { ...state, histories: action.payload, refreshing: false };
        case 'fetch_historyDetails':
            return { ...state, historyDetails: action.payload, loading: '' };
        case 'refresh_historyDetails':
            return { ...state, historyDetails: action.payload, refreshing: false };
        case 'select_slot':
            return { ...state, selectedSlot: action.payload };
        case 'load_transaction':
            return { ...state, transaction: action.payload, loading: '' };
        case 'refresh_transaction':
            return { ...state, transaction: action.payload, refreshing: false };
        case 'add_range':
            return { ...state, range: action.payload };
        case 'clear_license':
            return { ...state, license: null };
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
        case 'clear_all':
            return { license: null, zoneList: [], slotsName: [], slotsStatus: [], selectedSlot: '', transaction: {}, histories: [], historyDetails: [], range: null ,errorMessage: '', loading: '', refreshing: false }
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

//Clear Transaction
const clearAll = dispatch => async () => {
    dispatch({ type: 'clear_all' });
};

//Clear License
const clearLicense = dispatch => async () => {
    dispatch({ type: 'clear_license' });
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
        const location = loc.data.location;
        const within = loc.data.within;
        console.log(location, within)
        const range = getDistance(longitude, latitude, location, within);
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
        const response = await router.get('/transaction/zone');
        dispatch({ type: 'fetch_zones', payload: response.data.tier });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//refresh Zones
const refreshZones = dispatch => async () => {
    try {
        dispatch({ type: 'refresh' });
        const response = await router.get('/transaction/zone');
        dispatch({ type: 'refresh_zones', payload: response.data.tier });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const selectSlot = dispatch => async ({ name }) => {
    dispatch({ type: 'select_slot', payload: name });
};


//fetch slots
const fetchSlots = dispatch => async ({ zone }) => {
    try {
        const response = await router.get(`/transaction/${zone}/slot`);
        dispatch({ type: 'fetch_slots', payload: { slotsName: response.data.name, slotsStatus: response.data.status } }); 
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//refresh slots
const refreshSlots = dispatch => async ({ zone }) => {
    try {
        dispatch({ type: 'refresh' });
        const response = await router.get(`/transaction/${zone}/slot`);
        dispatch({ type: 'refresh_slots', payload: { slotsName: response.data.name, slotsStatus: response.data.status } }); 
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
        const location = loc.data.location;
        const within = loc.data.within;
        const range = getDistance(longitude, latitude, location, within);
        if (range) {
            return dispatch({ type: 'add_range', payload: range });
        }

        dispatch({ type: 'loading', payload: 'Booking...' });
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

const refreshTransaction = dispatch => async () => {
    try {
        dispatch({ type: 'refresh' });
        const response = await router.get('/transaction/load');
        dispatch({ type: 'refresh_transaction', payload: response.data });
        if (!response.data) {
            navigate('License');
        }
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const initialRefreshTransaction = dispatch => async () => {
    try {
        const response = await router.get('/transaction/load');
        if (response.data) {
            navigate('Transaction');
        }
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const cancelBooking = dispatch => async () => {
    try {
        dispatch({ type: 'loading', payload: 'Canceling...' });
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
        response = await router.get('/transaction/history');
        dispatch({ type: 'fetch_histories', payload: response.data });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const refreshHistories = dispatch => async () => {
    try {
        dispatch({ type: 'refresh' });
        response = await router.get('/transaction/history');
        dispatch({ type: 'refresh_histories', payload: response.data });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const fetchHistoryDetails = dispatch => async ({ createdDate }) => {
    try {
        response = await router.post('/transaction/history/detail', { createdDate });
        dispatch({ type: 'fetch_historyDetails', payload: response.data });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const refreshHistoryDetails = dispatch => async ({ createdDate }) => {
    try {
        dispatch({ type: 'refresh' });
        response = await router.post('/transaction/history/detail', { createdDate });
        dispatch({ type: 'refresh_historyDetails', payload: response.data });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

export const { Context, Provider } = createDataContext(
    transactionReducer,
    {
        setLicense,
        fetchZones,
        refreshZones,
        fetchSlots,
        refreshSlots,
        fetchHistories,
        refreshHistories,
        fetchHistoryDetails,
        refreshHistoryDetails,
        selectSlot,
        saveTransaction,
        loadTransaction,
        refreshTransaction,
        initialRefreshTransaction,
        cancelBooking,
        clearErrorMessage,
        clearLicense,
        clearZoneList,
        clearSlotList,
        clearSelectedSlot,
        clearTransaction,
        clearHistories,
        clearHistoryDetails,
        clearRange,
        clearAll
    },
    { license: null, zoneList: [], slotsName: [], slotsStatus: [], selectedSlot: '', transaction: {}, histories: [], historyDetails: [], range: null ,errorMessage: '', loading: '', refreshing: false }
);
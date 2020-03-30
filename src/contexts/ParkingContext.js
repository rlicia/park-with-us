import createDataContext from './createDataContext';
import router from '../api/router';

import { navigate } from '../navigationRef';

const parkingReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_slots':
            return { ...state, slot: action.payload.slot, slotCount: action.payload.slotCount };
        case 'refresh_slots':
            return { ...state, slot: action.payload.slot, slotCount: action.payload.slotCount, refreshing: false };
        case 'count_slot':
            return { ...state, slotCount: action.payload };
        case 'update_details':
            return { ...state, updateDetails: action.payload, loading: '' };
        case 'clear_slot_data':
            return { ...state, slot: [], slotCount: [] };
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

//Clear Error Message
const clearErrorMessage = dispatch => async () => {
    dispatch({ type: 'clear_error_message' });
};

//Clear Slot Data
const clearSlotData = dispatch => async () => {
    dispatch({ type: 'clear_slot_data' });
};

//Get Slot
const fetchSlots = dispatch => async () => {
    try {
        const response = await router.get('/user/slot');
        dispatch({ type: 'fetch_slots', payload: { slot: response.data.zone, slotCount: response.data.slot } });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

//Refresh Slot
const refreshSlots = dispatch => async () => {
    try {
        dispatch({ type: 'refresh' });
        const response = await router.get('/user/slot');
        dispatch({ type: 'refresh_slots', payload: { slot: response.data.zone, slotCount: response.data.slot } });
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

const editCountInput = dispatch => async ({ text, count, index }) => {
    if (!text) {
        text = "0";
    }
    if (text.charAt(0) === "0" && text.length > 1) {
        text = text.substring(1);
    }

    let reg = /^\d+$/;
    for(i=0; i<text.length; i++) {
        if (!reg.test(text.charAt(i))) {
            return text = text.substring(0,i);
        }
    }

    count[index] = text;
    dispatch({ type: 'count_slot', payload: count });
};

const increaseOrDecrease = dispatch => async ({ count, index, direction }) => {
    if (count[index] === "0" && direction === -1) {
        direction = 0;
    }

    let addCount = Number(count[index]) + direction;
    count[index] = addCount.toString();
    dispatch({ type: 'count_slot', payload: count });
};

const updateSlots = dispatch => async ({ count }) => {
    let slotUpdated = [];
    for(i=0; i<count.length; i++) {
        slotUpdated[i] = Number(count[i]);
    };
    try {
        dispatch({ type: 'loading', payload: 'Saving...' });
        const response = await router.post('/user/updateSlots', { slotUpdated });
        dispatch({ type: 'update_details', payload: response.data.updateDetails });
        navigate('SlotUpdated');
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data.error });
    }
};

export const { Context, Provider } = createDataContext(
    parkingReducer,
    {
        fetchSlots,
        refreshSlots,
        editCountInput,
        increaseOrDecrease,
        updateSlots,
        clearSlotData,
        clearErrorMessage
    },
    { slot: [], slotCount: [], updateDetails: {}, errorMessage: '', loading: '', refreshing: false }
);


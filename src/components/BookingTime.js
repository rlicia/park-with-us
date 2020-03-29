import React, { useContext } from 'react';
import { View, Text, StyleSheet, Keyboard, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import { Context as TransactionContext } from '../contexts/TransactionContext';

import Loader from './Loader';

const BookingTime = ({ expiredTime }) => {
    const { state, cancelBooking } = useContext(TransactionContext);

    return (
        <View>
            <Loader
                title={state.loading}
                loading={state.loading ? true : false}
            />
            <View style={styles.detailContainer}>
                <Text style={styles.detailTitle}>Please arrives before:</Text>
                <Text style={styles.expiredTime}>{expiredTime}</Text>
            </View>
            {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
            <Button
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}
                containerStyle={styles.buttonContainer}
                title='Cancel Booking'
                onPress={() => {
                    Keyboard.dismiss();
                    Alert.alert('Are you sure?', null, [{ text: 'Confirm', onPress: () => cancelBooking() }, { text: 'Cancel' }]);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    detailContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#D4D4D4'
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 5
    },
    expiredTime: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center'
    },
    errorMessage: {
        paddingTop: 5,
        marginHorizontal: 20,
        fontSize: 16,
        color: 'red'
    },
    buttonContainer: {
        marginHorizontal: 50,
        marginTop: 20,
        marginBottom: 30
    },
    button: {
        height: 50,
        backgroundColor: 'red',
        borderRadius: 25
    },
    buttonTitle: {
        fontWeight: 'bold'
    }
});

export default BookingTime;
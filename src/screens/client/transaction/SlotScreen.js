import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import { NavigationEvents } from '@react-navigation/compat';
import { Button } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';

import { Context as AuthContext } from '../../../contexts/AuthContext';
import { Context as TransactionContext } from '../../../contexts/TransactionContext';

import Header from '../../../components/Header';
import ParkingMap from '../../../components/ParkingMap';

const SlotScreen = ({ route }) => {
    const [err, setErr] = useState(null);
    const { state: authState, refreshing } = useContext(AuthContext);
    const { state: transactionState, initialLoadTransaction, fetchSlots, saveTransaction, clearSlotList, clearSelectedSlot, clearRange, clearErrorMessage } = useContext(TransactionContext);
    const zone = route.params.zone;

    return (
        <Header
            title='Select Slot'
            backButton='Zone'
            transactionScreen={true}
        >
            <NavigationEvents
                onWillFocus={() => fetchSlots({ zone: zone._id })}
                onWillBlur={() => {
                    clearErrorMessage();
                    clearSelectedSlot();
                    clearSlotList();
                }}
            />
            <View style={styles.topContainer}>
                <View style={styles.licenseContainer}>
                    <Text style={styles.licenseTitle}>License:</Text>
                    <Text style={styles.license}>{transactionState.license}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.detailTitle}>Tier:</Text>
                    <Text style={styles.detail}>{authState.account.tier}</Text>
                </View>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={transactionState.loading ? true : false}
                        onRefresh={() => {
                            fetchSlots({ zone: zone._id });
                            refreshing();
                            initialLoadTransaction();
                    }} />
                }
            >
                <View style={styles.parkingMapContainer}>
                    <ParkingMap />
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.zoneContainer}>
                        <Text style={styles.zoneTitle}>Zone:</Text>
                        <Text style={styles.zoneName}>{zone.tierName}</Text>
                    </View>
                    <View style={styles.slotContainer}>
                        <Text style={styles.slotTitle}>Slot:</Text>
                        <Text style={styles.slotName}>{transactionState.selectedSlot}</Text>
                    </View>
                </View>
                {transactionState.errorMessage ? <Text style={styles.errorMessage}>{transactionState.errorMessage}</Text> : null}
                <Button
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    title='Book Slot'
                    onPress={() => {
                        Keyboard.dismiss();
                        Alert.alert(`Booking Slot: ${transactionState.selectedSlot}`, null,
                        [
                            { text: 'Confirm', onPress: () => {
                                Geolocation.getCurrentPosition(position => {
                                    saveTransaction({ slot: transactionState.selectedSlot, license: transactionState.license, zone: zone._id, latitude: position.coords.latitude, longitude: position.coords.longitude });
                                },
                                error => {
                                    setErr(error);
                                });
                                if (err) {
                                    Alert.alert('Please enable location services');
                                }
                                
                                if (transactionState.range) {
                                    Alert.alert(`About ${Math.ceil(state.range)} km more`, 'Please be within 5 km before booking', [{ text: 'OK', onPress: () => clearRange() }]);
                                }
                            }},
                            { text: 'Cancel' }
                        ]);
                    }}
                />
            </ScrollView>
            
        </Header>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginHorizontal: 15
    },
    licenseContainer: {
        flexDirection: 'row',
        paddingBottom: 5
    },
    licenseTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    license: {
        fontSize: 18,
        paddingLeft: 5
    },
    detailContainer: {
        flexDirection: 'row'
    },
    detailTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    detail: {
        fontSize: 18,
        paddingLeft: 5
    },
    parkingMapContainer: {
        marginHorizontal: 15
    },
    bottomContainer: {
        paddingVertical: 10,
        marginHorizontal: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#D4D4D4'
    },
    zoneContainer: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingBottom: 5
    },
    zoneTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    zoneName: {
        fontSize: 18,
        paddingLeft:  5
    },
    slotContainer: {
        flexDirection: 'row',
        paddingHorizontal: 5
    },
    slotTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    slotName: {
        fontSize: 18,
        paddingLeft:  5
    },
    errorMessage: {
        paddingTop: 5,
        marginHorizontal: 20,
        fontSize: 16,
        color: 'red'
    },
    buttonContainer: {
        marginHorizontal: 50,
        marginTop: 15,
        marginBottom: 30
    },
    button: {
        height: 50,
        backgroundColor: '#00AB66',
        borderRadius: 25
    },
    buttonTitle: {
        fontWeight: 'bold'
    }
});

export default SlotScreen;

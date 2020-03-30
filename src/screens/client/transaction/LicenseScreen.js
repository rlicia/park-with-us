import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Keyboard, Platform, PermissionsAndroid, Alert, RefreshControl } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationEvents } from '@react-navigation/compat';
import Geolocation from 'react-native-geolocation-service';

import { Context as TransactionContext } from '../../../contexts/TransactionContext';
import { Context as AuthContext } from '../../../contexts/AuthContext';

import Header from '../../../components/Header';
import Loader from '../../../components/Loader';

const LicenseScreen = () => {
    const { state: authState, refresh } = useContext(AuthContext);
    const { state, setLicense, initialRefreshTransaction, clearRange, clearErrorMessage } = useContext(TransactionContext);
    const [licenseTitle, setLicenseTitle] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [err, setErr] = useState(null);

    if (state.range) {
        Alert.alert(`About ${Math.ceil(state.range)} km more`,'Please be within 5 km before booking', [{ text: 'OK', onPress: () => clearRange() }]);
    }

    const startWatching = async () => {
        try {
            if (Platform.OS === 'android') {
                const checkLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                if (!checkLocationPermission) {
                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Location Permission Not Granted.');
                        setErr('DENIED');
                    }
                }
            }
            Geolocation.getCurrentPosition(position => {
                
            },
            error => {
                setErr(error);
            });
        } catch (e) {
            setErr(e);
        }
    };

    useEffect(() => {
        startWatching();
    }, []);

    return (
        <Header
            title='License'
            transactionScreen={true}
        >
            <Loader
                title={state.loading}
                loading={state.loading ? true : false}
            />
            <NavigationEvents
                onWillBlur={() => {
                    setLicenseTitle('');
                    setLicenseNumber('');
                    clearErrorMessage();
                }}
            />
            <KeyboardAwareScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={state.refreshing || authState.refreshing}
                        onRefresh={() => {
                            refresh();
                            initialRefreshTransaction();
                    }} />
                }
                style={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='always'
            >
                <View style={styles.inputContainer}>
                    <View style={styles.inputTitleStyle}>
                        <Input
                            placeholder='3AB'
                            placeholderTextColor='#D4D4D4'
                            autoCapitalize='characters'
                            autoCorrect={false}
                            maxLength={3}
                            value={licenseTitle}
                            onChangeText={setLicenseTitle}
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={styles.inputStyle}
                        />
                    </View>
                    <View style={styles.inputNumberStyle}>
                        <Input
                            placeholder='0000'
                            placeholderTextColor='#D4D4D4'
                            autoCapitalize='characters'
                            autoCorrect={false}
                            keyboardType='number-pad'
                            maxLength={4}
                            value={licenseNumber}
                            onChangeText={setLicenseNumber}
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={styles.inputStyle}
                        />
                    </View>
                </View>
                {state.errorMessage || err ? <Text style={styles.errorMessage}>{err ? 'Please enable location services' : state.errorMessage}</Text> : null}
                <Button
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    title='Enter License'
                    onPress={() => {
                        Keyboard.dismiss();
                        Geolocation.getCurrentPosition(position => {
                            console.log(position);
                            setLicense({ licenseTitle, licenseNumber, latitude: position.coords.latitude, longitude: position.coords.longitude });
                        },
                        error => {
                            setErr(error);
                        });
                        
                        if (err) {
                            Alert.alert('Please enable location services');
                        }
                    }}
                />
            </KeyboardAwareScrollView>
        </Header>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 15
    },
    inputContainer: {
        flexDirection: 'row',
        marginHorizontal: 30,
        marginBottom: 10
    },
    inputTitleStyle: {
        flex: 4,
        paddingHorizontal: 10
    },
    inputNumberStyle: {
        flex: 5,
        paddingHorizontal: 10
    },
    inputcontainerStyle: {
        borderColor: '#D4D4D4'
    },
    inputStyle: {
        fontSize: 45,
        textAlign: 'center'
    },
    errorMessage: {
        marginHorizontal: 10,
        fontSize: 16,
        color: 'red'
    },
    buttonContainer: {
        marginHorizontal: 50,
        marginVertical: 30
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

export default LicenseScreen;

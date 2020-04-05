import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import { NavigationEvents } from '@react-navigation/compat';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

import { Context as TierContext } from '../../../contexts/TierContext';

import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import InputForm from '../../../components/InputForm';
import Permissions from '../../../components/Permissions';

const CreateTierScreen = ({ route }) => {
    const { state, fetchTiers, createTier, clearTierData, clearPermissions,  clearErrorMessage } = useContext(TierContext);
    const [tierName, setTierName] = useState('');
    const [order, setOrder] = useState(1);
    const [orderTierLevel, setOrderTierLevel] = useState(-1);
    const status = route.params.status;
    let pickerData = [];
    for (i=0; i<state.tier.length-1; i++) { // minus -1 = not show not assigned tier
        pickerData.push({ label: state.tier[i].tierName, value: state.tier[i].tierLevel });
    };

    return (
        <Header
            title='Create Tier'
            userScreen={true}
            backButton='TierList'
        >
            <NavigationEvents
                onWillFocus={() => fetchTiers({ status })}
                onWillBlur={() => {
                    clearErrorMessage();
                    clearTierData();
                    clearPermissions();
                }}
            />
            <Loader
                title={state.loading}
                loading={state.loading ? true : false}
            />
            <KeyboardAwareScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='always'
            >
                <InputForm
                    label={<Text style={styles.inputLabel}>Tier Name*</Text>}
                    placeholder='Tier Name*'
                    value={tierName}
                    onChangeText={setTierName}
                />
                <Text style={styles.pickerTitle}>Select Order</Text>
                <View style={styles.pickerContainer}>
                    <View style={styles.orderPicker}>
                        <RNPickerSelect 
                            style={pickerSelectStyles}
                            onValueChange={value => setOrder(value)}
                            placeholder={{}}
                            items={[
                                { label: 'After', value: 1 },
                                { label: 'Before', value: 0 }
                            ]}
                        />
                    </View>
                    <View style={styles.tierPicker}>
                        <RNPickerSelect 
                            style={pickerSelectStyles}
                            onValueChange={value => setOrderTierLevel(value)}
                            placeholder={{}}
                            items={pickerData}
                        />
                    </View>
                </View>
                {status === 0 ? 
                <Permissions />
                : null}
                {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
                <Button
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    containerStyle={status === 1 ? styles.buttonClientContainer : styles.buttonUserContainer}
                    title='Create Tier'
                    onPress={() => {
                        Keyboard.dismiss();
                        createTier({ tierName, order, orderTierLevel, permissions: state.permissions, status });
                    }}
                />
            </KeyboardAwareScrollView>
        </Header>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      color: 'black'
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      color: 'black'
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15
    },
    inputLabel: {
        color: '#00AB66'
    },
    pickerTitle: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    pickerContainer: {
        flexDirection: 'row',
        marginHorizontal: 5,
        marginBottom: 10
    },
    orderPicker: {
        flex: 3
    },
    tierPicker: {
        flex: 8
    },
    errorMessage: {
        marginHorizontal: 10,
        fontSize: 16,
        color: 'red'
    },
    buttonClientContainer: {
        marginHorizontal: 15,
        marginVertical: 30
    },
    buttonUserContainer: {
        marginHorizontal: 15,
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

export default CreateTierScreen;

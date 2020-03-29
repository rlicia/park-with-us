import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { NavigationEvents } from '@react-navigation/compat';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';

import { Context as TierContext } from '../../../contexts/TierContext';
import { Context as AccountContext } from '../../../contexts/AccountContext';

import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import InputForm from '../../../components/InputForm';

const EditAccountTierScreen = ({ route }) => {
    const { state, updateAccountTier, clearErrorMessage } = useContext(AccountContext);
    const { state: tierState, fetchTiers, clearTierData } = useContext(TierContext);
    const [newTierId, setNewTierId] = useState('');
    const tier = route.params.tier;
    const status = route.params.status;
    const id = route.params.id;

    let pickerData = [];
    for (i=0; i<tierState.tier.length; i++) { // minus -1 = not show not assigned tier
        if (tierState.tier[i].tierName !== tier) {
            pickerData.push({ label: tierState.tier[i].tierName, value: tierState.tier[i]._id });
        }
    }

    return (
        <Header
            title='Edit Account Tier'
            userScreen={true}
            backButton='AccountDetail'
        >
            <KeyboardAwareScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='always'
            >
                <NavigationEvents
                    onWillFocus={() => fetchTiers({ status })}
                    onWillBlur={() => {
                        clearErrorMessage();
                        clearTierData();
                    }}
                />
                <Loader
                    title={state.loading}
                    loading={state.loading ? true : false}
                />
                <InputForm
                    label={<Text>Current Tier</Text>}
                    value={tier}
                    inputStyle={styles.inputText}
                    editable={false}
                />
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerTitle}>New Tier:</Text>
                    <View style={styles.picker}>
                        <RNPickerSelect
                            style={pickerSelectStyles}
                            onValueChange={value => setNewTierId(value)}
                            placeholder={{ label: 'Select Tier...', value: null}}
                            items={pickerData}
                        />
                    </View>
                </View>
                {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
                <Button
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    title='Save'
                    onPress={() => {
                        Keyboard.dismiss();
                        updateAccountTier({ id, newTierId, status });
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
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      color: 'black'
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      color: 'black'
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 15
    },
    inputText: {
        fontWeight: 'bold'
    },
    pickerContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: 'center'
    },
    pickerTitle: {
        paddingRight: 10,
        fontSize: 18
    },
    picker: {
        flex: 1
    },
    errorMessage: {
        marginHorizontal: 10,
        fontSize: 16,
        color: 'red'
    },
    buttonContainer: {
        marginHorizontal: 15,
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

export default EditAccountTierScreen;

import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import { NavigationEvents } from '@react-navigation/compat';

import { Context as AccountContext } from '../../../contexts/AccountContext';

import Header from '../../../components/Header';
import InputForm from '../../../components/InputForm';
import Loader from '../../../components/Loader';

const EditAccountRfidScreen = ({ route }) => {
    const { state, updateAccountRfidTag, clearErrorMessage } = useContext(AccountContext);
    const [newRfidTag, setNewRfidTag] = useState('');
    const rfidTag = route.params.rfidTag;
    const id = route.params.id;

    return (
        <Header
            title='Edit RFID Tag'
            userScreen={true}
            backButton='AccountDetail'
        >
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <Loader
                loading={state.loading ? true : false}
            />
            <KeyboardAwareScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='always'
            >
                <InputForm
                    label={<Text>Current RFID Tag</Text>}
                    value={rfidTag}
                    inputStyle={styles.inputText}
                    editable={false}
                />
                <View style={styles.spacer} />
                <InputForm
                    label={<Text style={styles.inputLabel}>New RFID Tag*</Text>}
                    placeholder='New RFID Tag*'
                    value={newRfidTag}
                    onChangeText={setNewRfidTag}
                />
                {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
                <Button
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    title='Change RFID Tag'
                    onPress={() => {
                        Keyboard.dismiss();
                        updateAccountRfidTag({ id, rfidTag, newRfidTag });
                    }}
                />
            </KeyboardAwareScrollView>
        </Header>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 15
    },
    inputLabel: {
        color: '#00AB66'
    },
    inputText: {
        fontWeight: 'bold'
    },
    spacer: {
        marginVertical: 10
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

export default EditAccountRfidScreen;

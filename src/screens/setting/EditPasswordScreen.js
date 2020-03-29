import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import { NavigationEvents } from '@react-navigation/compat';

import { Context as AuthContext } from '../../contexts/AuthContext';

import Header from '../../components/Header';
import InputForm from '../../components/InputForm';
import Loader from '../../components/Loader';

const EditPasswordScreen = () => {
    const { state, changePassword, clearErrorMessage } = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    return (
        <Header
            title='Change Password'
            backButton='Setting'
            disableActivation={true}
        >
            <KeyboardAwareScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='always'
            >
                <NavigationEvents
                    onWillBlur={clearErrorMessage}
                />
                <Loader
                    loading={state.loading ? true : false}
                />
                <InputForm
                    label={<Text style={styles.inputLabel}>Current Password*</Text>}
                    placeholder='Current Password*'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <View style={styles.spacer} />
                <InputForm
                    label={<Text style={styles.inputLabel}>New Password*</Text>}
                    placeholder='New Password*'
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={true}
                />
                <InputForm
                    label={ confirmNewPassword === newPassword ? <Text style={styles.inputLabel}>Confirm Password*</Text>
                            : <Text style={{ color: 'red' }}>Password Mismatch</Text>}
                    placeholder='Confirm Password*'
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    secureTextEntry={true}
                />
                {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
                <Button
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    title='Change Password'
                    onPress={() => {
                        Keyboard.dismiss();
                        changePassword({ password, newPassword, confirmNewPassword });
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

export default EditPasswordScreen;
import React, { useState, useContext } from 'react';
import { Text, StyleSheet, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationEvents } from '@react-navigation/compat';

import { Context as AuthContext } from '../../contexts/AuthContext';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import InputForm from '../../components/InputForm';

const SignInScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Header
            title="Sign In"
            backButton="LoginHome"
            disableActivation={true}
            loginScreen={true}
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
                    label={<Text style={styles.inputLabel}>Username*</Text>}
                    placeholder='Username*'
                    value={username}
                    onChangeText={setUsername}
                />
                <InputForm
                    label={<Text style={styles.inputLabel}>Password*</Text>}
                    placeholder='Password*'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
                <Button
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    title='Login'
                    onPress={ async () => {
                        Keyboard.dismiss();
                        await signin({ username, password });
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
        paddingHorizontal: 40
    },
    inputLabel: {
        color: '#00AB66'
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

export default SignInScreen;
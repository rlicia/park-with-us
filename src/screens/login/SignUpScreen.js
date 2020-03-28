import React, { useContext, useState, useReducer } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import { NavigationEvents } from '@react-navigation/compat';

import { Context as AuthContext } from '../../contexts/AuthContext';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import InputForm from '../../components/InputForm';
import CheckBoxForm from '../../components/CheckBoxForm';

const genderReducer = (gender, action) => {
    switch (action.type) {
        case 'male':
            return { gender: 1 };
        case 'female':
            return { gender: 0 };
        default:
            return gender;
    }
}

const SignUpScreen = () => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useReducer(genderReducer, { gender: null });

    return (
        <Header
            title='Create New Account'
            backButton='LoginHome'
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
                    title={state.loading}
                    loading={state.loading ? true : false}
                />
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
                <InputForm
                    label={ confirmPassword === password ? <Text style={styles.inputLabel}>Confirm Password*</Text>
                            : <Text style={{ color: 'red' }}>Password Mismatch</Text>}
                    placeholder='Confirm Password*'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={true}
                />
                <InputForm
                    label={<Text style={styles.inputLabel}>First Name*</Text>}
                    placeholder='First Name*'
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <InputForm
                    label={<Text style={styles.inputLabel}>Last Name*</Text>}
                    placeholder='Last Name*'
                    value={lastName}
                    onChangeText={setLastName}
                />
                <InputForm
                    label={<Text style={styles.inputLabel}>Email*</Text>}
                    placeholder='Email*'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                />
                <View style={styles.genderContainer}>
                    <CheckBoxForm
                        title='male'
                        checked={gender.gender === 1 ? true : null}
                        onCheck={() => setGender({ type: 'male' })}
                    />
                    <CheckBoxForm
                        title='female'
                        checked={gender.gender === 0 ? true : null}
                        onCheck={() => setGender({ type: 'female' })}
                    />
                </View>
                {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
                <Button
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    title='Create'
                    onPress={() => {
                        Keyboard.dismiss();
                        signup({ username, password, confirmPassword, firstName, lastName, email, gender: gender.gender });
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
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    errorMessage: {
        marginHorizontal: 10,
        fontSize: 16,
        color: 'red'
    },
    buttonContainer: {
        marginHorizontal: 15,
        marginVertical: 10,
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

export default SignUpScreen;
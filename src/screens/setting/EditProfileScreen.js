import React, { useContext, useState } from 'react';
import { Text, StyleSheet, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import { NavigationEvents } from '@react-navigation/compat';

import { Context as AuthContext } from '../../contexts/AuthContext';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import InputForm from '../../components/InputForm';

const EditProfileScreen = () => {
    const { state, editAccount, clearErrorMessage }  = useContext(AuthContext);
    const [firstName, setFirstName] = useState(state.account.firstName);
    const [lastName, setLastName] = useState(state.account.lastName);
    const [email, setEmail] = useState(state.account.email);

    return (
        <Header
            title='Edit Profile'
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
                    title={state.loading}
                    loading={state.loading ? true : false}
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
                {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
                <Button
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    title='Save'
                    onPress={() => {
                        Keyboard.dismiss();
                        editAccount({ firstName, lastName, email });
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

export default EditProfileScreen;
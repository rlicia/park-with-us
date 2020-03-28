import React, { useContext, useState, useReducer } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import { NavigationEvents } from '@react-navigation/compat';
import RNPickerSelect from 'react-native-picker-select';

import { Context as TierContext } from '../../../contexts/TierContext';
import { Context as AccountContext } from '../../../contexts/AccountContext';

import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import InputForm from '../../../components/InputForm';
import CheckBoxForm from '../../../components/CheckBoxForm';

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

const CreateUserScreen = () => {
    const { state, createUserAccount, clearErrorMessage } = useContext(AccountContext);
    const { state: tierState, fetchTiers, clearTierData } = useContext(TierContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [tierId, setTierId] = useState('');
    const [gender, setGender] = useReducer(genderReducer, { gender: null });
    let pickerData = [];
    for (i=0; i<tierState.tier.length-1; i++) { // minus -1 = not show not assigned tier
        pickerData.push({ label: tierState.tier[i].tierName, value: tierState.tier[i]._id });
    }
    
    return (
        <Header
            title='Create User Account'
            userScreen={true}
            backButton='UserHome'
        >
            <KeyboardAwareScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='always'
            >
                <NavigationEvents
                    onWillFocus={() => fetchTiers({ status: 0 })}
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
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerTitle}>Tier:</Text>
                    <View style={styles.picker}>
                        <RNPickerSelect
                            style={pickerSelectStyles}
                            onValueChange={value => setTierId(value)}
                            placeholder={{ label: 'Select Tier...', value: null}}
                            items={pickerData}
                        />
                    </View>
                </View>
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
                        createUserAccount({ username, password, confirmPassword, firstName, lastName, email, tierId, gender: gender.gender });
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
    inputLabel: {
        color: '#00AB66'
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

export default CreateUserScreen;

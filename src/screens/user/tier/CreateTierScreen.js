import React, { useContext, useState } from 'react';
import { Text, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import { NavigationEvents } from '@react-navigation/compat';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';

import { Context as TierContext } from '../../../contexts/TierContext';

import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import InputForm from '../../../components/InputForm';

const CreateTierScreen = ({ route }) => {
    const { state, createTier, clearErrorMessage } = useContext(TierContext);
    const [tierName, setTierName] = useState('');
    const status = route.params.status;

    return (
        <Header
            title='Create Tier'
            userScreen={true}
            backButton='TierList'
        >
            <NavigationEvents
                onWillBlur={clearErrorMessage}
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
                {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
                <Button
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    title='Create Tier'
                    onPress={() => {
                        Keyboard.dismiss();
                        createTier({ tierName, status });
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

export default CreateTierScreen;

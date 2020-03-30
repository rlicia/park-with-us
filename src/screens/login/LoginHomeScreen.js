import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

import { Context as AuthContext } from '../../contexts/AuthContext';

import Loader from '../../components/Loader';

const { height } = Dimensions.get('window');

const LoginHomeScreen = ({ navigation }) => {
    const { state, tryLocalSignin } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin();
    },[]);

    return (
        <>
            <Loader
                title={state.loading}
                loading={state.loading ? true : false}
            />
            <View style={styles.topContainer}>
                <Text style={styles.title}>
                    ParkWithUs
                </Text>
            </View>
            <View style={styles.bottomContainer}>
                <Button
                    title="SIGN IN"
                    onPress={() => navigation.navigate('SignIn')}
                    buttonStyle={styles.signinButton}
                    titleStyle={styles.signinTitle}
                    containerStyle={styles.buttonContainer}
                />
                <Button
                    title="CREATE ACCOUNT"
                    onPress={() => navigation.navigate('SignUp')}
                    type='outline'
                    buttonStyle={styles.signupButton}
                    titleStyle={styles.signupTitle}
                    containerStyle={styles.buttonContainer}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: height * 0.4,
        left: 0,
        right: 0
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    bottomContainer: {
        flex: 1,
        marginTop: height * 0.5,
        marginHorizontal: 50,
        justifyContent: 'center'
    },
    buttonContainer: {
        marginVertical: 10
    },
    signinButton: {
        height: 50,
        backgroundColor: '#00AB66',
        borderRadius: 25
    },
    signinTitle: {
        fontWeight: 'bold'
    },
    signupButton: {
        height: 50,
        marginVertical: 10,
        borderRadius: 25,
        borderColor: '#00AB66',
        borderWidth: 1.5
    },
    signupTitle: {
        fontWeight: 'bold',
        color: '#00AB66'
    }
});

export default LoginHomeScreen;
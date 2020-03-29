import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';

import { Context as AuthContext } from '../../../contexts/AuthContext';

import Header from '../../../components/Header';

const ButtonForm = ({ title, icon, onSubmit }) => {
    return (
        <TouchableHighlight
            style={button.container}
            underlayColor='#00000030'
            onPress={onSubmit}
        >
            <View style={button.button}>
                <Text style={button.title}>{title}</Text>
            </View>
        </TouchableHighlight>
    );
};

const button = StyleSheet.create({
    container: {
        height: 80,
        paddingHorizontal: 15
    },
    button: {
        flex: 1,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#D4D4D4',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 18
    }
});

const AccountHomeScreen = () => {
    const { navigateTo } = useContext(AuthContext);

    return (
        <Header
            title='Client or User'
            userScreen={true}
            backButton='UserHome'
        >
            <ScrollView>
                <ButtonForm 
                    title='Client'
                    onSubmit={() => navigateTo('AccountList', { status: 1 })}
                />
                <ButtonForm 
                    title='User'
                    onSubmit={() => navigateTo('AccountList', { status: 0 })}
                />
            </ScrollView>
        </Header>
    );
};

const styles = StyleSheet.create({

});

export default AccountHomeScreen;

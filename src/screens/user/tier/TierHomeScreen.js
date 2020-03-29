import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';

import Header from '../../../components/Header';

const ButtonForm = ({ title, onSubmit }) => {
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

const TierHomeScreen = ({ navigation }) => {
    return (
        <Header
            title='Tier'
            userScreen={true}
            backButton='UserHome'
        >
            <ScrollView>
                <ButtonForm 
                    title='Client'
                    onSubmit={() => navigation.navigate('TierList', { status: 1 })}
                />
                <ButtonForm
                    title='User'
                    onSubmit={() => navigation.navigate('TierList', { status: 0 })}
                />
            </ScrollView>
        </Header>
    );
};

const styles = StyleSheet.create({

});

export default TierHomeScreen;

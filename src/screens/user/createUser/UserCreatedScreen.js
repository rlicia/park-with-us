import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

import { Context as AuthContext } from '../../../contexts/AuthContext';

import Header from '../../../components/Header';

const TextForm = ({ title, content }) => {
    return (
        <View style={text.container}>
            <Text style={text.title}>{title}:</Text>
            <Text style={text.content}>{content}</Text>
        </View>
    );
};

const text = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 5
    },
    title: {
        paddingBottom: 1
    },
    content: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

const UserCreatedScreen = ({ route }) => {
    const { navigateTo } = useContext(AuthContext);
    const user = route.params.user;
    const firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.substring(1);
    const lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.substring(1);
    const name = firstName + ' ' + lastName;
    let gender;
    user.gender === 1 ? gender = 'Male' : gender = 'Female';

    return (
        <Header
            title='User Created'
            userScreen={true}
        >
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome,</Text>
                    <TextForm
                        title='Username'
                        content={user.username}
                    />
                    <TextForm
                        title='Name'
                        content={name}
                    />
                    <TextForm 
                        title='Email'
                        content={user.email}
                    />
                    <TextForm 
                        title='Tier'
                        content={user.tier}
                    />
                    <TextForm 
                        title='Gender'
                        content={gender}
                    />
                    <Button
                        titleStyle={styles.buttonTitle}
                        buttonStyle={styles.button}
                        containerStyle={styles.buttonContainer}
                        title='Go Back'
                        onPress={() => navigateTo('UserHome')}
                    />
                </View>
            </ScrollView>
        </Header>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    title: {
        marginHorizontal: 15,
        marginBottom: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#00AB66'
    },
    buttonContainer: {
        marginHorizontal: 30,
        marginVertical: 20
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

export default UserCreatedScreen;

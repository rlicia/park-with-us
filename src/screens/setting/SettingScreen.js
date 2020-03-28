import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Context as AuthContext } from '../../contexts/AuthContext';

import Header from '../../components/Header';
import Loader from '../../components/Loader';

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

const ButtonForm = ({ title, icon, onSubmit }) => {
    return (
        <TouchableHighlight
            style={button.container}
            underlayColor='#00000030'
            onPress={onSubmit}
        >
            <View style={button.button}>
                <View style={button.icon}>{icon}</View>
                <Text style={button.title}>{title}</Text>
            </View>
        </TouchableHighlight>
    );
};

const button = StyleSheet.create({
    container: {
        height: 50
    },
    button: {
        flex: 1,
        paddingLeft: 5,
        borderBottomWidth: 1,
        borderColor: '#D4D4D4',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        flex: 9,
        fontSize: 16,
        paddingLeft: 5
    }
});

const SettingScreen = ({ navigation }) => {
    const { state, refresh, signout } = useContext(AuthContext);
    
    return (
        <Header
            title='Setting'
            disableActivation={true}
            headerRight={
                <TouchableOpacity
                    onPress={refresh}
                >
                    <Icon name='refresh' size={26} />
                </TouchableOpacity>
            }
        >
            <Loader
                title={state.loading}
                loading={state.loading ? true : false}
            />
            <ScrollView>
                <View style={styles.topContainer}>
                    <TextForm 
                        title='Username'
                        content={state.account.username}
                    />
                    <TextForm
                        title='Name'
                        content={state.account.firstName + ' ' + state.account.lastName}
                    />
                    <TextForm 
                        title='Email'
                        content={state.account.email}
                    />
                    <TextForm 
                        title='Gender'
                        content={state.account.gender}
                    />
                    <TextForm 
                        title='Tier'
                        content={state.account.tier}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <ButtonForm 
                        title='Edit Your Profile'
                        icon={<Icon name='user' size={22} />}
                        onSubmit={() => navigation.navigate('EditProfile')}
                    />
                    <ButtonForm 
                        title='Change Password'
                        icon={<Icon name='key' size={22} />}
                        onSubmit={() => navigation.navigate('EditPassword')}
                    />
                    <ButtonForm
                        title='Logout'
                        icon={<Icon name='power-off' size={22} />}
                        onSubmit={signout}
                    />
                </View>
            </ScrollView>
        </Header>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        margin: 15
    },
    bottomContainer: {
        borderTopWidth: 1,
        borderTopColor: '#D4D4D4'
    }
});

export default SettingScreen;

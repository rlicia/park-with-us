import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Context as AuthContext } from '../../contexts/AuthContext';

import Header from '../../components/Header';

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
        height: 80,
        paddingHorizontal: 15
    },
    button: {
        flex: 1,
        paddingVertical: 20,
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
        fontSize: 18,
        paddingLeft: 5
    }
});

const UserHomeScreen = ({ navigation }) => {
    const { state, refresh } = useContext(AuthContext);
    
    return (
        <Header
            title='Home'
            userScreen={true}
        >
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={state.refreshing} onRefresh={() => refresh()} />
                }
            >
                {
                    state.account.permissions.indexOf('search_client_account') > -1 ||
                    state.account.permissions.indexOf('edit_client_rfid_tag') > -1 ||
                    state.account.permissions.indexOf('edit_client_tier') > -1 ||
                    state.account.permissions.indexOf('edit_client_status') > -1 ||
                    state.account.permissions.indexOf('search_user_account') > -1 ||
                    state.account.permissions.indexOf('edit_user_tier') > -1 ||
                    state.account.permissions.indexOf('edit_user_status') > -1 ?
                        <ButtonForm
                            title='Client & User'
                            icon={<Icon name='users' size={22} />}
                            onSubmit={() => navigation.navigate('AccountHome')}
                        />
                    : null
                }
                {state.account.permissions.indexOf('edit_parking') > -1 ?
                    <ButtonForm 
                        title='Parking Space'
                        icon={<Icon name='car' size={22} />}
                        onSubmit={() => navigation.navigate('EditSlot')}
                    />
                : null}
                {
                    state.account.permissions.indexOf('search_client_tier') > -1 ||
                    state.account.permissions.indexOf('create_edit_client_tier') > -1 ||
                    state.account.permissions.indexOf('search_user_tier') > -1 ||
                    state.account.permissions.indexOf('create_edit_user_tier') > -1 ?
                        <ButtonForm
                            title='Tier'
                            icon={<Icon name='pencil' size={22} />}
                            onSubmit={() => navigation.navigate('TierHome')}
                        />
                    : null
                }
                {
                    state.account.permissions.indexOf('create_user_account') > -1 ?
                        <ButtonForm 
                            title='Create User Account'
                            icon={<Icon name='user-plus' size={22} />}
                            onSubmit={() => navigation.navigate('CreateUser')}
                        />
                    : null
                }
            </ScrollView>
        </Header>
    );
};

const styles = StyleSheet.create({

});

export default UserHomeScreen;

import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationEvents } from '@react-navigation/compat';

import { Context as AuthContext } from '../../../contexts/AuthContext';
import { Context as AccountContext } from '../../../contexts/AccountContext';

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
        marginVertical: 2
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

const ActivateForm = ({ activate, onSubmit }) => {
    return (
        <TouchableHighlight
            style={(activate || activate === 0) ? button.container : null}
            underlayColor='#00000030'
            onPress={onSubmit}
        >
            <View style={activate === 1 ? button.deactivate : button.activate}>
                <View style={button.icon}>
                    <Icon name='power-off' size={22} style={{ color: 'white' }} />
                </View>
                <Text style={button.activateTitle}>{activate === 1 ? 'Deactivate User' : 'Activate User'}</Text>
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
    },
    activate: {
        flex: 1,
        paddingLeft: 5,
        borderBottomWidth: 1,
        borderColor: '#D4D4D4',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50'
    },
    deactivate: {
        flex: 1,
        paddingLeft: 5,
        borderBottomWidth: 1,
        borderColor: '#D4D4D4',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f44336'
    },
    activateTitle: {
        flex: 9,
        fontSize: 18,
        paddingLeft: 5,
        fontWeight: 'bold',
        color: 'white'
    },
});

const AccountDetailScreen = ({ route }) => {
    const { navigateTo } = useContext(AuthContext);
    const { state, fetchAccountDetail, updateAccountStatus, clearAccountDetailData } = useContext(AccountContext);
    const user = route.params.item;
    const detail = state.accountDetail;

    return (
        <Header
            title={user.username}
            userScreen={true}
            backButton='AccountList'
        >
            <NavigationEvents 
                onWillFocus={() => fetchAccountDetail({ username: user.username, id: user._id, status: user.status })}
                onWillBlur={clearAccountDetailData}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={state.loading ? true : false} onRefresh={() => fetchAccountDetail({ username: user.username, id: user._id, status: user.status })} />
                }
            >
                <View style={styles.topContainer}>
                    <TextForm 
                        title='Username'
                        content={user.username}
                    />
                    <TextForm
                        title='Name'
                        content={detail.firstName ? detail.firstName + ' ' + detail.lastName : null}
                    />
                    <TextForm 
                        title='Email'
                        content={detail.email}
                    />
                    <TextForm 
                        title='Gender'
                        content={detail.gender}
                    />
                    <TextForm 
                        title='Tier'
                        content={detail.tier}
                    />
                    {user.status === 1 ? <TextForm 
                        title='RFID Tag'
                        content={detail.rfidTag}
                    /> : null}
                    <TextForm 
                        title='Status'
                        content={(detail.accountStatus || detail.accountStatus === 0) ? detail.accountStatus === 1 ? 'Activated' : 'Deactivated' : null}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <ButtonForm 
                        title='Change Tier'
                        icon={<Icon name='pencil' size={22} />}
                        onSubmit={() => navigateTo('EditAccountTier', { id: detail._id, tierId: detail.tierId, tier: detail.tier, status: user.status })}
                    />
                    {user.status === 1 ? <ButtonForm 
                        title='Change RFID Tag'
                        icon={<Icon name='tag' size={22} />}
                        onSubmit={() => navigateTo('EditAccountRfid', { id: detail._id, rfidTag: detail.rfidTag })}
                    /> : null}
                    <ActivateForm
                        activate={detail.accountStatus}
                        onSubmit={() => updateAccountStatus({ id: detail._id, status: user.status })}
                    />
                </View>
            </ScrollView>
        </Header>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        marginVertical: 10,
        marginHorizontal: 15
    },
    bottomContainer: {
        borderTopWidth: 1,
        borderTopColor: '#D4D4D4'
    }
});

export default AccountDetailScreen;

import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Keyboard, RefreshControl } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { Context as AuthContext } from '../../../contexts/AuthContext';
import { Context as AccountContext } from '../../../contexts/AccountContext';

import Header from '../../../components/Header';

const AccountListScreen = ({ navigation, route }) => {
    const { state: authState, refresh } = useContext(AuthContext);
    const { state, fetchAccounts, refreshAccounts } = useContext(AccountContext);
    const [username, setUsername] = useState('');
    const status = route.params.status
    
    return (
        <Header
            title='Search Accounts'
            userScreen={true}
            backButton='AccountHome'
        >
            <SearchBar
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer}
                lightTheme={true}
                showLoading={state.loading ? true : false}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='Enter Username'
                placeholderTextColor='gray'
                value={username}
                onChangeText={(name) => {
                    setUsername(name);
                    fetchAccounts({ username: name, status });
                }}
            />
            <View style={styles.container}>
                <View style={styles.accountCount}>
                    <Text style={styles.accountCountText}>Total: {state.account ? state.account.length !== 0 ? state.account.length : 0 : null}</Text>
                </View>
                <FlatList
                    style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={state.refreshing || authState.refreshing}
                            onRefresh={() => {
                                refreshAccounts({ username, status });
                                refresh();
                            }} />
                    }
                    data={state.account}
                    keyboardShouldPersistTaps='always'
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        if (item.tierLevel !== 0) {
                            return (
                                <TouchableHighlight
                                    style={styles.listItemContainer}
                                    underlayColor='#00000030'
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        navigation.navigate('AccountDetail', { item });
                                    }}
                                >
                                    <View style={styles.listItem}>
                                        <View style={styles.listTitleContainer}>
                                            <Text style={styles.listTitle}>
                                                {item.username}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            );
                        }
                    }}
                />
            </View>
        </Header>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        marginHorizontal: 10
    },
    input: {
        color: '#25221E'
    },
    accountCount: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        justifyContent: 'center',
        marginHorizontal: 15
    },
    accountCountText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10
    },
    listItemContainer: {
        height: 80
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#D4D4D4',
        marginHorizontal: 15,
        alignItems: 'center'
    },
    listTitleContainer: {
        flex: 9,
        paddingLeft: 10
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default AccountListScreen;

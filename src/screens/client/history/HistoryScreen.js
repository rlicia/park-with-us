import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, RefreshControl } from 'react-native';
import {  NavigationEvents } from '@react-navigation/compat';

import { Context as TransactionContext } from '../../../contexts/TransactionContext';

import Header from '../../../components/Header';

const HistoryScreen = ({ navigation }) => {
    const { state, fetchHistories, clearHistories } = useContext(TransactionContext);

    return (
        <Header
            title='History'
            disableActivation={true}
        >
            <NavigationEvents
                onWillFocus={() => fetchHistories()}
                onWillBlur={() => clearHistories()}
            />
            <View style={styles.topContainer}>
                <Text style={styles.topText}>Date: (MM/DD/YYYY)</Text>
            </View>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={state.loading ? true : false}
                        onRefresh={() => {
                            fetchHistories();
                    }} />
                }
                data={state.histories}
                keyExtractor={item => item.createdDate}
                renderItem={({ item }) => {
                    return (
                        <TouchableHighlight
                            style={styles.listItemContainer}
                            underlayColor='#00000030'
                            onPress={() => {
                                navigation.navigate('HistoryDetail', { item });
                            }}
                        >
                            <View style={styles.listItem}>
                                <Text style={styles.listTitle}>
                                    {item.createdDate}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    );
                }}
            />
        </Header>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        justifyContent: 'center',
        marginHorizontal: 15
    },
    topText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10
    },
    listItemContainer: {
        height: 60
    },
    listItem: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#D4D4D4',
        marginHorizontal: 15,
        justifyContent: 'center',
        paddingLeft: 10
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default HistoryScreen;

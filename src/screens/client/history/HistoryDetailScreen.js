import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import {  NavigationEvents } from '@react-navigation/compat';

import { Context as TransactionContext } from '../../../contexts/TransactionContext';

import Header from '../../../components/Header';

const Content = ({ title, content }) => {
    return (
        <View style={contents.container}>
            <Text>
                {title}:
            </Text>
            <Text style={contents.content}>
                {content}
            </Text>
        </View>
    );
};

const contents = StyleSheet.create({
    container: {
        marginTop: 5,
        flexDirection: 'row'
    },
    content: {
        paddingLeft: 5,
        fontWeight: 'bold'
    }
});

const HistoryDetailScreen = ({ route }) => {
    const history = route.params.item;
    const { state, fetchHistoryDetails, clearHistoryDetails } = useContext(TransactionContext);

    return (
        <Header
            title={history.createdDate}
            disableActivation={true}
            backButton='History'
        >
            <NavigationEvents
                onWillFocus={() => fetchHistoryDetails({ createdDate: history.createdDate })}
                onWillBlur={() => clearHistoryDetails()}
            />
            <View style={styles.topContainer}>
                <Text style={styles.topText}>Total: {state.historyDetails.length}</Text>
            </View>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={state.loading ? true : false}
                        onRefresh={() => {
                            fetchHistoryDetails({ createdDate: history.createdDate });
                    }} />
                }
                data={state.historyDetails}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.listItemContainer}>
                            <View style={styles.listItem}>
                                {item.status === 'Book' ? <View style={status.book} />
                                : item.status === 'Park' ? <View style={status.park} />
                                : item.status === 'Cancel' ? <View style={status.cancel} />
                                : item.status === 'Expire' ? <View style={status.expire} />
                                : item.status === 'Drive Out' ? <View style={status.driveOut} />
                                : null}
                                <View style={styles.listTitleContainer}>
                                    <Text style={styles.listTitle}>
                                        {item.createdTime}
                                    </Text>
                                    <Content
                                        title='RFID Tag'
                                        content={item.rfidTag}
                                    />
                                    <View style={styles.contentContainer}>
                                        <View style={styles.subContentContainer}>
                                            <Content
                                                title='License'
                                                content={item.license}
                                            />
                                            <Content
                                                title='Zone'
                                                content={item.zone}
                                            />
                                        </View>
                                        <View style={styles.subContentContainer}>
                                            <Content
                                                title='Slot'
                                                content={item.slot}
                                            />
                                            <Content
                                                title='Status'
                                                content={item.status}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </Header>
    );
};

const status = StyleSheet.create({
    book: {
        marginLeft: 5,
        height: 90,
        width: 4,
        borderRadius: 2,
        backgroundColor: '#00AB66'
    },
    park: {
        marginLeft: 5,
        height: 90,
        width: 4,
        borderRadius: 2,
        backgroundColor: '#0099CC'
    },
    cancel: {
        marginLeft: 5,
        height: 90,
        width: 4,
        borderRadius: 2,
        backgroundColor: '#FF3333'
    },
    expire: {
        marginLeft: 5,
        height: 90,
        width: 4,
        borderRadius: 2,
        backgroundColor: '#FF9933'
    },
    driveOut: {
        marginLeft: 5,
        height: 90,
        width: 4,
        borderRadius: 2,
        backgroundColor: '#666666'
    },
});

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
        height: 110
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
    },
    contentContainer: {
        flexDirection: 'row'
    },
    subContentContainer: {
        flex: 1
    }
});

export default HistoryDetailScreen;
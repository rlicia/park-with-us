import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, RefreshControl } from 'react-native';
import { NavigationEvents } from '@react-navigation/compat';

import { Context as AuthContext } from '../../../contexts/AuthContext';
import { Context as TransactionContext } from '../../../contexts/TransactionContext';

import Header from '../../../components/Header';

const ZoneScreen = ({ navigation }) => {
    const { state: authState, refresh } = useContext(AuthContext);
    const { state: transactionState, fetchZones, refreshZones, clearZoneList, initialRefreshTransaction } = useContext(TransactionContext);

    return (
        <Header
            title='Select Zone'
            backButton='License'
            transactionScreen={true}
        >
            <NavigationEvents
                onWillFocus={() => fetchZones()}
                onWillBlur={clearZoneList}
            />
            <View style={styles.topContainer}>
                <View style={styles.licenseContainer}>
                    <Text style={styles.licenseTitle}>License:</Text>
                    <Text style={styles.license}>{transactionState.license}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.detailTitle}>Tier:</Text>
                    <Text style={styles.detail}>{authState.account.tier}</Text>
                </View>
            </View>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={transactionState.refreshing || authState.refreshing}
                        onRefresh={() => {
                            refreshZones();
                            refresh();
                            initialRefreshTransaction();
                    }} />
                }
                data={transactionState.zoneList}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableHighlight
                            style={styles.listItemContainer}
                            underlayColor='#00000030'
                            onPress={() => navigation.navigate('Slot', { zone: item })}
                        >
                            <View style={styles.listItem}>
                                <View style={styles.listTitleContainer}>
                                    <Text style={styles.listTitle}>
                                        {item.tierName}
                                    </Text>
                                </View>
                                <View style={styles.availableContainer}>
                                    <Text style={styles.availableTitle}>
                                        Available:
                                    </Text>
                                    <Text style={styles.slotAvailable}>
                                        {item.slotAvailable}
                                    </Text>
                                </View>
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
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginHorizontal: 15
    },
    licenseContainer: {
        flexDirection: 'row',
        paddingBottom: 5
    },
    licenseTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    license: {
        fontSize: 18,
        paddingLeft: 5
    },
    detailContainer: {
        flexDirection: 'row'
    },
    detailTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    detail: {
        fontSize: 18,
        paddingLeft: 5
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
        flex: 7,
        paddingLeft: 10
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    availableContainer: {
        flex: 3,
        flexDirection: 'row'
    },
    availableTitle: {
        fontWeight: 'bold'
    },
    slotAvailable: {
        fontWeight: 'bold',
        color: '#00AB66',
        paddingLeft: 5
    }
});

export default ZoneScreen;

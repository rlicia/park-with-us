import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { NavigationEvents } from '@react-navigation/compat';

import { Context as AuthContext } from '../../../contexts/AuthContext';
import { Context as TransactionContext} from '../../../contexts/TransactionContext';

import Header from '../../../components/Header';
import BookingTime from '../../../components/BookingTime';

const TransactionScreen = () => {
    const { refreshing } = useContext(AuthContext);
    const { state, loadTransaction, clearTransaction } =useContext(TransactionContext);

    return (
        <Header
            title='Booking Detail'
        >
            <NavigationEvents
                onWillFocus={() => loadTransaction()}
                onWillBlur={clearTransaction}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={state.loading ? true : false}
                        onRefresh={() => {
                            refreshing();
                            loadTransaction();
                    }} />
                }
            >
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <View style={styles.detailContainer}>
                            <Text style={styles.detailTitle}>License:</Text>
                            <Text style={styles.detailContent}>{state.transaction.license}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.detailTitle}>Zone:</Text>
                            <Text style={styles.detailContent}>{state.transaction.zone}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.detailTitle}>Slot:</Text>
                            <Text style={styles.detailContent}>{state.transaction.slot}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.detailTitle}>Booked at:</Text>
                            <Text style={styles.detailContent}>{state.transaction.createdAt}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.detailTitle}>Status:</Text>
                            <Text style={styles.detailContent}>{state.transaction.statusWord}</Text>
                        </View>
                    </View>
                    {state.transaction.status === 1 ?
                        <BookingTime
                            expiredTime={state.transaction.expiredAt}
                        />
                    : null}
                </View>
            </ScrollView>
        </Header>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 10
    },
    mainContainer: {
        paddingBottom: 5
    },
    detailContainer: {
        paddingVertical: 2
    },
    detailTitle: {
        fontSize: 18,
        paddingBottom: 1
    },
    detailContent: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingLeft: 15
    }
});

export default TransactionScreen;

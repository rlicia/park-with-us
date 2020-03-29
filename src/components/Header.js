import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withNavigation, NavigationEvents } from '@react-navigation/compat';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Context as AuthContext } from '../contexts/AuthContext';
import { Context as TransactionContext } from '../contexts/TransactionContext';

const Content = ({ loading, content1, content2 }) => {
    const { refreshing } = useContext(AuthContext);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => {
                        refreshing();
                }} />
            }
        >
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {content1}
                </Text>
                <Text style={styles.text}>
                    {content2}
                </Text>
            </View>
        </ScrollView>
    );
};

const Header = ({ navigation, title, backButton, headerRight, children, disableActivation, userScreen, loginScreen, transactionScreen }) => {
    const { state, initialRefreshing } = useContext(AuthContext);
    const { initialRefreshTransaction } = useContext(TransactionContext);

    return (
        <>
            <NavigationEvents
                onWillFocus={() => {
                    if (!loginScreen) {
                        initialRefreshing();
                        if (transactionScreen) {
                            initialRefreshTransaction();
                        }
                    }
                }}
            />
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>
                        {backButton ?
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => navigation.goBack()}
                            >
                                <Icon name='chevron-left' size={26} />
                            </TouchableOpacity>
                        : null}
                    </View>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>
                            {title}
                        </Text>
                    </View>
                    <View style={styles.headerRight}>
                        {headerRight}
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    {
                        disableActivation ? children
                        : state.account.accountStatus === 1 ? userScreen ?
                        state.account.status === 0 ? children
                        : <Content
                            loading={state.loading ? true : false}
                            content1='This screen is for ADMIN only.'
                        /> : children
                        : <Content
                            loading={state.loading ? true : false}
                            content1='Your account is deactivated.'
                            content2='Please contact administrator.'
                        />
                    }
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#00AB66',
        paddingBottom: 0
    },
    headerContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerLeft: {
        flex: 1
    },
    backButton: {
        alignItems: 'center'
    },
    headerCenter: {
        flex: 5,
        alignItems: 'center'
    },
    headerRight: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    textContainer: {
        marginVertical: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5
    }
});

export default withNavigation(Header);
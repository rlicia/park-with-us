import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, AppState, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withNavigation, NavigationEvents } from '@react-navigation/compat';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from "@react-native-community/netinfo";
const { height } = Dimensions.get('window');

import { Context as AuthContext } from '../contexts/AuthContext';
import { Context as TransactionContext } from '../contexts/TransactionContext';

const Content = ({ loading, content1, content2 }) => {
    const { refresh } = useContext(AuthContext);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => {
                        refresh();
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
    const { state, initialRefresh } = useContext(AuthContext);
    const { initialRefreshTransaction } = useContext(TransactionContext);
    const [networkError, setNetworkError] = useState(false);

    const unsubscribe = NetInfo.addEventListener(state => {
        console.log("Is Internet Reachable?", state.isInternetReachable);
        console.log("Is connected?", state.isConnected);
        if (!state.isInternetReachable && !state.isConnected && networkError === false) {
            setNetworkError(true);
        } else if (state.isInternetReachable && state.isConnected && networkError === true) {
            setNetworkError(false);
        }
    });
    unsubscribe();

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    const _handleAppStateChange = (nextAppState, networkError) => {
        if (nextAppState === 'active') {
            NetInfo.fetch().then(state => {
                console.log("Is Internet Reachable?", state.isInternetReachable);
                console.log("Is connected?", state.isConnected);
                if (!state.isInternetReachable && !state.isConnected && networkError === false) {
                    setNetworkError(true);
                } else if (state.isInternetReachable && state.isConnected && networkError === true) {
                    setNetworkError(false);
                }
            });
            console.log("App is in Active Foreground Mode.")
        }
    };

    return (
        <>
            <Modal
                transparent={true}
                animationType='fade'
                visible={networkError}
            >
                <View style={modal.container}>
                    <View style={modal.header}>
                        <Text style={modal.headerText}>No Internet Connection</Text>
                    </View>
                    <View style={modal.retryContainer}>
                        <TouchableOpacity
                            style={modal.retry}
                            onPress={() => {
                                NetInfo.fetch().then(state => {
                                    console.log("Is Internet Reachable?", state.isInternetReachable);
                                    console.log("Is connected?", state.isConnected);
                                    if (!state.isInternetReachable || !state.isConnected) {
                                        setNetworkError(true);
                                    } else if (state.isInternetReachable && state.isConnected) {
                                        setNetworkError(false);
                                    }
                                });
                            }}
                        >
                            <Text style={modal.retryText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <NavigationEvents
                onWillFocus={() => {
                    if (!loginScreen) {
                        initialRefresh();
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

const modal = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000050'
    },
    header: {
        height: Platform.OS === 'ios' ? 100 : 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: Platform.OS === 'ios' ? 'flex-end' : 'center',
        paddingBottom: Platform.OS === 'ios' ? 15 : 0
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    retryContainer: {
        flex: 1,
        alignItems: 'center'
    },
    retry: {
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height*0.4,
        width: 100,
        height: 40,
        borderRadius: 5,
        backgroundColor: 'gray',
        borderColor: '#00000060'
    },
    retryText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

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
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withNavigation } from '@react-navigation/compat';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Context as AuthContext } from '../contexts/AuthContext';

const Header = ({ navigation, title, backButton, headerRight, children, disableActivation, userScreen }) => {
    const { state: { account } } = useContext(AuthContext);

    return (
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
                    : account.accountStatus === 1 ? userScreen ?
                    account.status === 0 ? children
                    : <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            This screen is for ADMIN only.
                        </Text>
                    </View> : children
                    : <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            Your account is deactivated.
                        </Text>
                        <Text style={styles.text}>
                            Please contact administrator.
                        </Text>
                    </View>
                }
            </View>
        </SafeAreaView>
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
        flex: 1,
        alignItems: 'center'
    },
    headerCenter: {
        flex: 5,
        alignItems: 'center'
    },
    headerRight: {
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
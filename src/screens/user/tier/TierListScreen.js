import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { NavigationEvents } from '@react-navigation/compat';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Context as AuthContext } from '../../../contexts/AuthContext';
import { Context as TierContext } from '../../../contexts/TierContext';

import Header from '../../../components/Header';

const TierListScreen = ({ navigation, route }) => {
    const { state: authState, refresh } = useContext(AuthContext);
    const { state, fetchTiers, refreshTiers, clearTierData } = useContext(TierContext);
    const status = route.params.status;

    return (
        <Header
            title='Tier List'
            userScreen={true}
            backButton='TierHome'
            headerRight={
                (authState.account.permissions.indexOf('create_edit_client_tier') > -1 && status === 1) ||
                (authState.account.permissions.indexOf('create_edit_user_tier') > -1 && status === 0) ?
                    <TouchableOpacity 
                        style={{ flex: 1, alignItems: 'center' }}
                        onPress={() => {
                            navigation.navigate('CreateTier', { status });
                        }}
                    >
                        <Icon name='plus' size={26} />
                    </TouchableOpacity>
                : null
            }
        >
            <NavigationEvents
                onWillFocus={() => fetchTiers({ status })}
                onWillBlur={clearTierData}
            />
            <View style={styles.tierCount}>
                <Text style={styles.tierCountText}>Total: {state.tier ? state.tier.length !== 0 ? state.tier.length-1 : 0 : null}</Text>
            </View>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={state.refreshing || authState.refreshing}
                        onRefresh={() => {
                            refreshTiers({ status });
                            refresh();
                        }} />
                }
                data={state.tier}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.listItemContainer}>
                            <View style={styles.listItem}>
                                <View style={styles.listTitleContainer}>
                                    <Text style={styles.listTitle}>
                                        {item.tierName}
                                    </Text>
                                    <Text style={styles.listLevel}>
                                        Level: {item.tierLevel}
                                    </Text>
                                </View>
                                {item.tierLevel !== 0 ?
                                    (authState.account.permissions.indexOf('create_edit_client_tier') > -1 && status === 1) ||
                                    (authState.account.permissions.indexOf('create_edit_user_tier') > -1 && status === 0) ?
                                        <TouchableOpacity
                                            style={styles.listIcon}
                                            onPress={() => navigation.navigate('EditTier', { item, status })}
                                        >
                                            <Icon name='pencil' size={20} />
                                        </TouchableOpacity>
                                    : null
                                : null}
                            </View>
                        </View>
                    );
                }}
            />
        </Header>
    );
};

const styles = StyleSheet.create({
    tierCount: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        justifyContent: 'center',
        marginHorizontal: 15
    },
    tierCountText: {
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
    },
    listLevel: {
        marginTop: 2
    },
    listIcon: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 10
    }
});

export default TierListScreen;

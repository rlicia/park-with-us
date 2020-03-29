import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-elements';

import { Context as ParkingContext } from '../../../contexts/ParkingContext';
 
import Header from '../../../components/Header';
import { NavigationEvents } from '@react-navigation/compat';

const SlotUpdatedScreen = ({ navigation }) => {
    const { state } = useContext(ParkingContext);

    return (
        <Header
            title='Slot Updated'
            userScreen={true}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Completely Updated</Text>
                <View style={styles.mainContainer}>
                    <View style={styles.mainTitleContainer}>
                        <Text style={styles.mainTitle}>Increase: (slot)</Text>
                    </View>
                    <FlatList
                        scrollEnabled={false}
                        data={state.updateDetails.add}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.listItemContainer}>
                                    <View style={styles.listItem}>
                                        <View style={styles.listTitleContainer}>
                                            <Text style={styles.listTitle}>
                                                {item.zoneName}
                                            </Text>
                                            <Text style={styles.listLevel}>
                                                Level: {item.zoneLevel}
                                            </Text>
                                        </View>
                                        <View style={styles.slotContainer}>
                                            <Text style={styles.slotIncrease}>{item.difference}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={styles.spacer} />
                <View style={styles.mainContainer}>
                    <View style={styles.mainTitleContainer}>
                        <Text style={styles.mainTitle}>Decrease: (slot)</Text>
                    </View>
                    <FlatList
                        scrollEnabled={false}
                        data={state.updateDetails.remove}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.listItemContainer}>
                                    <View style={styles.listItem}>
                                        <View style={styles.listTitleContainer}>
                                            <Text style={styles.listTitle}>
                                                {item.zoneName}
                                            </Text>
                                            <Text style={styles.listLevel}>
                                                Level: {item.zoneLevel}
                                            </Text>
                                        </View>
                                        <View style={styles.slotContainer}>
                                            <Text style={styles.slotDecrease}>{Math.abs(item.difference)}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
                <Button
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    title='Go Back'
                    onPress={() => navigation.navigate('UserHome')}
                />
            </View>
        </Header>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    title: {
        marginBottom: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#00AB66'
    },
    mainContainer: {
        marginVertical: 5
    },
    mainTitleContainer: {
        borderBottomWidth: 1,
        paddingBottom: 3,
        paddingLeft: 5
    },
    mainTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    spacer: {
        marginVertical: 10
    },
    listItemContainer: {
        height: 60
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#D4D4D4',
        alignItems: 'center'
    },
    listTitleContainer: {
        flex: 8,
        paddingLeft: 10
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    listLevel: {
        marginTop: 2
    },
    slotContainer: {
        flex: 2,
        alignItems: 'center'
    },
    slotIncrease: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00AB66'
    },
    slotDecrease: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red'
    },
    buttonContainer: {
        marginHorizontal: 30,
        marginVertical: 30
    },
    button: {
        height: 50,
        backgroundColor: '#00AB66',
        borderRadius: 25
    },
    buttonTitle: {
        fontWeight: 'bold'
    }
});

export default SlotUpdatedScreen;

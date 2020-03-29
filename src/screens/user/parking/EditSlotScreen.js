import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Keyboard, RefreshControl } from 'react-native';
import { NavigationEvents } from '@react-navigation/compat';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Context as ParkingContext } from '../../../contexts/ParkingContext';

import Header from '../../../components/Header';

const EditSlotScreen = () => {
    const { state, fetchSlots, editCountInput, increaseOrDecrease, updateSlots, clearSlotData, clearErrorMessage } = useContext(ParkingContext);
    let totalCount = 0;
    for(i=0; i<state.slotCount.length; i++) {
        totalCount += Number(state.slotCount[i]);
    }

    return (
        <Header
            title='Slot'
            userScreen={true}
            backButton='UserHome'
        >
            <NavigationEvents
                onWillFocus={fetchSlots}
                onWillBlur={() => {
                    clearSlotData();
                    clearErrorMessage();
                }}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.total}>Total</Text>
                <Text style={styles.totalCount}>{totalCount}</Text>
            </View>
            <View>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={state.loading ? true : false} onRefresh={() => fetchSlots()} />
                    }
                    data={state.slot}
                    keyboardShouldPersistTaps='always'
                    keyExtractor={item => item._id}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.listItem}>
                                <View style={styles.listTitleContainer}>
                                    <Text style={styles.listTitle}>
                                        {item.zoneName}
                                    </Text>
                                    <Text style={styles.listLevel}>
                                        Level: {item.zoneLevel}
                                    </Text>
                                </View>
                                <View style={styles.countContainer}>
                                    <TouchableOpacity
                                        style={styles.caretLeftButton}
                                        onPress={() => increaseOrDecrease({ count: state.slotCount, index, direction: -1 })}
                                    >
                                        <Icon name='caret-left' size={35} />
                                    </TouchableOpacity>
                                    <View style={{ flex: 1 }}>
                                        <Input
                                            autoCorrect={false}
                                            keyboardType='number-pad'
                                            value={state.slotCount[index]}
                                            onChangeText={(text) => {
                                                editCountInput({ text, count: state.slotCount, index })
                                            }}
                                            inputContainerStyle={styles.inputContainerStyle}
                                            inputStyle={styles.inputStyle}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style={styles.caretRightButton}
                                        onPress={() => increaseOrDecrease({ count: state.slotCount, index, direction: 1 })}
                                    >
                                        <Icon name='caret-right' size={35} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
            {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
            <Button
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}
                containerStyle={styles.buttonContainer}
                title='Save'
                onPress={() => {
                    Keyboard.dismiss();
                    updateSlots({ count: state.slotCount });
                }}
            />
        </Header>
    );
};

const styles = StyleSheet.create({
    totalContainer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        marginHorizontal: 15,
    },
    total: {
        flex: 7,
        fontSize: 16,
        fontWeight: 'bold'
    },
    totalCount: {
        flex: 3,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    listItem: {
        flexDirection: 'row',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#D4D4D4',
        marginHorizontal: 15,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    listTitleContainer: {
        flex: 7
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    listLevel: {
        marginTop: 2
    },
    countContainer: {
        flex: 3,
        flexDirection: 'row'
    },
    inputcontainerStyle: {
        borderColor: '#D4D4D4'
    },
    inputStyle: {
        fontSize: 20,
        textAlign: 'center'
    },
    caretRightButton: {
        paddingLeft: 3
    },
    caretLeftButton: {
        paddingRight: 3
    },
    errorMessage: {
        marginHorizontal: 10,
        fontSize: 16,
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

export default EditSlotScreen;

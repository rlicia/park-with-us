import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Context as TransactionContext } from '../contexts/TransactionContext';

const Slot = ({ status, name }) => {
    const { state, selectSlot } = useContext(TransactionContext);
    
    return (
        status === 0 || status === 1 ?
            status === 0 ? <TouchableOpacity style={state.selectedSlot === name ? slot.select : slot.empty} onPress={() => selectSlot({ name })}>
            {state.selectedSlot === name ?  <View style={slot.container}>
                                                <Text style={slot.name}>{name}</Text>
                                                <Icon name='car' size={30} />
                                            </View> : 
                                            <View style={slot.container}>
                                                <Text style={slot.name}>{name}</Text>
                                            </View>
            }
        </TouchableOpacity> : <View style={slot.reserve}>
            <View style={slot.container}>
                <Text style={slot.name}>{name}</Text>
            </View>
        </View> : <View style={slot.lock}>
            <View style={slot.container}>
                <Text style={slot.name}>{name}</Text>
            </View>
        </View>
    );
};

const slot = StyleSheet.create({
    empty: {
        flex: 1,
        borderWidth: 1,
        height: 90
    },
    lock: {
        backgroundColor: 'gray',
        flex: 1,
        borderWidth: 1,
        height: 90
    },
    reserve: {
        backgroundColor: 'red',
        flex: 1,
        borderWidth: 1,
        height: 90
    },
    select: {
        backgroundColor: '#00AB66',
        flex: 1,
        borderWidth: 1,
        height: 90
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 5
    }
});

const ParkingMap = () => {
    const { state } = useContext(TransactionContext);
    let status = state.slotsStatus;
    let name = state.slotsName;

    return (
        <View style={styles.container}>
            <View style={styles.entranceContainer}>
                <Text style={styles.entrance}>ENTRANCE</Text>
            </View>
            <View style={styles.parkingMapContainer}>
                <View style={styles.slotContainer}>
                    <Slot status={status[1]} name={name[1]} />
                    <Slot status={status[2]} name={name[2]} />
                    <Slot status={status[3]} name={name[3]} />
                </View>
                <View style={styles.road} />
                <View style={styles.slotContainer}>
                    <Slot status={status[4]} name={name[4]} />
                    <Slot status={status[5]} name={name[5]} />
                    <Slot status={status[6]} name={name[6]} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 20
    },
    entranceContainer: {
        alignItems: 'center',
        marginBottom: 10
    },
    entrance: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    parkingMapContainer: {
        paddingHorizontal: 100
    },
    slotContainer: {
        flexDirection: 'row',
        borderWidth: 1
    },
    road: {
        paddingVertical: 15
    }
});

export default ParkingMap;
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationEvents } from '@react-navigation/compat';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';

import { Context as TierContext } from '../../../contexts/TierContext';

import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import InputForm from '../../../components/InputForm';

const EditTierScreen = ({ route }) => {
    const { state, fetchTiers, editTier, deleteTier, clearTierData, clearErrorMessage } = useContext(TierContext);
    const tier = route.params.item;
    const status = route.params.status;
    const [tierName, setTierName] = useState(tier.tierName);
    const [order, setOrder] = useState(null)
    const [orderTierLevel, setOrderTierLevel] = useState('');
    let pickerData = [];
    for (i=0; i<state.tier.length-1; i++) { // minus -1 = not show not assigned tier
        pickerData.push({ label: state.tier[i].tierName, value: state.tier[i].tierLevel });
    }
    
    return (
        <Header
            title='Edit Tier'
            userScreen={true}
            backButton='TierList'
            headerRight={
                <TouchableOpacity
                    style={{ flex: 1, alignItems: 'center' }}
                    onPress={() => deleteTier({ status, id: tier._id })}
                >
                    <Icon name='trash' size={22} />
                </TouchableOpacity>
            }
        >
            <NavigationEvents
                onWillFocus={() => fetchTiers({ status })}
                onWillBlur={() => {
                    clearErrorMessage();
                    clearTierData();
                }}
            />
            <Loader
                loading={state.loading ? true : false}
            />
            <KeyboardAwareScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='always'
            >
                <InputForm
                    label={<Text style={styles.inputLabel}>Tier Name*</Text>}
                    placeholder='Tier Name*'
                    value={tierName}
                    onChangeText={setTierName}
                />
                <Text style={styles.pickerTitle}>Select Order</Text>
                <View style={styles.pickerContainer}>
                    <View style={styles.orderPicker}>
                        <RNPickerSelect 
                            style={pickerSelectStyles}
                            onValueChange={value => setOrder(value)}
                            placeholder={{ label: 'Order...', value: null}}
                            items={[
                                { label: 'After', value: 1 },
                                { label: 'Before', value: 0 }
                            ]}
                        />
                    </View>
                    <View style={styles.tierPicker}>
                        <RNPickerSelect 
                            style={pickerSelectStyles}
                            onValueChange={value => setOrderTierLevel(value)}
                            placeholder={{ label: 'Select Tier...', value: null}}
                            items={pickerData}
                        />
                    </View>
                </View>
                {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
                <Button
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    title='Save'
                    onPress={() => {
                        Keyboard.dismiss();
                        editTier({ id: tier._id, tierName, order, orderTierLevel, status });
                    }}
                />
            </KeyboardAwareScrollView>
        </Header>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      color: 'black'
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      color: 'black'
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 15
    },
    inputLabel: {
        color: '#00AB66'
    },
    pickerTitle: {
        margin: 10
    },
    pickerContainer: {
        flexDirection: 'row',
        marginHorizontal: 5,
        marginBottom: 10
    },
    orderPicker: {
        flex: 3
    },
    tierPicker: {
        flex: 8
    },
    errorMessage: {
        marginHorizontal: 10,
        fontSize: 16,
        color: 'red'
    },
    buttonContainer: {
        marginHorizontal: 15,
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

export default EditTierScreen;

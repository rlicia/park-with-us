import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const LicenseScreen = ({ navigation }) => {
    return (
        <View>
            <Text>License Screen</Text>
            <Button title="Click" onPress={() => navigation.navigate('Zone')} />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default LicenseScreen;
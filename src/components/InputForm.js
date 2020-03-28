import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const InputForm = ({ label, placeholder, secureTextEntry, editable, keyboardType, value, onChangeText, inputStyle }) => {
    return (
        <Input
            label={value ? label : <Text> </Text>}
            placeholder={placeholder}
            placeholderTextColor='#D4D4D4'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={secureTextEntry}
            editable={editable}
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            inputContainerStyle={styles.inputContainer}
            inputStyle={inputStyle}
        />
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        borderColor: '#D4D4D4',
        marginBottom: 10
    }
});

export default InputForm;
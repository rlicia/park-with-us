import React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const CheckBoxForm = ({ title, checked, onCheck }) => {
    return (
        <CheckBox 
            title={title}
            checkedIcon='circle'
            uncheckedIcon='circle-o'
            checkedColor='#00AB66'
            checked={checked}
            onPress={onCheck}
            size={32}
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.checkBoxText}
        />
    );
};

const styles = StyleSheet.create({
    checkBoxContainer: {
        backgroundColor: null,
        borderWidth: 0,
        padding: 0
    },
    checkBoxText: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'black',
        margin: 0
    }
});

export default CheckBoxForm;
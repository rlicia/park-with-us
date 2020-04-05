import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { Context as TierContext } from '../contexts/TierContext';

const CheckPermission = ({ title, value }) => {
    const { state, selectPermissions } = useContext(TierContext);

    return (
        <CheckBox
            title={title}
            checkedIcon='square'
            uncheckedIcon='square-o'
            checkedColor='#00AB66'
            checked={state.permissions.indexOf(value) === -1 ? false : true}
            onPress={() => {
                let permissions = state.permissions;
                const index = state.permissions.indexOf(value);
                if (index === -1) {
                    permissions.push(value);
                } else {
                    permissions.splice(index, 1);
                }
                selectPermissions(permissions);
            }}
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.checkBoxText}
        />
    );
};

const Permissions = () => {
    return (
        <View>
            <Text style={styles.permissionTitle}>Select Permissions</Text>
            <View style={styles.permissionContainer}>
                <CheckPermission
                    title='Edit Parking Slot'
                    value='edit_parking'
                />
                <CheckPermission
                    title='Search Client Account'
                    value='search_client_account'
                />
                <CheckPermission
                    title='Edit Client RFID Tag'
                    value='edit_client_rfid_tag'
                />
                <CheckPermission
                    title='Edit Client Tier'
                    value='edit_client_tier'
                />
                <CheckPermission
                    title='Edit Client Activation Status'
                    value='edit_client_status'
                />
                <CheckPermission
                    title='Search User Account'
                    value='search_user_account'
                />
                <CheckPermission
                    title='Edit User Tier'
                    value='edit_user_tier'
                />
                <CheckPermission
                    title='Edit User Activation Status'
                    value='edit_user_status'
                />
                <CheckPermission
                    title='Search Client Tier'
                    value='search_client_tier'
                />
                <CheckPermission
                    title='Create and Edit Client Tier'
                    value='create_edit_client_tier'
                />
                <CheckPermission
                    title='Search User Tier'
                    value='search_user_tier'
                />
                <CheckPermission
                    title='Create and Edit User Tier'
                    value='create_edit_user_tier'
                />
                <CheckPermission
                    title='Create User Account'
                    value='create_user_account'
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    permissionTitle: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold'
    },
    permissionContainer: {
        marginHorizontal: 15
    },
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

export default Permissions;
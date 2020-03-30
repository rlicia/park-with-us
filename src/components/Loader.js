import React from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';

const Loader = ({ title, loading }) => {
    return (
        <Modal
            transparent={true}
            animationType='none'
            visible={loading}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndivatorWrapper}>
                    <ActivityIndicator animating={loading} color='white' />
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000050'
    },
    activityIndivatorWrapper: {
        backgroundColor: '#00000099',
        height: 100,
        width: 200,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 20
    },
    title: {
        color: 'white'
    }
});

export default Loader;
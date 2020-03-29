import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

const Loader = ({ loading }) => {
    return (
        <ActivityIndicator
            style={styles.activityIndicator}
            animating={loading ? true: false}
            color='black'
            size='large'
        />
    );
};

const styles = StyleSheet.create({
    activityIndicator: {
        position: 'absolute',
        ...StyleSheet.absoluteFillObject
    }
});

export default Loader;
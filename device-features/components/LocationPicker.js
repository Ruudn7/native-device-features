import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    ActivityIndicator,
    Alert,
    StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors'
import MapPreview from './MapPreveiw';


const LocationPicker = props => {
    const [pickedLocation, setPickedLoaction] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.',
                [{
                    text: 'Okay'
                }]
            );
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            })
            console.log(location)
            setPickedLoaction({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        } catch (err) {
            console.log(err)
            Alert.alert(
                'Could not fetch location!',
                'Please try again later or pick a location on the map',
                [{ text: 'Okay' }]
            )
        }
        setIsFetching(false);
    };

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation}>
                {isFetching
                    ? <ActivityIndicator  size='large' color={Colors.primary} />
                    : <Text>No location chosen yet!</Text>
                }       
            </MapPreview>
            <Button
                title='Get User Location'
                color={Colors.primary}
                onPress={getLocationHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1
    }
})

export default LocationPicker;
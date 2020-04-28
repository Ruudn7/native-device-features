import * as FileSystem from 'expo-file-system';
import { insertPlace } from '../helpers/db'
export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const newPatch = FileSystem.documentDirectory + fileName;
        console.log(newPatch)
        try {

            await FileSystem.moveAsync({
                from: image,
                to: newPatch
            });

            const dbResult = await insertPlace(
                title,
                newPatch,
                'Dummy adress',
                15.6,
                12.3
            )

            dispatch({ 
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPatch
                }
            })
        } catch (err) {
            console.log(err);
            throw err;
        }

    }

}
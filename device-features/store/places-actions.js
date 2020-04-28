import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const newPatch = FileSystem.documentDirectory + fileName;

        try {
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    title: title,
                    image: image
                }
            })
        } catch (err) {
            console.log(err);
            throw err;
        }

        dispatch({
            type: ADD_PLACE,
            placeData: {
                title: title,
                image: newPatch
            }
        })
    }

}
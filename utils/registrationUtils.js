import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveRegistrationProgress = async (screenName, data) => {
    try{
        const key = `registration_progress_${screenName}`;
        await AsyncStorage.setItem(key, JSON.stringify(data));
        console.log(`Progress saved for screen ${screenName}`)
    }
    catch(err){
        console.log('Error saving the progress',err);
    }
}

export const getRegistrationProgress = async (screenName) => {
    try{
        const key = `registration_progress_${screenName}`;
        const data = await AsyncStorage.getItem(key);
        return data !== null ? JSON.parse(data) : null;
    }
    catch(err){
        console.log('Error retrieving the progress', err);
    }
}
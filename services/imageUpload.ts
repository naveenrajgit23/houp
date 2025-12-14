import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

// Note: For image upload, you'll need to get a free API key from ImgBB
// Sign up at: https://api.imgbb.com/
const IMGBB_API_KEY = 'YOUR_IMGBB_API_KEY'; // User needs to replace this

export const imageUpload = {
    async pickImage(): Promise<string | null> {
        try {
            // Request permission
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to upload images!');
                return null;
            }

            // Pick image
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.7, // Compress to reduce upload size
            });

            if (!result.canceled && result.assets[0]) {
                return result.assets[0].uri;
            }

            return null;
        } catch (error) {
            console.error('Error picking image:', error);
            return null;
        }
    },

    async takePhoto(): Promise<string | null> {
        try {
            // Request camera permission
            const { status } = await ImagePicker.requestCameraPermissionsAsync();

            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to take photos!');
                return null;
            }

            // Launch camera
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.7, // Compress to reduce upload size
            });

            if (!result.canceled && result.assets[0]) {
                return result.assets[0].uri;
            }

            return null;
        } catch (error) {
            console.error('Error taking photo:', error);
            return null;
        }
    },

    async uploadImage(imageUri: string): Promise<string | null> {
        try {
            // If no API key is set, return local URI
            if (IMGBB_API_KEY === 'YOUR_IMGBB_API_KEY') {
                console.warn('ImgBB API key not set. Using local URI.');
                return imageUri;
            }

            // Convert image to base64
            const response = await fetch(imageUri);
            const blob = await response.blob();

            const reader = new FileReader();
            const base64Promise = new Promise<string>((resolve, reject) => {
                reader.onloadend = () => {
                    const base64 = reader.result as string;
                    resolve(base64.split(',')[1]); // Remove data:image/jpeg;base64, prefix
                };
                reader.onerror = reject;
            });
            reader.readAsDataURL(blob);

            const base64Image = await base64Promise;

            // Upload to ImgBB
            const formData = new FormData();
            formData.append('image', base64Image);

            const uploadResponse = await axios.post(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: 30000, // 30 second timeout,
                }
            );

            if (uploadResponse.data && uploadResponse.data.data && uploadResponse.data.data.url) {
                return uploadResponse.data.data.url;
            }

            return null;
        } catch (error) {
            console.error('Error uploading image:', error);
            // Return local URI as fallback
            return imageUri;
        }
    },
};

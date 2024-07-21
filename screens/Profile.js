import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { getUserProfile } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonPrimary } from "../components/ButtonUi";

const Profile = ({ navigation }) => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                navigation.navigate('SignIn');
                return;
            }
            const userData = await getUserProfile(userId);
            setProfileData(userData);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const SignOut = async () => {
        try {
            await AsyncStorage.removeItem('userId');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert('Sign Out Failed', 'An error occurred during sign out.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Text style={styles.heading}>Profile</Text>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileText}>Name: {profileData?.name}</Text>
                    <Text style={styles.profileText}>Email: {profileData?.email}</Text>
                    <Text style={styles.profileText}>Joined: {profileData ? formatDate(new Date(profileData.created_at)) : 'N/A'}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <ButtonPrimary onPress={SignOut}>
                        <Text style={styles.btnText}>Sign Out</Text>
                    </ButtonPrimary>
                </View>
            </View>
        </View>
    );
};

const formatDate = (date) => {
    if (!date) return 'N/A';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        padding: 15,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
    },
    profileContainer: {
        marginTop: 150,
    },
    profileInfo: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 12,
        padding: 15,
        paddingLeft: 25,
        borderRadius: 30,
        color: 'white',
    },
    profileText: {
        fontSize: 16,
        color: 'white',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    buttonContainer: {
        marginTop: 12,
    },
    btnText: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },
});

export default Profile;

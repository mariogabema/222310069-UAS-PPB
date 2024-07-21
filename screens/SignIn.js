import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, Image, SafeAreaView, Pressable, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonPrimary } from "../components/ButtonUi";
import { loginUser } from '../utils/api';

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('222310041@student.ibik.ac.id');
    const [password, setPassword] = useState('admin');

    const handleLogin = async () => {
        try {
            const credentials = { email, password };
            const data = await loginUser(credentials);
    
            Alert.alert('Success', 'Successfully Logged In.', [{ text: 'OK' }]);
            const userId = data.userId;
            await AsyncStorage.setItem('userId', JSON.stringify(userId));
    
            navigation.navigate('Main');
        } catch (error) {
            if (error.response.status === 400) {
                Alert.alert('Login Failed', 'Email or password is incorrect.');
            } else {
                Alert.alert('Login Failed', 'Server Error');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={false}/>
            <View style={ styles.headerSignin }>
                <View style={styles.header}>
                    <Image
                        source={require('../assets/book.png')}
                        style={styles.bookIcon}
                    />
                    <Text style={styles.headerText}>BukaCatatan</Text>
                </View>
                <View style={ styles.headerForm }>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                    <View>
                        <ButtonPrimary onPress={handleLogin}>
                            <Text style={{ ...styles.btnText, fontSize: 20 }}>Sign In</Text>
                        </ButtonPrimary>
                    </View>
                    <View style={styles.containerSignUp}>
                        <Text style={styles.signUpLabel}>
                            Don't have an account?
                        </Text>
                        <Pressable onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{ ...styles.signUpLabel, fontWeight: "bold", marginLeft: 4}}>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    headerSignin: {
        marginHorizontal: 30,        
    },
    bookIcon: {
        width: 24,
        height: 24,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
    },
    headerForm: {
        marginTop: 200,
    },
    input: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 12,
        padding: 15,
        paddingLeft: 25,
        borderRadius: 30,
        color: 'white',
    },
    btnText: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
    containerSignUp: {
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "right",
    },
    signUpLabel: {
        fontSize: 16,
        color: "white",
    },
});

export default SignIn;

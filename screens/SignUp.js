import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, Image, Pressable, SafeAreaView } from 'react-native';
import { addUser } from '../utils/api';
import { ButtonPrimary } from "../components/ButtonUi";

const SignUp = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            Alert.alert('Validation Error', 'All fields are required.');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9]+@student\.ibik\.ac\.id$/;
        if (!emailPattern.test(email)) {
            Alert.alert('Validation Error', 'Email must be a valid @student.ibik.ac.id address.');
            return;
        }

        try {
            await addUser({ name, email, password });
            Alert.alert('Success', 'Account created successfully.');
            navigation.navigate('SignIn');
        } catch (error) {
            Alert.alert('Error', 'Failed to create account.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerSignin}>
                <View style={styles.header}>
                    <Image
                        source={require('../assets/book.png')}
                        style={styles.bookIcon}
                    />
                    <Text style={styles.headerText}>BukaCatatan</Text>
                </View>
                <View style={ styles.headerForm }>
                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                        placeholderTextColor="white"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                        placeholderTextColor="white"
                    />
                    <View>
                        <ButtonPrimary onPress={handleSignUp}>
                            <Text style={{ ...styles.btnText, fontSize: 20 }}>Sign Up</Text>
                        </ButtonPrimary>
                    </View>
                    <View style={styles.containerSignIn}>
                        <Text style={styles.signInLabel}>
                            Already have an account?
                        </Text>
                        <Pressable onPress={() => navigation.navigate('SignIn')}>
                            <Text style={{ ...styles.signInLabel, fontWeight: "bold", marginLeft: 4}}>Sign In</Text>
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
        backgroundColor: "#000000",
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
    containerSignIn: {
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "right",
    },
    signInLabel: {
        fontSize: 16,
        color: "white",
    },
});

export default SignUp;

import { React, useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, SafeAreaView, Text, ScrollView, Image } from 'react-native';
import { addCheatsheet, editCheatsheet, getCheatsheetById } from '../utils/api';
import { ButtonPrimary } from "../components/ButtonUi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../components/Styles";


const Editor = ({ route, navigation }) => {
    const { categoryId, cheatsheetId } = route.params || {};
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (cheatsheetId) {
            fetchCheatsheet(cheatsheetId);
        }
    }, [cheatsheetId]);

    const fetchCheatsheet = async (id) => {
        try {
            const data = await getCheatsheetById(id);
            setTitle(data.title);
            setContent(data.content);
        } catch (error) {
            // console.error('Error fetching cheatsheet:', error);
        }
    };

    const saveCheatsheet = async () => {
        if (!title || !content) {
            Alert.alert('Validation Error', 'All fields are required.');
            return;
        }
        try {
            const userId = await AsyncStorage.getItem('userId');

            if (cheatsheetId) {
                await editCheatsheet(cheatsheetId, { title, content });
                Alert.alert('Success', 'Cheatsheet updated successfully.');
            } else {
                await addCheatsheet({ title, content, category_id: categoryId, user_id: userId });
                Alert.alert('Success', 'Cheatsheet added successfully.');
            }
            navigation.navigate('Detail', { categoryId });
        } catch (error) {
            // console.error('Error saving cheatsheet:', error);
            Alert.alert('Error', 'Failed to save cheatsheet.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View style={styles.header}>
                    <View style={styles.headerImage}>
                        <Image source={require('../assets/book.png')} style={styles.bookIcon} />
                        <Text style={styles.headerTextBook}>BukaCatatan</Text>
                    </View>
                    <View style={style.cheatsheetContainer}>
                        <View style={style.titleContainer}>
                            <Text style={style.cheatsheetTitle}>
                                {cheatsheetId ? 'Edit Cheatsheet' : 'Add Cheatsheet'}
                            </Text>
                        </View>
                        <TextInput
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                            style={[style.input, { marginBottom: 10 }]}
                        />
                        <TextInput
                            placeholder="Content"
                            value={content}
                            onChangeText={setContent}
                            style={[style.input, style.textArea]}
                            multiline
                        />
                        <View style={style.buttonContainer}>
                            <ButtonPrimary onPress={saveCheatsheet}>
                                <Text style={style.btnText}>
                                    SAVE
                                </Text>
                            </ButtonPrimary>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    cheatsheetContainer: {
        marginTop: 200,
        padding: 15,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 30,
    },
    cheatsheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    titleContainer: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: 'white',
        padding: 15,
        borderRadius: 30,
        color: 'white',
    },
    textArea: {
        height: 100,
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

export default Editor;

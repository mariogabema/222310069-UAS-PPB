import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Alert, Image, TextInput, SafeAreaView, Pressable } from 'react-native';
import { getCheatsheetsByCategory, deleteCheatsheet } from '../utils/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../components/Styles";

const Detail = ({ route, navigation }) => {
    const { categoryId } = route.params;
    const [cheatsheets, setCheatsheets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCheatsheets();
    }, []);

    const fetchCheatsheets = async () => {
        try {
            const data = await getCheatsheetsByCategory(categoryId);
            setCheatsheets(data);
        } catch (error) {
            console.error('Error fetching cheatsheets:', error);
        }
    };
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-GB');
    };
    const handleEdit = (cheatsheetId) => {
        navigation.navigate('Editor', { cheatsheetId, onGoBack: fetchCheatsheets });
    };


    const handleDelete = async (cheatsheetId) => {
        try {
            await deleteCheatsheet(cheatsheetId);
            Alert.alert('Success', 'Cheatsheet deleted successfully.');
            fetchCheatsheets();
        } catch (error) {
            console.error('Error deleting cheatsheet:', error);
            Alert.alert('Error', 'Failed to delete cheatsheet.');
        }
    };

    const renderCheatsheet = ({ item }) => (
        <View style={style.cheatsheetContainer}>
            <View style={style.titleContainer}>
                <Text style={style.cheatsheetTitle}>{item.title}</Text>
                <View style={style.iconsContainer}>
                    <Pressable onPress={() => handleEdit(item.cheatsheet_id)}>
                        <Icon name="edit" size={20} color="black" style={style.icon} />
                    </Pressable>
                    <Pressable onPress={() => handleDelete(item.cheatsheet_id)}>
                        <Icon name="trash" size={20} color="black" style={style.icon} />
                    </Pressable>
                </View>
            </View>
            <View style={style.infoContainer}>
                <Text style={style.createdInfo}>Created at: {formatDate(item.created_at)}</Text>
            </View>
            <Text style={style.cheatsheetContent}>{item.content}</Text>
        </View>
    );

    const Search = (query) => {
        setSearchQuery(query);
        const queryStr = query ? String(query).toLowerCase() : '';
        if (queryStr.trim()) {
            const filtered = cheatsheets.filter((cheatsheet) =>
                cheatsheet.title.toLowerCase().includes(queryStr) ||
                cheatsheet.content.toLowerCase().includes(queryStr)
            );
            setCheatsheets(filtered);
        } else {
            fetchCheatsheets();
        }
    };

    const renderCheatsheets = () => {
        return cheatsheets.map((item) => (
            <View key={item.cheatsheet_id} style={style.cheatsheetContainer}>
                <View style={style.titleContainer}>
                    <Text style={style.cheatsheetTitle}>{item.title}</Text>
                    <View style={style.iconsContainer}>
                        <Pressable onPress={() => handleEdit(item.cheatsheet_id)}>
                            <Icon name="edit" size={20} color="black" style={style.icon} />
                        </Pressable>
                        <Pressable onPress={() => handleDelete(item.cheatsheet_id)}>
                            <Icon name="trash" size={20} color="black" style={style.icon} />
                        </Pressable>
                    </View>
                </View>
                <View style={style.infoContainer}>
                    <Text style={style.createdInfo}>Created at: {formatDate(item.created_at)}</Text>
                </View>
                <Text style={style.cheatsheetContent}>{item.content}</Text>
            </View>
        ));
    };

    const Editor = () => {
        navigation.navigate('Editor', { categoryId });
    };

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View style={styles.header}>
                    <View style={styles.headerImage}>
                        <Image source={require('../assets/book.png')} style={styles.bookIcon} />
                        <Text style={styles.headerTextBook}>BukaCatatan</Text>
                    </View>
                    <View>
                        <TextInput
                            style={style.searchInput}
                            placeholder="Search..."
                            onChangeText={Search}
                            value={searchQuery}
                        />
                    </View>
                    <View style={style.headerList}>
                        <View>
                            <Text style={[style.headerText]}>All CheatSheet</Text>
                        </View>
                        {renderCheatsheets()}
                    </View>

                </View>
                <View style={style.addButtonContainer}>
                    <Pressable style={style.add} onPress={Editor}>
                        <Icon name="plus" size={24} color="black" />
                    </Pressable>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    headerText: {
        color: 'white',
        fontSize: 20,
        marginBottom: 5,
    },
    headerList: {
        marginTop: 50,
    },
    cheatsheetContainer: {
        backgroundColor: "white",
        marginBottom: 12,
        padding: 15,
        borderRadius: 30,
        color: 'white',
    },
    cheatsheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 2,
    },
    titleContainer: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cheatsheetContent: {
        fontSize: 12,
        color: 'black',
    },
    searchInput: {
        marginTop: 50,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 30,
        padding: 15,
        paddingLeft: 25,
        color: 'white',
    },
    searchIcon: {
        marginRight: 5,
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 10,
    },
    createdInfo: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 2,
    },
    infoContainer: {
        paddingBottom: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    addButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    add: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Detail;




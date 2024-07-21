import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Image, Pressable } from 'react-native';
import { getCategories } from '../utils/api';

const Category = ({ navigation }) => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    const renderCategory = ({ item }) => (
        <Pressable style={styles.categoryContainer} onPress={() => navigation.navigate('Detail', { categoryId: item.id })}>
            <Text style={styles.categoryText}>{item.name}</Text>
        </Pressable>
    );


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerCategory}>
                <View style={styles.header}>
                    <Image source={require('../assets/book.png')} style={styles.bookIcon} />
                    <Text style={styles.headerText}>BukaCatatan</Text>
                </View>
                <View style={styles.headerList}>
                    <FlatList
                        data={categories}
                        renderItem={renderCategory}
                    />
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
    headerCategory: {
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
    headerList: {
        marginTop: 200,
    },
    categoryContainer: {
        padding: 15,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 30,
        marginBottom: 12,
    },
    categoryText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});

export default Category;

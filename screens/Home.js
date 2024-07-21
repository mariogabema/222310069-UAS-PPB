import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Pressable,
} from "react-native";
import React from "react";
import { ButtonPrimary } from "../components/ButtonUi";

export function Home({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerHeader}>
                <View>
                    <Text style={{ ...styles.text, fontSize: 45 }}>
                        BukaCatatan
                    </Text>
                    <Text style={{ ...styles.text, fontSize: 14 }}>
                        Bagikan Materi Pelajaran Bersama Teman
                    </Text>
                </View>
            </View>
            <View style={styles.containerBtn}>
                <ButtonPrimary onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{ ...styles.joinLabel, fontSize: 20 }}>Join Now</Text>
                </ButtonPrimary>
            </View>

            <View style={styles.containerSignIn}>
                <Text style={styles.signInLabel}>
                    Already have an account?
                </Text>
                <Pressable onPress={() => navigation.navigate('SignIn')}>
                    <Text style={{ ...styles.signInLabel, fontWeight: "bold", marginLeft: 4 }}>Sign In</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        backgroundColor: "black",
    },
    text: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    containerHeader: {
        flex: 1,
        justifyContent: "center",
    },
    containerBtn: {
        paddingHorizontal: 30,
    },
    containerSignIn: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 30,
        justifyContent: "center",
    },
    signInLabel: {
        fontSize: 16,
        color: "white",
    },
    joinLabel: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Home;

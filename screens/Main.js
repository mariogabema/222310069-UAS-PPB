import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Category from "./Category";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

const Main = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === "Category") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (rn === "Profile") {
                        iconName = focused ? "person-circle" : "person-circle-outline";
                    } else if (rn === "CategoryDetail") {
                        iconName = focused ? "document" : "document-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarStyle: [{ position: 'absolute', marginVertical: 5, backgroundColor: 'transparent' }],
                tabBarActiveTintColor: "orange",
                tabBarInactiveTintColor: "white",
            })}
        >
            <Tab.Screen name="Category" component={Category} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default Main;

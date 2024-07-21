import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Category from './screens/Category';
import Detail from './screens/Detail';
import Editor from './screens/Editor';
import Main from './screens/Main';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{...TransitionPresets.ScaleFromCenterAndroid}}>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
                <Stack.Screen name="Categories" component={Category} options={{ headerShown: false }} />
                <Stack.Screen name="Detail" component={Detail} options={{ headerShown: true }} />
                <Stack.Screen name="Editor" component={Editor} options={{ headerShown: true }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;

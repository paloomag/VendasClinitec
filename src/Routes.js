import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import PFtipocadastro from './pages/PFtipocadastro';
import PJtipocadastro from './pages/PJtipocadastro';
import NovoCadastroPF from './pages/NovoCadastroPF';
import NovoCadastroPJ from './pages/NovoCadastroPJ';
import AumentoPF from './pages/AumentoPF';
import AumentoPJ from './pages/AumentoPJ';

export default function Routes() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'rgb(45,77,118)'
                    },
                    headerTintColor: 'white',
                }} >
                <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                <Stack.Screen options={{ title: '' }} name="PFtipocadastro" component={PFtipocadastro} />
                <Stack.Screen options={{ title: '' }} name="PJtipocadastro" component={PJtipocadastro} />
                <Stack.Screen options={{
                    title: 'Cadastro de Pessoa Física',
                    headerTitleStyle: { fontSize: 14 }
                }} name="NovoCadastroPF" component={NovoCadastroPF} />
                <Stack.Screen options={{
                    title: 'Cadastro de Pessoa Jurídica',
                    headerTitleStyle: { fontSize: 14 },
                }} name="NovoCadastroPJ" component={NovoCadastroPJ} />
                <Stack.Screen options={{
                    title: 'Aumento Plano - Pessoa Física',
                    headerTitleStyle: { fontSize: 14 },
                }} name="AumentoPF" component={AumentoPF} />
                <Stack.Screen options={{
                    title: 'Aumento Plano - Pessoa Jurídica',
                    headerTitleStyle: { fontSize: 14 },
                }} name="AumentoPJ" component={AumentoPJ} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({

    backgroud: {
        width: '100%',
        height: '90%',
        backgroundColor: 'white',
    }
});

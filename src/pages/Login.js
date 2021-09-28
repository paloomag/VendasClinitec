import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import StatusBarColor from '../components/StatusBarColor'
import api from '../services/API';

export default function Login() {
    const navigation = useNavigation();
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
    const [opacity] = useState(new Animated.Value(0));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 3,
                bounciness: 20,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 2,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    return (
        <KeyboardAvoidingView style={styles.backgroud}>

            <StatusBarColor backgroundColor='rgb(45,77,118)' barStyle='light-content' />

            <View style={styles.centerlogo}>
                <Image style={styles.logo} source={require('../img/logo.png')} />
            </View>

            <Animated.View style={[styles.inputs, {
                transform: [
                    { translateY: offset.y }
                ]
            }]}>

                <Text style={styles.textologin}> Escolha a opção para cadastro </Text>

                <TouchableOpacity
                    style={styles.botao2}
                    onPress={() => { navigation.navigate('PFtipocadastro') }}>
                    <Text style={styles.textobotao2}>PESSOA FÍSICA</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => { navigation.navigate('PJtipocadastro') }}>
                    <Text style={styles.textobotao}>PESSOA JURÍDICA</Text>
                </TouchableOpacity>

            </Animated.View>

            <View style={styles.footer}>
                <Text>Copyright © Clinitec 2021</Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    backgroud: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    centerlogo: {
        alignItems: 'center',
        backgroundColor: 'rgb(45,77,118)',
        width: '100%',
        height: '40%',
        justifyContent: 'center',
    },
    logo: {
        width: 250,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 35,
    },
    botao2: {
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: 'rgb(45,77,118)',
        width: '100%',
        marginTop: 15,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    botao: {
        backgroundColor: '#FF9700',
        width: '100%',
        marginTop: 15,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    textobotao: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    textobotao2: {
        color: 'rgb(45,77,118)',
        fontSize: 14,
        fontWeight: 'bold',
    },
    textologin: {
        textAlign: 'center',
        marginBottom: 30,
    },
    inputs: {
        position: 'relative',
        bottom: 70,
        padding: 20,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        borderRadius: 5,
        marginVertical: 10,
    },

    input: {
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 12,
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonClose: {
        backgroundColor: '#FF9700',
        width: '90%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    textStyle: {
        color: 'white',
    },
    modalImage: {
        alignItems: "center",
        margin: 15,
        width: 350,
        height: 200,
        resizeMode: 'contain',
    },
    footer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#F1F1F1',
        width: '100%',
        height: '10%',
        justifyContent: 'center',
    },

});

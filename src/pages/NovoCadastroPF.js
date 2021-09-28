import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import StatusBarColor from '../components/StatusBarColor';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/API';

export default function NovoCadastroPF() {

    const [image, setImage] = useState(null);
    const [dataNasc, setDataNasc] = useState();
    const bodyFormData = new FormData();


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Precisamos da permissão para fazer funcionar! x.x');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            bodyFormData.append('image', result.uri);
        }
    };

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [cadastroPF, setCadastroPF] = useState({
        nome: '',
        rg: '',
        cpf: '',
        data: '',
        mae: '',
        fone1: '',
        fone2: '',
        email: '',
        endereco: '',
        referencia: '',
        complemento: '',
        plano: '',
        gps: `${text}`,
        observacao: '',
        vendedor: '',
    })

    async function getLocation() {
        console.log('location')
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log(status)
            if (status !== 'granted') {
                console.log('Precisamos da permissão para fazer funcionar! x.x');
                return;
            }
            const response = await Location.getCurrentPositionAsync({});
            console.log(response.coords)
            setCadastroPF({ ...cadastroPF, gps: response.coords.latitude + ', ' + response.coords.longitude })
        } catch (error) {

        }

    }
    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    async function handleSend() {
        try {
            const response = await api.post(`novofisica/${cadastroPF.nome}/${cadastroPF.rg}/${cadastroPF.cpf}/${cadastroPF.data}/${cadastroPF.mae}/${cadastroPF.fone1}/${cadastroPF.fone2}/${cadastroPF.email}/${cadastroPF.endereco}/${cadastroPF.referencia}/${cadastroPF.complemento}/${cadastroPF.plano}/${cadastroPF.gps}/${cadastroPF.observacao}/${cadastroPF.vendedor}`, {
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            Alert.alert('Mensagem:', "Dados enviados com sucesso!");
        } catch (error) {
            console.log(error);
            Alert.alert('Ops, algo deu errado!', 'Tente mais tarde!');
        }
    }
    return (
        <KeyboardAvoidingView style={styles.backgroud}>
            <ScrollView style={{ width: '100%' }}>
                <StatusBarColor backgroundColor='rgb(45,77,118)' barStyle='light-content' />

                <View style={styles.inputs}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome Completo"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPF.nome}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, nome: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="RG"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="numeric"
                        value={cadastroPF.rg}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, rg: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="CPF"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="numeric"
                        value={cadastroPF.cpf}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, cpf: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Data de Nascimento"
                        autoCorrect={false}
                        autoCapitalize="none"
                        dataDetectorTypes="calendarEvent"
                        value={dataNasc}
                        onChangeText={value => {
                            setDataNasc(value);
                            const nascimento = value.split('/').reverse().join('');
                            console.log(nascimento)
                            setCadastroPF({ ...cadastroPF, data: nascimento })

                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nome da Mãe"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPF.mae}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, mae: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Telefone Fixo"
                        autoCorrect={false}
                        autoCapitalize="none"
                        dataDetectorTypes="phoneNumber"
                        value={cadastroPF.fone1}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, fone1: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Telefone Celular"
                        autoCorrect={false}
                        autoCapitalize="none"
                        dataDetectorTypes="phoneNumber"
                        value={cadastroPF.fone2}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, fone2: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPF.email}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, email: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Endereço Completo"
                        autoCorrect={false}
                        autoCapitalize="none"
                        dataDetectorTypes="address"
                        value={cadastroPF.endereco}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, endereco: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ponto de Referência"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPF.referencia}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, referencia: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Complemento"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPF.complemento}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, complemento: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Plano"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPF.plano}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, plano: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Localização"
                        autoCorrect={false}
                        autoCapitalize="none"
                        editable={true}
                        value={cadastroPF.gps}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, gps: value })}
                    />

                    <TouchableOpacity
                        style={styles.botao}
                        onPress={getLocation}>
                        <Text style={styles.textobotao}>PEGAR LOCALIZAÇÃO ATUAL</Text>
                    </TouchableOpacity>

                    <View style={styles.botao}>
                        <TouchableOpacity
                            onPress={pickImage}>
                            <Text style={styles.textobotao}>ADICIONAR ARQUIVOS</Text>
                        </TouchableOpacity>
                    </View>

                    {image !== null &&
                        <View style={{ padding: 10 }}>
                            <Image source={{ uri: image }} style={{ width: 80, height: 80 }} />
                        </View>}

                    <TextInput
                        style={styles.input}
                        placeholder="Observações"
                        multiline={true}
                        textStyle={{ minHeight: 128 }}
                        numberOfLines={5}
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPF.observacao}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, observacao: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nome Vendedor"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPF.vendedor}
                        onChangeText={value => setCadastroPF({ ...cadastroPF, vendedor: value })}
                    />
                </View>

                <View style={styles.botaoView}>
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={handleSend}>
                        <Text style={styles.textobotao}>CADASTRAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    backgroud: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    input: {
        backgroundColor: '#FFF',
        width: '100%',
        marginBottom: 10,
        color: '#222',
        fontSize: 12,
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
        borderColor: 'rgb(45,77,118)',
        borderWidth: 2,
    },
    inputs: {
        padding: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: -10,
    },
    botaoView: {
        padding: 20,
        width: '100%',
    },
    botao: {
        backgroundColor: 'rgb(45,77,118)',
        width: '100%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 5,
    },
    textobotao: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
})
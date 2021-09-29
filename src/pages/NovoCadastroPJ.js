import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import StatusBarColor from '../components/StatusBarColor';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/API';

export default function AumentoPJ() {
    const [image, setImage] = useState(null);
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


        if (!result.cancelled) {
            setImage(result);
            console.log(result);
        }
    };

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [cadastroPJ, setCadastroPJ] = useState({
        rsocial: '',
        nfantasia: '',
        cnpj: '',
        iestadual: '',
        nproprietario: '',
        fone1: '',
        fone2: '',
        email: '',
        endereco: '',
        referencia: '',
        complemento: '',
        plano: '',
        gps: '',
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
            setCadastroPJ({ ...cadastroPJ, gps: response.coords.latitude + ', ' + response.coords.longitude })
        } catch (error) {
            Alert.alert('Ops, algo deu errado!', 'Tente mais tarde!');
        }

    }


    async function handleSend() {
        console.log(image)
        if (image) {
            bodyFormData.append('arquivos[]', {
                uri: image.uri,
                type: 'image/png',
                name: image.uri.split('/').pop(),
            });
        }

        try {
            const response = await api.post(`novojuridica/${cadastroPJ.rsocial}/${cadastroPJ.nfantasia}/${cadastroPJ.cnpj}/${cadastroPJ.iestadual}/${cadastroPJ.nproprietario}/${cadastroPJ.fone1}/${cadastroPJ.fone2}/${cadastroPJ.email}/${cadastroPJ.endereco}/${cadastroPJ.referencia}/${cadastroPJ.complemento}/${cadastroPJ.plano}/${cadastroPJ.gps}/${cadastroPJ.observacao}/${cadastroPJ.vendedor}`, image && bodyFormData, {
                headers: {

                    'Content-Type': 'multipart/form-data',

                }
            });
            console.log(response.data)
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
                        placeholder="Razão Social"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPJ.rsocial}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, rsocial: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Nome Fantasia"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPJ.nfantasia}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, nfantasia: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="CNPJ"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="numeric"
                        value={cadastroPJ.cnpj}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, cnpj: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Inscrição Estadual"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="numeric"
                        value={cadastroPJ.iestadual}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, iestadual: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do Proprietário"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPJ.nproprietario}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, nproprietario: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Telefone Fixo"
                        autoCorrect={false}
                        autoCapitalize="none"
                        dataDetectorTypes="phoneNumber"
                        value={cadastroPJ.fone1}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, fone1: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Telefone Celular"
                        autoCorrect={false}
                        autoCapitalize="none"
                        dataDetectorTypes="phoneNumber"
                        value={cadastroPJ.fone2}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, fone2: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPJ.email}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, email: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Endereço Completo"
                        autoCorrect={false}
                        autoCapitalize="none"
                        dataDetectorTypes="address"
                        value={cadastroPJ.endereco}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, endereco: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ponto de Referência"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPJ.referencia}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, referencia: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Complemento"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPJ.complemento}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, complemento: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Plano"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPJ.plano}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, plano: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Localização"
                        autoCorrect={false}
                        autoCapitalize="none"
                        editable={true}
                        value={cadastroPJ.gps}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, gps: value })}
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
                            <Image source={{ uri: image.uri }} style={{ width: 80, height: 80 }} />
                        </View>}

                    <TextInput
                        style={styles.input}
                        placeholder="Observações"
                        multiline={true}
                        textStyle={{ minHeight: 128 }}
                        numberOfLines={5}
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPJ.observacao}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, observacao: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nome Vendedor"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={cadastroPJ.vendedor}
                        onChangeText={value => setCadastroPJ({ ...cadastroPJ, vendedor: value })}
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
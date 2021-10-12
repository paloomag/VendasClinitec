import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import StatusBarColor from '../components/StatusBarColor'
import api from '../services/API';
import { useNavigation } from '@react-navigation/native';

export default function NovoCadastroPJ() {
    const [aumentoPJ, setAumentoPJ] = useState({
        rsocial: '',
        cnpj: '',
        fone1: '',
        observacao: '',
        vendedor: '',
        plano: '',
    })
    const [loanding, setLoanding] = useState(false);
    const navigation = useNavigation();

    async function handleSend() {
        setLoanding(true);
        try {
            const response = await api.post(`aumentoplano/${aumentoPJ.rsocial}/${aumentoPJ.cnpj}/${aumentoPJ.fone1}/${aumentoPJ.plano}/${aumentoPJ.observacao}/${aumentoPJ.vendedor}`)
            Alert.alert('Mensagem:', 'Enviado com sucesso');
            console.log(response.data);
        } catch (error) {
            console.log(error);
            setLoanding(false);
            Alert.alert('Ops, algo deu errado!', 'Tente mais tarde!');
        } finally {
            Alert.alert('Mensagem:', "Dados enviados com sucesso!");
            setLoanding(false);
            navigation.goBack();
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
                        value={aumentoPJ.rsocial}
                        onChangeText={value => setAumentoPJ({ ...aumentoPJ, rsocial: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="CNPJ"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="numeric"
                        value={aumentoPJ.cnpj}
                        onChangeText={value => setAumentoPJ({ ...aumentoPJ, cnpj: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Telefone Fixo"
                        autoCorrect={false}
                        autoCapitalize="none"
                        dataDetectorTypes="phoneNumber"
                        value={aumentoPJ.fone1}
                        onChangeText={value => setAumentoPJ({ ...aumentoPJ, fone1: value })}
                    />

                    {/* <TouchableOpacity
                        style={styles.botao}
                        onPress={'Login'}>
                        <Text style={styles.textobotao}>ADICIONAR ARQUIVOS</Text>
                    </TouchableOpacity>
                     */}

                    <TextInput
                        style={styles.input}
                        placeholder="Observações"
                        multiline={true}
                        textStyle={{ minHeight: 128 }}
                        numberOfLines={5}
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={aumentoPJ.observacao}
                        onChangeText={value => setAumentoPJ({ ...aumentoPJ, observacao: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nome Vendedor"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={aumentoPJ.vendedor}
                        onChangeText={value => setAumentoPJ({ ...aumentoPJ, vendedor: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Plano"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={aumentoPJ.plano}
                        onChangeText={value => setAumentoPJ({ ...aumentoPJ, plano: value })}
                    />
                </View>

                <View style={styles.botaoView}>

                    <TouchableOpacity
                        style={styles.botao}
                        onPress={handleSend}>
                        <Text style={styles.textobotao}>CADASTRAR</Text>
                    </TouchableOpacity>
                </View>
                <Modal visible={loanding} transparent>
                    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="orange" />
                    </View>
                </Modal>
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
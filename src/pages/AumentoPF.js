import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import StatusBarColor from '../components/StatusBarColor'
import api from '../services/API';

export default function AumentoPF() {
    const [aumentoPF, setAumentoPF] = useState({
        nome: '',
        cpf: '',
        fone1: '',
        observacao: '',
        vendedor: '',
        plano: '',
    })

    async function handleSend() {
        try {
            const response = await api.post(`aumentoplano/${aumentoPF.nome}/${aumentoPF.cpf}/${aumentoPF.fone1}/${aumentoPF.plano}/${aumentoPF.observacao}/${aumentoPF.vendedor}`)
            Alert.alert('Mensagem:', 'Enviado com sucesso');
            console.log(response.data);
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
                        value={aumentoPF.nome}
                        onChangeText={value => setAumentoPF({ ...aumentoPF, nome: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="CPF"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="numeric"
                        value={aumentoPF.cpf}
                        onChangeText={value => setAumentoPF({ ...aumentoPF, cpf: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Telefone Fixo"
                        autoCorrect={false}
                        autoCapitalize="none"
                        dataDetectorTypes="phoneNumber"
                        value={aumentoPF.fone1}
                        onChangeText={value => setAumentoPF({ ...aumentoPF, fone1: value })}
                    />
                    {/* 
                    <TouchableOpacity
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
                        autoCapitalize="words"
                        value={aumentoPF.observacao}
                        onChangeText={value => setAumentoPF({ ...aumentoPF, observacao: value })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nome Vendedor"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={aumentoPF.vendedor}
                        onChangeText={value => setAumentoPF({ ...aumentoPF, vendedor: value })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Plano"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={aumentoPF.plano}
                        onChangeText={value => setAumentoPF({ ...aumentoPF, plano: value })}
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
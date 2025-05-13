import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DiscoType, RootStackParamList } from './types';


const getLastId = async (): Promise<number | null> => {
    try {
        const response = await fetch("http://flask-api:5000/get-discos");
        const result: DiscoType[] = await response.json();

        if (result.length === 0) return null;

        const lastId = Math.max(...result.map(disco => disco.id));
        return lastId;
    } catch (error) {
        console.error("Erro ao obter discos:", error);
        return null;
    }
};

const AddPage = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [nome, setNome] = useState('');
    const [autor, setAutor] = useState('');
    const [ano, setAno] = useState('');
    const [genero, setGenero] = useState('');
    const id = getLastId();

    const addDisco = async () => {
        const response = await fetch(`http://flask-api:5000/add-disco/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                nome,
                autor,
                ano: Number(ano),
                genero
            }),
        });

        return response.ok;
    };

    function gatherAllDiscos() {
        throw new Error('Function not implemented.');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Página de adição</Text>

            <Text>Nome:</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} />

            <Text>Autor:</Text>
            <TextInput style={styles.input} value={autor} onChangeText={setAutor} />

            <Text>Ano:</Text>
            <TextInput
                style={styles.input}
                value={ano}
                onChangeText={(text) => {
                    const apenasNumeros = text.replace(/[^0-9]/g, '');
                    setAno(apenasNumeros);
                }}
                keyboardType="numeric"
            />
            <Text>Gênero:</Text>
            <TextInput style={styles.input} value={genero} onChangeText={setGenero} />

            <Button
                title="Salvar Alterações"
                onPress={async () => {
                    const sucesso = await addDisco();
                    if (sucesso) {
                        gatherAllDiscos();
                        navigation.navigate('List');
                    } else {
                        Alert.alert('Erro', 'Falha ao registrar disco');
                    }
                }}
            />
        </View>
    );
};


export default AddPage;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 8,
        marginBottom: 15,
        borderRadius: 4,
    },
});

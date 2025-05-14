import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from './types';

type UpdateRouteProp = RouteProp<RootStackParamList, 'Update'>;

const UpdatePage = ({ route }: { route: UpdateRouteProp }) => {
    const { disco } = route.params;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [nome, setNome] = useState(disco.nome);
    const [autor, setAutor] = useState(disco.autor);
    const [ano, setAno] = useState(disco.ano.toString());
    const [genero, setGenero] = useState(disco.genero);

    const updateDisco = async () => {
        const response = await fetch(`http://localhost:5000/discos/${disco.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome,
                autor,
                ano: Number(ano),
                genero,
            }),
        });
        return response.ok;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Atualizar Disco</Text>

            <Text>Nome:</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} />

            <Text>Autor:</Text>
            <TextInput style={styles.input} value={autor} onChangeText={setAutor} />

            <Text>Ano:</Text>
            <TextInput
                style={styles.input}
                value={ano}
                onChangeText={(text) => setAno(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
            />

            <Text>Gênero:</Text>
            <TextInput style={styles.input} value={genero} onChangeText={setGenero} />

            <Button
                title="Salvar Alterações"
                onPress={async () => {
                    const sucesso = await updateDisco();
                    if (sucesso) {
                        navigation.navigate('List');
                    } else {
                        Alert.alert('Erro', 'Falha ao atualizar disco');
                    }
                }}
            />
             <Button
                title="Voltar"
                onPress={() => navigation.navigate('List')}/>
        </View>
    );
};

export default UpdatePage;

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
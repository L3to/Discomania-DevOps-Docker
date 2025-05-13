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

    const updateDisco = async () => {
        const response = await fetch(`http://flask-api:5000/update-disco/${disco.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome,
                autor,
                ano: Number(ano),
            }),
        });
        return response.ok;
    };



    function gatherAllDiscos() {
        throw new Error('Function not implemented.');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Página de atualização</Text>

            <Text>Nome:</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder={disco.nome} />

            <Text>Autor:</Text>
            <TextInput style={styles.input} value={autor} onChangeText={setAutor} placeholder={disco.autor} />

            <Text>Ano:</Text>
            <TextInput
                style={styles.input}
                value={ano}
                onChangeText={setAno}
                keyboardType="numeric"
                placeholder={String(disco.ano)}
            />

            <Button
                title="Salvar Alterações"
                onPress={async () => {
                    const sucesso = await updateDisco();
                    if (sucesso) {
                        gatherAllDiscos();
                        navigation.navigate('List');
                    } else {
                        Alert.alert('Erro', 'Falha ao atualizar disco');
                    }
                }}
            />
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

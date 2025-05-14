import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { Button, FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import AddPage from './AddPage';
import UpdatePage from './UpdatePage';
import { DiscoType, RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();
type DiscoItemNavigationProp = StackNavigationProp<RootStackParamList, 'List'>;

interface DiscoProps {
  item: DiscoType;
  onDeleteDisco: (id: number) => void;
}

const DiscoItem = ({ item, onDeleteDisco }: DiscoProps) => {
  const navigation = useNavigation<DiscoItemNavigationProp>();

  return (
    <View style={styles.item}>
      <Text style={styles.title}>Nome: {item.nome}</Text>
      <Text>Autor: {item.autor}</Text>
      <Text>Ano: {item.ano}</Text>
      <Text>Gênero: {item.genero}</Text>
      <Text>ID: {item.id}</Text> {/* Exibindo o ID */}
      <Button title="Atualizar" onPress={() => navigation.navigate('Update', { disco: item })} />
      <Button title="Deletar" onPress={() => onDeleteDisco(item.id)} />
    </View>
  );
};

const DiscoList = () => {
  const [discos, setDiscos] = useState<DiscoType[]>([]);
  const navigation = useNavigation<DiscoItemNavigationProp>();

  const gatherAllDiscos = async () => {
    try {
      const response = await fetch("http://localhost:5000/discos");
      const result: DiscoType[] = await response.json();
      setDiscos(result);
    } catch (error) {
      console.error("Erro ao obter discos:", error);
    }
  };

  const deleteDisco = async (id: number) => {
    const response = await fetch(`http://localhost:5000/discos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      gatherAllDiscos();
    }
  };

  useEffect(() => {
    gatherAllDiscos();
  }, []);

  return (
    <View>
      <FlatList
        data={discos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: ListRenderItemInfo<DiscoType>) => (
          <DiscoItem item={item} onDeleteDisco={deleteDisco} />
        )}
      />
      <Button title="Adicionar discos" onPress={() => navigation.navigate('Add')} />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={DiscoList} options={{ headerShown: false }} />
        <Stack.Screen name="Update" component={UpdatePage} options={{ headerShown: false }} />
        <Stack.Screen name="Add" component={AddPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
});

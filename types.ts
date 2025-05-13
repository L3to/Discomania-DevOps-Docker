export type DiscoType = {
    id: number;
    nome: string;
    autor: string;
    ano: number;
};
export type RootStackParamList = {
    List: undefined;
    Update: { disco: DiscoType };
    Add: undefined;
};


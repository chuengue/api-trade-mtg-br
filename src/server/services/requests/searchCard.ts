import { AxiosInstance } from 'axios';

export type apiType = AxiosInstance;

export const getPublicCollections = async (
    api: apiType,
    params: {
        cardName: string;
    }
) => {
    try {
        const response = await api.get<any>(
            `/cards/search?q=${encodeURIComponent(params.cardName)}`
        );

        return response?.data;
    } catch (error) {
        // Loga o erro para debug
        console.error('Erro na requisição getPublicCollections:', error);

        throw error;
    }
};

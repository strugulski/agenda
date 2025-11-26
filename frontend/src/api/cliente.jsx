import api from "./api"

export const getClientes = async () => {
    const response = await api.get('/cliente')

    if(response.status !== 200){
        return [] 
    }

    return response.data.results
} 
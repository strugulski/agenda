import api from "./api"

export const getAtendimento = async () => {
    const response = await api.get('/api/v1/atendimento')

    if(response.status !== 200){
        return []
    }

    return response.data.atendimento
}

export const createAtendimento = async (atendimento) => {
   const response = await api.post('/api/v1/atendimento', atendimento)

   return response
}

export const updateAtendimento = async (id, atendimento) => {
    const response = await api.put(`/api/v1/atendimento/${id}`, atendimento)

    return response
}

export const deleteAtendimento = async (id) => {
    const response = await api.delete(`/api/v1/cliente/${id}`)

    return response
}

export const loginAtendimento = async (dia, hora, valor) => {
    const response = await api
        .post('/api/v1/login', { dia, hora, valor})

   return response
}
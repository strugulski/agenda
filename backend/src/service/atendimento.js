import Atendimento from '../model/atendimento.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SEGREDO = "M3uS3gr3d0"
const SALT = 10 // 12

class ServiceAtendimento {

    async FindAll() {
        return Atendimento.findAll()
    }

    async FindOne(id) {
        if (!id) {
            throw new Error("Favor informar o ID")
        }

        // preciso procurar um usuario no banco
        const user = await Atendimento.findByPk(id)

        if (!user) {
            throw new Error(`Usuário ${id} não encontrado`)
        }

        return user
    }

    async Create(dia, data, hora, valor, concluido) {
        if (!dia || !data || !hora) {
            throw new Error("favor preencher todos os campos")
        }

        const senhaCrip = await bcrypt.hash(String(hora), SALT)

        await Atendimento.create({
            nome: dia,
            email: data,
            senha: senhaCrip,
            ativo: valor,

        })
    }

    async Update(id, data, hora) {
        const oldUser = await Atendimento.findByPk(id)
        // oldUser.nome = nome || oldUser.nome

        oldUser.senha = hora
            ? await bcrypt.hash(String(hora), SALT)
            : oldUser.senha

        // Cliente.update(id, nome)
    }

    async Delete(id) {
        const oldUser = await Atendimento.findByPk(id)

        oldUser.destroy()
    }

}

export default new ServiceAtendimento()
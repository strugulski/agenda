import Cliente from '../model/clientes.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SEGREDO = "M3uS3gr3d0"
const SALT = 10 // 12

class ServiceCliente {

    async FindAll() {
        return Cliente.findAll()
    }

    async FindOne(id) {
        if (!id) {
            throw new Error("Por favor informar o ID")
        }

        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            throw new Error(`Cliente ${id} não encontrado`)
        }

        return cliente
    }

    async Create(nome, email, senha) {
        if (!nome || !email || !senha) {
            throw new Error("Por favor preencher todos os campos")
        }

        const senhaCrip = await bcrypt.hash(String(senha), SALT)

        await Cliente.create({
            nome,
            email,
            senha: senhaCrip
            
        })
    }

    async Update(id, nome, senha) {
        const oldCliente = await Cliente.findByPk(id)
        
        oldCliente.nome = nome || oldCliente.nome

        oldCliente.senha = senha
            ? await bcrypt.hash(String(senha), SALT)
            : oldCliente.senha
    }

    async Delete(id) {
        const oldCliente = await Cliente.findByPk(id)

        oldCliente.destroy()
    }

    async Login(email, senha) {
        if(!email || !senha) {
            throw new Error("Email ou senha inválidos.")
        }

        const cliente = await Cliente.findOne({ where: { email } })

        if (
            !cliente
            || !(await bcrypt.compare(String(senha), cliente.senha))
        ) {
            throw new Error("Email ou senha inválidos.")
        }

        return jwt.sign(
            { id: cliente.id, nome: cliente.nome },
            JWT_SEGREDO,
            { expiresIn: 60 * 60 }
        )
    }
}

export default new ServiceCliente()
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
            throw new Error("Por favor informar o ID")
        }

        const atendimento = await Atendimento.findByPk(id)

        if (!atendimento) {
            throw new Error(`Atendimento ${id} não foi encontrado`)
        }

        return atendimento
    }

    async Create(dia, hora, valor, concluido) {
        if (!dia || !hora || !valor || !concluido) {
            throw new Error("Por favor preencher todos os campos")
        }

        await Atendimento.create({
            dia,
            hora,
            valor,
            concluido
            
            
        })
    }

    async Update(id, dia, hora, valor) {
        const oldAtendimento = await Atendimento.findByPk(id)
        
        oldAtendimento.dia = dia
            ? await bcrypt.hash(String(dia), SALT)
            : oldAtendimento.dia
            
            oldAtendimento.hora = hora
            ? await bcrypt.hash(String(hora), SALT)
            : oldAtendimento.hora

            oldAtendimento.valor = valor
            ? await bcrypt.hash(String(valor), SALT)
            : oldAtendimento.valor
    }

    async Delete(id) {
        const oldAtendimento = await Atendimento.findByPk(id)

        oldAtendimento.destroy()
    }

    async Login(dia, hora, valor) {
        if(!dia || !hora || !valor) {
            throw new Error("Atendimento inválido!.")
        }

        const atendimento = await Atendimento.findOne({ where: { dia } })

        if (
            !atendimento
            || !(await bcrypt.compare(String(hora), atendimento.hora))
        ) {
            throw new Error("Atendimento inválido.")
        }

        return jwt.sign(
            { id: atendimento.id, dia: atendimento.dia, hora: atendimento.hora, valor: atendimento.valor  },
            JWT_SEGREDO,
            { expiresIn: 60 * 60 }
        )
    }
}

export default new ServiceAtendimento()
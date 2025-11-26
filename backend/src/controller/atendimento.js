import ServiceAtendimento from '../service/atendimento.js'

class ControllerAtendimento{

    async FindAll(_, res) {
        try {
            const atendimentos = await ServiceAtendimento.FindAll()
            res.status(200).send({ atendimentos })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    async FindOne(req, res) {
        try {
            const id = req.params.id || req.headers?.atendimento?.id

            const atendimento = await ServiceAtendimento.FindOne(id)
            res.status(200).send({ atendimento })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    async Create(req, res) {
        try {
            const loggedAtendimento = req.headers?.atendimento
            let permissao = 1
            if(loggedAtendimento && loggedAtendimento.permissao === 0){
                permissao = req.body.permissao
            }
            const {dia, hora,valor, concluido} = req.body
            await ServiceAtendimento.Create(dia, hora,valor, concluido)
            res.status(201).send()
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

     Update(req, res) {
        try {
            const id = req.params.id || req.headers?.atendimento?.id
            const dia = req.body.dia
            const hora = req.body.hora
            const valor = req.body.valor
            const concluido = req.body.concluido
            ServiceAtendimento.Update(id, dia, hora ,valor, concluido)
            res.status(200).send()
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    async Delete(req, res) {
        try {
            const id = req.params.id || req.headers?.atendimento?.id
            await ServiceAtendimento.Delete(id)
            res.status(204).send()
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

    async Login(req, res) {
        try {
            const { dia, hora,valor} = req.body

            const token = await ServiceAtendimento.Login(dia, hora,valor)

            res.status(200).send({ token })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

}
export default new ControllerAtendimento()
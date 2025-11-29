import express from 'express'
import ControllerAtendimento from '../controller/atendimento.js'



const routerAtendimento = express.Router()


routerAtendimento.get('/atendimento/context', ControllerAtendimento.FindOne)
routerAtendimento.post('/atendimento/', ControllerAtendimento.Create)
routerAtendimento.put('/atendimento/', ControllerAtendimento.Update)
routerAtendimento.delete('/atendimento/', ControllerAtendimento.Delete)

routerAtendimento.get('/atendimentos', ControllerAtendimento.FindAll)
routerAtendimento.get('/atendimento/:id, dia, hora, valor', ControllerAtendimento.FindOne)
routerAtendimento.post('/atendimento/admin', ControllerAtendimento.Create)
routerAtendimento.put('/atendimento/:id,dia, hora, valor', ControllerAtendimento.Update)


export default routerAtendimento
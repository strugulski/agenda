import express from 'express'
import ControllerCliente from '../controller/clientes.js'
import ControllerAtendimento from '../controller/atendimento.js'



const router = express.Router()

router.post('/login', ControllerCliente.Login)

router.get('/cliente/context', ControllerCliente.FindOne)
router.get('/atendimento/context', ControllerAtendimento.FindOne)
router.post('/cliente/', ControllerCliente.Create)
router.post('/atendimento/', ControllerAtendimento.Create)

router.put('/cliente/',  ControllerCliente.Update)
router.delete('/cliente/', ControllerCliente.Delete)
router.put('/atendimento/', ControllerAtendimento.Update)
router.delete('/atendimento/', ControllerAtendimento.Delete)

router.get('/clientes', ControllerCliente.FindAll)
router.get('/atendimentos', ControllerAtendimento.FindAll)
router.get('/cliente/:id', ControllerCliente.FindOne)
router.get('/atendimento/:id, dia, hora, valor', ControllerAtendimento.FindOne)
router.post('/cliente/admin', ControllerCliente.Create)
router.post('/atendimento/admin', ControllerAtendimento.Create)
router.put('/cliente/:id', ControllerCliente.Update)
router.put('/atendimento/:id,dia, hora, valor', ControllerAtendimento.Update)
router.delete('/cliente/:id', ControllerCliente.Delete)


export default router
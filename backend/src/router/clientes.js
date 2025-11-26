import express from 'express'
import ControllerCliente from '../controller/clientes.js'
import ControllerAtendimento from '../controller/atendimentos.js'
import authMiddleware from '../middleware/auth.js'


const router = express.Router()

router.post('/login', ControllerCliente.Login)

router.get('/cliente/context', authMiddleware(), ControllerCliente.FindOne)
router.get('/atendimento/context', authMiddleware(), ControllerAtendimento.FindOne)
router.post('/cliente/', ControllerCliente.Create)
router.post('/atendimento/', ControllerAtendimento.Create)

router.put('/cliente/', authMiddleware(), ControllerCliente.Update)
router.delete('/cliente/', authMiddleware(), ControllerCliente.Delete)
router.put('/atendimento/', authMiddleware(), ControllerAtendimento.Update)
router.delete('/atendimento/', authMiddleware(), ControllerAtendimento.Delete)

router.get('/clientes', authMiddleware([0]), ControllerCliente.FindAll)
router.get('/atendimentos', authMiddleware([0]),  ControllerAtendimento.FindAll)
router.get('/cliente/:id', authMiddleware([0]), ControllerCliente.FindOne)
router.get('/atendimento/:id, dia, hora, valor', authMiddleware([0]), ControllerAtendimento.FindOne)
router.post('/cliente/admin', authMiddleware([0]), ControllerCliente.Create)
router.post('/atendimento/admin', authMiddleware([0]), ControllerAtendimento.Create)
router.put('/cliente/:id', authMiddleware([0]), ControllerCliente.Update)
router.put('/atendimento/:id,dia, hora, valor', authMiddleware([0]), ControllerAtendimento.Update)
router.delete('/cliente/:id', authMiddleware([0]), ControllerCliente.Delete)
router.delete('/atendimento/:id', authMiddleware([0]), ControllerAtendimentoe.Delete)

export default router
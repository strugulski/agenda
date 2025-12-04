import { useEffect, useState } from 'react'
import { deleteCliente, getCliente } from '../../api/cliente.jsx'
import { Link, useNavigate } from 'react-router-dom'
import './styles.css'
import { toast } from 'react-toastify'

function Cliente() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    const handleUpdate = async (user) => {
        navigate('/update/cliente', { state: { user } })
    }

    const handleDelete = async (id) => {
        const response = await deleteCliente(id)

        if (response.status !== 204) {
            toast("Erro ao deletar, tente novamente, mais tarde")
            return
        }

        setUsers(users => users.filter(user => user.id !== id))
    }

    useEffect(() => {
        async function carregar() {
            const allClientes = await getCliente()
            setUsers(allClientes)
        }
        carregar()
    }, [])

    return (
        <main>
            <div className='user-list'>
                <div>
                    <Link to={'/create/cliente'}>
                        <button>Criar</button>
                    </Link>
                </div>
                <div className='user header' key='header'>
                    <label>Nome</label>
                    <label>Email</label>
                    <label>Ações</label>
                </div>
                {
                    users.length == 0
                        ? <div className='cliente'>
                           
                        </div>
                        : users.map(cliente =>
                            <div className='cliente' key={cliente.id}>
                                <label>{cliente.nome}</label>
                                <label>{cliente.email}</label>
                                <div className='actions'>
                                    <button
                                        type='button'
                                        onClick={() => handleUpdate(cliente)}
                                    >Alterar</button>
                                    <button
                                        type='button'
                                        onClick={() => handleDelete(cliente.id)}
                                    >Deleta</button>
                                </div>
                            </div>)
                }
            </div>
        </main>
    )
}

export default Cliente

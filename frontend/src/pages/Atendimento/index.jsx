import { useEffect, useState } from 'react'
import { deleteAtendimento, getAtendimento } from '../../api/atendimento'
import { Link, useNavigate } from 'react-router-dom'
import './styles.css'
import { toast } from 'react-toastify'

function Atendimento() {
    const navigate = useNavigate()
    const [atendimento, setAtendimento] = useState([])

    const handleUpdate = async (atendimento) => {
        navigate('/update/atendimento', { state: { atendimento } })
    }

    const handleDelete = async (id) => {
        const response = await deleteAtendimento(id)

        if (response.status !== 204) {
            toast("Erro ao deletar, tente novamente, mais tarde")
            return
        }

        setClientes(atendimento =>atendimento.filter(atendimento => atendimento.id !== id))
    }

    useEffect(() => {
        async function carregar() {
            const allAtendimento = await getAtendimento()
            setAtendimento(allAtendimento)
        }
        carregar()
    }, [])

    return (
        <main>
            <div className='atendimento-list'>
                <div>
                    <Link to={'/create/atendimento'}>
                        <button>Criar</button>
                    </Link>
                </div>
                <div className='atendimento header' key='header'>
                    <label>dia</label>
                    <label>hora</label>
                    <label>valor</label>
                    
                </div>
                {
                    atendimento.length == 0
                        ? <div className='atendimento'>
                            <label>Não tem agenda</label>
                        </div>
                        : atendimento.map(atendimento =>
                            <div className='cliente' key={atendimento.id}>
                                <label>{atendimento.dia}</label>
                                <label>{atendimento.hora}</label>
                                <label>{atendimento.valor}</label>
                                <div className='actions'>
                                    <button
                                        type='button'
                                        onClick={() => handleUpdate(atendimento)}
                                    >Alterar</button>
                                    <button
                                        type='button'
                                        onClick={() => handleDelete(atendimento.id)}
                                    >Deleta</button>
                                </div>
                            </div>)
                }
            </div>
        </main>
    )
}

export default Atendimento

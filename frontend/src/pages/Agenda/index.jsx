import { useEffect, useState } from 'react'
import { getClientes } from '../../api/cliente'
import { Link } from 'react-router-dom'

function Agenda() {
    const [conteudo, setConteudo] = useState(<>Carregando</>)

    async function TranformaEmLista() {
        const todosClientes = await getClientes()

        return todosClientes.map(cliente =>
            <div className='card char' key={cliente.id}>
                <img src={cliente.image} alt={`Foto de ${cliente.name}`} />
                <h2>{cliente.name}</h2>

                <div className='char-info'>
                    <span><b>Espécie: </b> {cliente.species}</span>
                    <span><b>Gênero: </b> {cliente.gender}</span>
                </div>
                <div>
                    
                    <h5><b>Status: </b> {cliente.status} </h5>
                </div>
            </div>
        )
    }

    useEffect(() => {
        async function carregar() {
            setConteudo(
                await TranformaEmLista()
            )
        }
        carregar()
    }, [])

    return (
        <main>
            <Link to='/'>
                <button>
                    Voltar para home
                </button>
            </Link>
           
            <div className='lista-principal'>
                {conteudo}
            </div>
        </main>
    )
}

export default Agenda

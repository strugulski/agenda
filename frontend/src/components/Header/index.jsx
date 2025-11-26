import { Link } from 'react-router-dom'
import './style.css'
import { AuthContext } from '../../auth/Context'
import { useContext } from 'react'

export default function Header() {

    const { token } = useContext(AuthContext)

    return (
        <header>
            <h1>Minha AGENDA</h1>
            <nav>
                <Link to='/'>
                    <button>
                        Inicio
                    </button>
                </Link>
                              {
                    !token
                        ? null
                        : <Link to='/clientes'>
                            <button>
                                Clientes
                            </button>
                        </Link>
                }
                <Link to='/login'>
                    <button>
                        Login
                    </button>
                </Link>
                  <Link to='/'>
                    <button>
                        Atendimento
                    </button>
                </Link>
            </nav>
        </header>
    )
}
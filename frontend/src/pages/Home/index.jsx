import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="home">
            Outras informações e um
             <Link to='/agenda'>
                <button>
                    Navegar para AGENDA
                </button>
            </Link> 
        </div>
    )
}

export default Home
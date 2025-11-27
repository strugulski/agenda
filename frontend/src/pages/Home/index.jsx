import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="home">
            Outras informações e um
             <Link to='/home'>
                <button>
                    BEM VINDO
                </button>
                
            </Link> 
            <a href="././login"></a>
        </div>
    )
}

export default Home
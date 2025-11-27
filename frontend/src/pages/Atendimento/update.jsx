import { useEffect, useState } from "react"
import { updateAtendimento } from "../../api/atendimento";
import { useLocation, useNavigate } from "react-router-dom";
import './styles.css'
import { toast } from "react-toastify";

export default function UpdateAtendimento() {
    const navigate = useNavigate()
    const [atendimento, setAtendimento] = useState({
        nome: '',
        email: '',
        senha: '',
        ativo: true
    })
    
    const location = useLocation()
    const { atendimento: prevAtendimento } = location.state

    const handleChange = (e) => {
        const { id, value } = e.target;
        setAtendimento({
            ...atendimento,
            [id]: value
        })
    }

    const handleReset = (e) => {
        e.preventDefault()
     
        setAtendimento({ ...prevAtendimento, senha: '' })
    }

    const handleSave = async (e) => {
        e.preventDefault()
     
        const response = await updateAtendimento(prevAtendimento.id, atendimento)

        if (response.status === 200) {
            navigate('/atendimento')
            toast("Atendimento alterado com sucesso")
        } else {
            toast("Erro ao criar Atendimento")
            console.log(response)
        }
    }

  
    useEffect(() => {
        setAtendimento({ ...prevAtendimento, senha: '' })
    }, [])

    return (
        <div className="form">
            <form>
                <div>
                    <label>Dia: </label>
                    <input type="text" name="dia" id='dia' value={Atendimento.dia} onChange={handleChange} />
                </div>
                <div>
                    <label>Hora: </label>
                    <input type="text" name="hora" id='hora' value={Atendimento.hora} onChange={handleChange} />
                </div>
                <div>
                    <label>Valor: </label>
                    <input type="text" name="valor" id='valor' value={Atendimento.valor} onChange={handleChange} />
                </div>
                <div className="actions">
                    <button
                        type="reset"
                        onClick={handleReset}
                    >Limpar</button>
                    <button
                        type="submit"
                        onClick={handleSave}
                    >Enviar</button>
                </div>
            </form>
        </div>
    )
}
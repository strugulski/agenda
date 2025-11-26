import { useState } from "react"
import { CreateAtendimento } from "../../api/atendimento";
import { useNavigate } from "react-router-dom";
import './styles.css'
import { toast } from "react-toastify";

const INITIAL_STATE = {
    dia: '',
    hora: '',
    valor: '',
    concluido: true
}

export default function CreateAtendimento() {
    const navigate = useNavigate()
    const [atendimento, setAtendimento] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        const { id, value } = e.target;
        setAtendimento({
            ...atendimento,
            [id]: value
        })
    }

    const handleReset = (e) => {
        e.preventDefault()
        setAtendimento(INITIAL_STATE)
    }

    const handleSave = async (e) => {
        e.preventDefault()
       
        const response = await createAtendimento(atendimento)

        if (response.status === 201) {
            toast("Atendimento criado com sucesso")
            navigate('/atendimento')
        } else {
            toast("Erro ao criar Atendimento")
            console.log(response)
        }
    }

    return (
        <div className="form">
            <form>
                <div>
                    <label>Dia: </label>
                    <input type="text" name="dia" id='dia' value={atendimento.dia} onChange={handleChange} />
                </div>
                <div>
                    <label>Hora: </label>
                    <input type="hora" name="hora" id='hora' value={atendimento.hora} onChange={handleChange} />
                </div>
                <div>
                    <label>Valor: </label>
                    <input type="valor" name="valor" id='valor' value={atendimento.valor} onChange={handleChange} />
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
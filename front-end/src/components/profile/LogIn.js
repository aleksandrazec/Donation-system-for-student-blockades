import { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router'

function LogIn(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const goToRegister=async()=>{
        try {
            navigate(`/register`)
        } catch (error) {
            console.error(error)
        }
    }
    const logIn = async () => {
        try {
            api.post(`/users/login`, { email: email, password: password})
                .then(result => {
                    navigate(`/`)
                })
                .catch(err => console.error(err))
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div>
            <div>
                <p>Email:</p>
                <input type="text" id="email" name="email" onChange={({target: {value: input}}) => setEmail(input)} value={email}/><br/>
                <p>Password:</p>
                <input type="text" id="password" name="password" onChange={({target: {value: input}}) => setPassword(input)} value={password}/><br/>
                <button onClick={()=>logIn()}>Log In</button>
                <p>Don't have an account?</p>
                <button onClick={()=>goToRegister()}>Register</button>
            </div>
        </div>
    )
}

export default LogIn
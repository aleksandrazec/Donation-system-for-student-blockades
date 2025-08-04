import { useState } from "react"
import api from '../../services/api'
import { useNavigate } from 'react-router'

function Register(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [city, setCity] = useState('')
    const navigate = useNavigate()


    const register = async () => {
        try {
            api.post(`/users/register`, { email: email, password: password, first_name: firstName, last_name: lastName, city: city })
                .then(result => {
                    try {
                        navigate(`/registersuccess`)
                    } catch (error) {
                        console.error(error)
                    }
                })
                .catch(err => console.error(err))
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <p>Email:</p>
            <input type="text" id="email" name="email" onChange={({ target: { value: input } }) => setEmail(input)} value={email} /><br />
            <p>First name:</p>
            <input type="text" id="first_name" name="first_name" onChange={({ target: { value: input } }) => setFirstName(input)} value={firstName} /><br />
            <p>Last name:</p>
            <input type="text" id="last_name" name="last_name" onChange={({ target: { value: input } }) => setLastName(input)} value={lastName} /><br />
            <p>City:</p>
            <input type="text" id="city" name="city" onChange={({ target: { value: input } }) => setCity(input)} value={city} /><br />
            <p>Password:</p>
            <input type="text" id="password" name="password" onChange={({ target: { value: input } }) => setPassword(input)} value={password} /><br />
            <button onClick={() => register()}>Register</button>

        </div>
    )
}

export default Register
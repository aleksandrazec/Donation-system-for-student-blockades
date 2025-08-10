import { useState, useContext, useEffect } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router'
import { UserContext } from '../../Context'

function LogIn(props) {
    const user = useContext(UserContext)
    const { setUser } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [text, setText] = useState('')
    const goToRegister = async () => {
        try {
            navigate(`/register`)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (user.role !== 'Guest') {
            navigate(`/profile`)
        }
    }, [navigate, user])
    const logIn = async () => {
        if (email && password) {
            try {
                api.post(`/users/login`, { email: email, password: password })
                    .then(result => {
                        setUser({
                            role: result.data.role,
                            user_id: result.data.user_id
                        })
                        if (user.role !== 'Guest') {
                            navigate(`/profile`)
                        } else {
                            setText(`Something went wrong`)
                        }

                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        } else {
            setText('Missing a field')
        }
    }


    return (
        <div>
            <div>
                <p>Email:</p>
                <input type="text" id="email" name="email" onChange={({ target: { value: input } }) => setEmail(input)} value={email} /><br />
                <p>Password:</p>
                <input type="password" id="password" name="password" onChange={({ target: { value: input } }) => setPassword(input)} value={password} /><br />
                <button className="buttons-list" onClick={() => logIn()}>Log In</button>
                <br/>
                {text}
                <p>Don't have an account?</p>
                <button className="buttons-list" onClick={() => goToRegister()}>Register</button>
            </div>
        </div>
    )
}

export default LogIn
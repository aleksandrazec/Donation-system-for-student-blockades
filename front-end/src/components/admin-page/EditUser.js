import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router';
import api from '../../services/api';
import { UserContext } from '../../Context'

function EditUser(props) {
    const { id } = useParams();
    const navigate = useNavigate()
    const user = useContext(UserContext)

    const [data, setData] = useState({
        id: 0,
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        city: '',
        role: ''
    })
    const [role, setRole] = useState('')
    const [text, setText] = useState('')
    useEffect(()=>{
        if(user.role!=='Admin'){
            navigate(`/`)
        }
    },[navigate, user])
    useEffect(() => {
        const getData = () => {
            try {
                api.post(`/users/getinfo`, { id: id })
                    .then((result) => {
                        console.log(result.data)
                        setData(result.data);
                        setRole(result.data.role)
                    })
                    .catch(err => console.error('api error: ', err));

            } catch (error) {
                console.error('error: ', error)
            }
        }
        getData()
    }, [id])

    const edit = () => {
        if (role !== data.role) {
            try {
                api.post(`/users/setrole`, { id: id, role: role })
                    .then((result) => {
                        console.log(result.data)
                        setData(prev => ({ ...prev, role: role }))
                        setText('Role set to ' + role)
                    })
                    .catch(err => console.error('api error: ', err));

            } catch (error) {
                console.error('error: ', error)
            }
        }
    }

    const deleteUser = () => {
        try {
            api.post(`/users/delete`, { id: id })
                .then((result) => {
                    console.log(result.data)
                    navigate(`/users`)
                })
                .catch(err => console.error('api error: ', err));

        } catch (error) {
            console.error('error: ', error)
        }
    }

    return (
        <div>
            {
                data ?
                    <div>
                        <h3>User {data.first_name} {data.last_name}</h3>
                        <h3>Id {data.id}</h3>
                        <p>Edit role:</p>
                        {
                            <select value={role} onChange={({ target: { value } }) => setRole(value)}>
                                <option value="Citizen" key="Citizen">Citizen</option>
                                <option value="Student" key="Student">Student</option>
                                <option value="Admin" key="Admin">Admin</option>
                            </select>
                        }
                        <br />
                    </div>
                    :
                    <></>
            }
            <button onClick={() => edit()}>Edit</button>
            <br />
            <button onClick={() => deleteUser()}>Delete</button>
            <br />
            {text}
        </div>
    )
}

export default EditUser
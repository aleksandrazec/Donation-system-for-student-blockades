import { useState, useEffect, useContext } from 'react'
import api from '../../services/api';
import EditUserTable from './EditUserTable'
import { UserContext } from '../../Context'
import { useNavigate } from 'react-router'

function Users(props) {
    const [users, setUsers] = useState()
    const user = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user.role!=='Admin'){
            navigate(`/`)
        }
    },[navigate, user])

    useEffect(() => {
        const getUsers = () => {
            try {
                api.get(`/users/listnotadmin`)
                    .then((result) => {
                        console.log(result.data)
                        const modifiedData = result.data.map(item => ({
                            ...item,
                            Edit: 'Edit',
                        }));
                        setUsers(modifiedData);
                        console.log(modifiedData)
                    })
                    .catch(err => console.error('api error: ', err));

            } catch (error) {
                console.error('error: ', error)
            }
        }
        getUsers()
    }, [])

    return (
        <div>
            <EditUserTable data={users} />
        </div>
    )
}

export default Users
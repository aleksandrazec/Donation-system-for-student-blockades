import { useState, useEffect, useContext } from 'react'
import api from '../../services/api';
import { UserContext } from '../../Context'
import {useNavigate} from 'react-router'

function SetFacManager() {
    const user = useContext(UserContext)
    const navigate=useNavigate()
    const [state, setState] = useState({
        faculty_id: 0,
        user_id: 0
    });
    const [faculties, setFaculties] = useState([]);
    const [users, setUsers] = useState([]);
    const [text, setText] = useState('');

    useEffect(()=>{
        if(user.role!=='Admin'){
            navigate(`/`)
        }
    },[navigate, user])
    
    useEffect(() => {
        const getFaculties = async () => {
            try {
                const { data } = await api.get('/faculties/listfac');
                setFaculties(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error(error.response?.data?.error || error.message);
            }
        };

        const getUsers = async () => {
            try {
                const { data } = await api.get('/users/listcitizen');
                setUsers(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error(error.response?.data?.error || error.message);
            }
        };

        getUsers();
        getFaculties();
    }, []);

    const setStudentManager = () => {
        if (state.faculty_id !== 0 && state.user_id !== 0) {
            try {
                api.post('/users/setrole', { id: state.user_id, role: 'Student' });
                api.post('/faculties/manager', state);
                setState({ faculty_id: 0, user_id: 0 });
                setText('Set student manager.');
            } catch (error) {
                console.error(error);
                setText('Error.');
            }
        } else {
            setText('Error: faculty or user not selected');
        }
    };

    return (
        <div>
            <h3>Set manager for faculty</h3>

            <p>Select faculty</p>
            <select
                value={state.faculty_id}
                onChange={(e) =>
                    setState(prev => ({ ...prev, faculty_id: Number(e.target.value) }))
                }
            >
                <option value={0}></option>
                {faculties.map(fac => (
                    <option value={fac.id} key={fac.id}>
                        {fac.name}
                    </option>
                ))}
            </select>

            <p>Select user</p>
            <select
                value={state.user_id}
                onChange={(e) =>
                    setState(prev => ({ ...prev, user_id: Number(e.target.value) }))
                }
            >
                <option value={0}></option>
                {users.map(user => (
                    <option value={user.id} key={user.id}>
                        {user.first_name} {user.last_name}, id: {user.id}
                    </option>
                ))}
            </select>

            <br />
            <button className="buttons-list" onClick={setStudentManager}>Set as student manager</button>
            <br />
            {text}
        </div>
    )
}

export default SetFacManager

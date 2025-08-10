import { useState, useContext, useEffect } from 'react'
import api from '../../services/api';
import { UserContext } from '../../Context'
import {useNavigate} from 'react-router'

function AddUni(props) {
    const user = useContext(UserContext)
    const navigate=useNavigate()
    const [uni, setUni] = useState('')
    const [text, setText] = useState('')
    const addUni = async () => {
        api.post(`/faculties/adduni`, { university: uni })
            .then((result) => {
                setText('Added ' + uni+ ' to blocked universities')
                setUni('')
            })
            .catch(err => console.error('api error: ', err));
    }
    useEffect(()=>{
        if(user.role!=='Admin'){
            navigate(`/`)
        }
    },[navigate, user])
    return (
        <div>
            <h3>Add new university in blockade:</h3>
            <p>Name:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setUni(inputItem)} value={uni} />
            <br />
            <button className="buttons-list" onClick={()=>addUni()}>Add</button>
            <br />
            {text}
        </div>
    )

}

export default AddUni
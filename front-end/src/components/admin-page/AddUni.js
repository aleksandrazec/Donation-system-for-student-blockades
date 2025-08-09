import { useState } from 'react'
import api from '../../services/api';

function AddUni(props) {

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
    return (
        <div>
            <h3>Add new university in blockade:</h3>
            <p>Name:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setUni(inputItem)} value={uni} />
            <br />
            <button onClick={()=>addUni()}>Add</button>
            <br />
            {text}
        </div>
    )

}

export default AddUni
import { useState, useEffect } from 'react'
import api from '../../services/api';

function AddFac(props) {
    const [state, setState] = useState({
        name: '',
        city: '',
        address: '',
        coordinates: '',
        working_hours: '',
        university: ''
    })
    const [unis, setUnis] = useState([])
    const [text, setText] = useState('')

    useEffect(() => {
        const getUnis = async () => {
            try {
                const { data } = await api.get('/faculties/listuni')
                console.log(data)
                setUnis(data);
            } catch (error) {
                console.error(error.response?.data?.error || error.message)
            }
        }
        getUnis()
    }, [])
    const addFac = async () => {
        api.post(`/faculties/addfac`, state)
            .then((result) => {
                setText('Added ' + state.name + ' to blocked universities')
                setState({
                    name: '',
                    city: '',
                    address: '',
                    coordinates: '',
                    working_hours: '',
                    university: ''
                })
            })
            .catch(err => console.error('api error: ', err));
    }
    return (
        <div>
            <h3>Add new faculty in blockade:</h3>
            <p>Name:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setState(prev => ({ ...prev, name: inputItem }))} value={state.name} />
            <br />
            <p>City:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setState(prev => ({ ...prev, city: inputItem }))} value={state.city} />
            <br />
            <p>Address:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setState(prev => ({ ...prev, address: inputItem }))} value={state.address} />
            <br />
            <p>Coordinates:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setState(prev => ({ ...prev, coordinates: inputItem }))} value={state.coordinates} />
            <br />
            <p>Working hours:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setState(prev => ({ ...prev, working_hours: inputItem }))} value={state.working_hours} />
            <br />
            <p>University:</p>
            <select  value={state.university} onChange={({ target: { value } }) => setState(prev => ({ ...prev, university: value }))}>
                {
                    unis.map(uni=> <option value={uni.name} key={uni.key}>{uni.name}</option>)
                }
            </select>
            <br />
            <button onClick={() => addFac()}>Add</button>
            <br />
            {text}
        </div>
    )

}

export default AddFac
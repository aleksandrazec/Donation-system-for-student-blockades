import { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import api from '../../services/api';

function EditFaculty(props) {
    const { id } = useParams()
    const [workingHours, setWorkingHours] = useState('')
    const [info, setInfo] = useState({
        id: '',
        name: '',
        city: '',
        address: '',
        coordinates: '',
        working_hours: '',
        university: '',
        user_id: ''
    })
    const [text, setText]= useState('')

    useEffect(() => {
        const getInfo = () => {
            try {
                api.post(`/faculties/info`, { id: id })
                    .then((result) => {
                        console.log(result.data)
                        setInfo(result.data)
                        setWorkingHours(result.data.working_hours)
                    })
                    .catch(err => console.error('api error: ', err));
            } catch (error) {
                console.error('error: ', error)
            }
        }
        getInfo()
    }, [id])

    const edit = async () => {
        try {
            api.post(`/faculties/update`, { id: id, field: 'working_hours', info: workingHours })
                .then((result) => {
                    console.log(result.data)
                    setInfo(prev => ({ ...prev, working_hours: workingHours }))
                    setWorkingHours(workingHours)
                    setText('Updated working hours to '+workingHours)
                })
                .catch(err => console.error('api error: ', err));
        } catch (error) {
            console.error('error: ', error)
        }
    }

    return (
        <div>
            <h3>Change {info.name} information:</h3>
            <p>Working hours:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setWorkingHours(inputItem)} value={workingHours} placeholder={workingHours}/>
            <br/>
            <button onClick={()=>edit()}>Edit</button>
            <p>{text}</p>
        </div>
    )
}

export default EditFaculty
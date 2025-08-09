import { useState, useEffect } from 'react'
import api from '../../services/api';

function SetFacManager(props){
    const [state, setState]=useState({
        faculty_id: 0,
        user_id: 0
    })
    const [faculties, setFaculties]=useState([])
    useEffect(() => {
        const getFaculties = async () => {
            try {
                const { data } = await api.get('/faculties/listfac')
                console.log(data)
                setFaculties(data);
            } catch (error) {
                console.error(error.response?.data?.error || error.message)
            }
        }
        getFaculties()
    }, [])
    return(
        <div>
            <h3>Set manager for faculty</h3>
            <p>Select faculty</p>
            <input list='item' onChange={({target: {value: inputItem}}) => setState(prevState=>({...prevState, item: inputItem}))} value={state.item}/>
            <datalist id='item'>

            </datalist>
        </div>
    )
}

export default SetFacManager
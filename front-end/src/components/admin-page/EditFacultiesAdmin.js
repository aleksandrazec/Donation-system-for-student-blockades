import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context'
import api from '../../services/api';
import {useNavigate} from 'react-router'

function EditFacultiesAdmin(props) {
    const user = useContext(UserContext)
    const [faculties, setFaculties] = useState();
    const navigate=useNavigate()

    useEffect(() => {

        const getFaculties = () => {
            try {
                api.get(`/faculties/find`)
                    .then(result => {
                        console.log(result.data)
                        setFaculties(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }

        }
        getFaculties()
    },[])
    useEffect(()=>{
        if(user.role!=='Admin'){
            navigate(`/`)
        }
    },[navigate, user])
    const goToPage=(id)=>{
        try {
            navigate(`/editfacs/${id}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h3>Choose faculty to edit</h3>
            {
                faculties ?
                    faculties.map(fac => <div>
                        <button onClick={()=>goToPage(fac.id)} key={fac.id}>Edit {fac.name}</button><br />
                    </div>
                    )
                    :
                    <p>Loading</p>
            }
        </div>
    )
}

export default EditFacultiesAdmin
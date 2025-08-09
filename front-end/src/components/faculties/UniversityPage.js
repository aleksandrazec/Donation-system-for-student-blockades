import {useState, useEffect} from 'react';
import api from '../../services/api';
import {useParams} from 'react-router';
import FacultyCard from './FacultyCard'

function UniversityPage(props){
    const{name}=useParams();

    const [faculties, setFaculties] = useState();


    useEffect(()=>{

    const getFaculties = ()=>{
        try {
            api.post(`/faculties/find`, {university: name})
            .then(result=>{
                console.log(result.data)
                setFaculties(result.data)})
            .catch(err=>console.error(err))
        } catch (error) {
            console.error(error)
        }
        
    } 
        getFaculties()
    },[name])
    return(
        <div>
            {
                name ?
                <h1>{name}</h1>
                :
                <p>Loading</p>
            }

        {
            faculties ?
            faculties.map(fac => <FacultyCard name={fac.name} key={fac.id} id={fac.id}/>)
            :
            <p>Loading</p>
        }
        </div>
    )
}

export default UniversityPage;
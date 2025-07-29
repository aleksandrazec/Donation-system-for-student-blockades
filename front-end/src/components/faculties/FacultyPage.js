import {useState, useEffect} from 'react';
import api from '../../services/api';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router';

function FacultyPage(props){
    const{id}=useParams();
    const navigate=useNavigate()


    const [info, setInfo] = useState({
        name:undefined,
        university:undefined,
        address:undefined,
        city:undefined,
        coordinates:undefined,
        working_hours:undefined
    });

   

    const goToUni=async()=>{
    try {
        navigate(`/university/${info.university}`)
    } catch (error) {
        console.error(error)
    }
   }

    useEffect(()=>{
         const getInfo = ()=>{
        try {
            api.post(`/faculties/info`, {id: id})
            .then(result=>{
                setInfo(result.data[0])})
            .catch(err=>console.error(err))
        } catch (error) {
            console.error(error)
        }
    } 
        getInfo();
    },[id])
    return(
        <div>
            {
                info ?
                <div>
                    <h1>{info.name}</h1>
                    <h3>Of university: <h3 onClick={()=>{goToUni()}}>{info.university}</h3></h3>
                    <h3>Working hours: {info.working_hours}</h3>
                    <h3>City: {info.city}</h3>
                    <h3>Address: {info.address}</h3>
                    <h3>Coordinates: {info.coordinates}</h3>
                </div>
                :
                <p>Loading</p>
            }
        </div>
    )
}

export default FacultyPage;
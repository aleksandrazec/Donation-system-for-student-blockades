import { useState, useEffect } from "react";
import api from '../../services/api';
import UniversityCard from './UniversityCard';

function FacultiesHome(props){
    const [unis, setUnis]=useState([]);

    const getData = async()=>{
        try{
            const data = await api.get(`/faculties/listuni`)
            setUnis(data)
        }catch(error){
            console.error('error: ', error)
        }
    }

    useEffect(()=>{
        getData();
        console.log(unis);
    },[])

    return(
        <div>
            {
                unis.map(uni=> <UniversityCard name={uni.university}/>)
            }
        </div>
    )
}

export default FacultiesHome;
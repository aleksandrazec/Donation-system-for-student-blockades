import {useState, useEffect} from 'react'
import { useParams } from 'react-router';
import api from '../../services/api';

function EditPage(props){
    const { id } = useParams();
    const [data, setData]=useState({
        id: undefined,
        quantity: undefined,
        date: undefined,
        item: undefined,
        faculty_id: undefined,
        urgency_level: undefined
    })
    const [quantity, setQuantity]=useState()
    const [urgencyLevel, setUgrencyLevel]=useState()

    useEffect(()=>{
        const getFacultyID= ()=>{
            try {
                api.post(`/donationrequests/getreq`, { id: id })
                    .then((result) => {
                        console.log(result.data)
                        setData(result.data);
                    })
                    .catch(err => console.error('api error: ', err));

            } catch (error) {
                console.error('error: ', error)
            }
        }
        getFacultyID()
    },[])

    return(
        <div>
            
            <button>Delete</button>
        </div>
    )
}

export default EditPage
import api from '../../services/api';
import { useState, useEffect } from 'react'
import EditTable from './EditTable'
import { useParams } from 'react-router';

function EditDonationRequests(props) {
    const [requests, setRequests] = useState()
    const { id } = useParams();
    useEffect(() => {
        const getRequests = async () => {
            try {
                api.post(`/donationrequests/listforfac`, { id: id })
                    .then((result) => {
                        console.log(result.data)
                        const modifiedData = result.data.map(item => ({
                            ...item,
                            Edit: 'Edit',
                        }));
                        setRequests(modifiedData);
                    })
                    .catch(err => console.error('api error: ', err));

            } catch (error) {
                console.error('error: ', error)
            }
        }
        getRequests()
    }, [id])

    return (
        <EditTable data={requests}/>
    )
}

export default EditDonationRequests
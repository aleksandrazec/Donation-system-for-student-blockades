import api from '../../services/api';
import { useState, useEffect, useContext } from 'react'
import EditTable from './EditTable'
import { UserContext } from '../../Context'
import { useParams, useNavigate } from 'react-router';

function EditDonationRequests(props) {
    const [requests, setRequests] = useState()
    const { id } = useParams();
    const user = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (user.role !== 'Student') {
            navigate(`/`)
        }
    }, [navigate, user])
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
        <div>
            <h1>Edit donation requests:</h1>
            <EditTable data={requests} />
        </div>
    )
}

export default EditDonationRequests
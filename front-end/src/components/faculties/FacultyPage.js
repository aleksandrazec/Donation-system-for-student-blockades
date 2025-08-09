import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Table from '../donations/Table'
import ForumCard from '../forums/ForumCard'

function FacultyPage(props) {
    const { id } = useParams();
    const navigate = useNavigate()

    const [forums, setForums] = useState()
    const [requests, setRequests] = useState()

    const [info, setInfo] = useState({
        name: '',
        university: '',
        address: '',
        city: '',
        coordinates: '',
        working_hours: ''
    });



    const goToUni = async () => {
        try {
            navigate(`/university/${info.university}`)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const getInfo = () => {
            try {
                api.post(`/faculties/info`, { id: id })
                    .then(result => {
                        setInfo(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        const getForums = () => {
            try {
                api.post(`/forums/listallfac`, { id: id })
                    .then(result => {
                        console.log(result.data)
                        setForums(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        const getRequests = async () => {
            try {
                api.post(`/donationrequests/listforfac`, { id: id })
                    .then((result) => {
                        console.log(result.data)
                        setRequests(result.data);
                    })
                    .catch(err => console.error('api error: ', err));

            } catch (error) {
                console.error('error: ', error)
            }
        }
        getRequests()
        getForums();
        getInfo();
    }, [id])
    return (
        <div>
            {
                info.name !== '' ?
                    <div>
                        <h1>{info.name}</h1>
                        <h3 onClick={() => { goToUni() }}>Of university: {info.university}</h3>
                        <h3>Working hours: {info.working_hours}</h3>
                        <h3>City: {info.city}</h3>
                        <h3>Address: {info.address}</h3>
                        <h3>Coordinates: {info.coordinates}</h3>
                    </div>
                    :
                    <p>Loading</p>
            }
            {
                requests ?
                    <div>
                        <h1>Donation requests</h1>
                        <Table data={requests} />
                    </div>
                    :
                    <p>No donation requests available.</p>
            }

            <div>
                <h1>Forums</h1>
                {
                    forums && forums.length > 0?
                    forums.map(forum=> <ForumCard prompt={forum.prompt} date={forum.date} name={forum.name} id={forum.id} key={forum.id} faculty_id={forum.faculty_id}/>)
                                    :
                        <p>No forums available.</p>
                }
            </div>

        </div>
    )
}

export default FacultyPage;
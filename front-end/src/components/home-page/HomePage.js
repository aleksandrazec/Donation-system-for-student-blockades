import { useContext, useEffect, useState } from "react"
import { UserContext } from '../../Context'
import Table from '../donations/Table'
import api from '../../services/api';

function HomePage(props) {
    const user = useContext(UserContext)
    const [userInfo, setUserInfo] = useState({
        id: 0,
        first_name: '',
        last_name: '',
        city: '',
        role: 'Guest',
        email: '',
        password: ''
    })
    const [requestCity, setRequestCity] = useState()
    const [request, setRequest] = useState()

    useEffect(() => {
        const getRequests = async () => {
            try {
                const { data } = await api.post('/search/',
                    { filter: false, sort: false });
                setRequest(data);
                console.log(data)
            } catch (err) {
                console.error(err.response?.data?.error || err.message);
            }
        }
        getRequests()
    }, [])

    useEffect(() => {
        if (user.role === 'Citizen' || user.role === 'Student' || user.role === 'Admin') {
            const getUserInfo = async () => {
                try {
                    api.post(`/users/getinfo`, { id: user.user_id })
                        .then((result) => {
                            console.log(result.data);
                            setUserInfo(result.data)
                        })
                        .catch(err => console.error('api error: ', err));
                } catch (error) {
                    console.error('error: ', error)
                }
            }
            getUserInfo()
        }
    }, [user])

    useEffect(() => {
        const getRequestsForCity = async () => {
            try {
                api.post(`/donationrequests/listforcity`, { city: userInfo.city })
                    .then((result) => {
                        console.log(result.data);
                        setRequestCity(result.data)
                    })
                    .catch(err => console.error('api error: ', err));
            } catch (error) {
                console.error('error: ', error)
            }
        }
        getRequestsForCity()
    }, [userInfo])

    return (
        <div>
            <h1>Donation system for faculties in blockade</h1>
            {
                requestCity ?
                    <div>
                        <h3>Relevant for your city: </h3>
                        <Table data={requestCity} />
                    </div>
                    :
                    <></>
            }
            <div>
                <h3>Recent donation requests: </h3>
                <Table data={request} />
            </div>
        </div>
    )

}
export default HomePage
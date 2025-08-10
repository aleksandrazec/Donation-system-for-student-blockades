import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { UserContext } from '../../Context'
import api from '../../services/api';

function EditFacultyAdmin(props) {
    const { id } = useParams()
    const user = useContext(UserContext)
    const [workingHours, setWorkingHours] = useState('')
    const [city, setCity] = useState('')
    const [coordinates, setCoordinates] = useState('')
    const [address, setAddress] = useState('')
    const navigate=useNavigate()
    const [info, setInfo] = useState({
        id: '',
        name: '',
        city: '',
        address: '',
        coordinates: '',
        working_hours: '',
        university: '',
        user_id: ''
    })
    const [text, setText] = useState({
        city: '',
        workingHours: '',
        address: '',
        coordinates: ''
    })
    useEffect(()=>{
        if(user.role!=='Admin'){
            navigate(`/`)
        }
    },[navigate, user])
    useEffect(() => {
        const getInfo = () => {
            try {
                api.post(`/faculties/info`, { id: id })
                    .then((result) => {
                        console.log(result.data)
                        setInfo(result.data)
                        setWorkingHours(result.data.working_hours)
                        setAddress(result.data.address)
                        setCity(result.data.city)
                        setCoordinates(result.data.coordinates)
                    })
                    .catch(err => console.error('api error: ', err));
            } catch (error) {
                console.error('error: ', error)
            }
        }
        getInfo()
    }, [id])

    const edit = async () => {
        if (city!==info.city) {
            try {
                api.post(`/faculties/update`, { id: id, field: 'city', info: city })
                    .then((result) => {
                        console.log(result.data)
                        setInfo(prev => ({ ...prev, city: city }))
                        setCity(city)
                        setText(prev => ({ ...prev, city: 'Updated city to ' + city }))
                    })
                    .catch(err => console.error('api error: ', err));
            } catch (error) {
                console.error('error: ', error)
            }
        }
        if (address!==info.address) {
            try {
                api.post(`/faculties/update`, { id: id, field: 'address', info: address })
                    .then((result) => {
                        console.log(result.data)
                        setInfo(prev => ({ ...prev, address: address }))
                        setAddress(address)
                        setText(prev => ({ ...prev, address: 'Updated address to ' + address }))
                    })
                    .catch(err => console.error('api error: ', err));
            } catch (error) {
                console.error('error: ', error)
            }
        }
        if (coordinates!==info.coordinates) {
            try {
                api.post(`/faculties/update`, { id: id, field: 'coordinates', info: coordinates })
                    .then((result) => {
                        console.log(result.data)
                        setInfo(prev => ({ ...prev, coordinates: coordinates }))
                        setCoordinates(caches)
                        setText(prev => ({ ...prev, coordinates: 'Updated coordinates to ' + coordinates }))
                    })
                    .catch(err => console.error('api error: ', err));
            } catch (error) {
                console.error('error: ', error)
            }
        }
        if (workingHours!==info.working_hours) {
            try {
                api.post(`/faculties/update`, { id: id, field: 'working_hours', info: workingHours })
                    .then((result) => {
                        console.log(result.data)
                        setInfo(prev => ({ ...prev, working_hours: workingHours }))
                        setWorkingHours(workingHours)
                        setText(prev => ({ ...prev, workingHours: 'Updated working hours to ' + workingHours }))
                    })
                    .catch(err => console.error('api error: ', err));
            } catch (error) {
                console.error('error: ', error)
            }
        }
    }

    const deleteFac = async() => {
        try {
            api.post(`/faculties/removefac`, { id: id })
                .then((result) => {
                    navigate(`/editfacs`)
                })
                .catch(err => console.error('api error: ', err));
        } catch (error) {
            console.error('error: ', error)
        }
    }

    return (
        <div>
            <h3>Change {info.name} information:</h3>
            <p>City:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setCity(inputItem)} value={city} placeholder={city} />
            <br />
            <p>Address:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setAddress(inputItem)} value={address} placeholder={address} />
            <br />
            <p>Coordinates:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setCoordinates(inputItem)} value={coordinates} placeholder={coordinates} />
            <br />
            <p>Working hours:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setWorkingHours(inputItem)} value={workingHours} placeholder={workingHours} />
            <br />
            <button className="buttons-list" onClick={() => edit()}>Edit</button>
            <br />
            <button className="buttons-list" onClick={() => deleteFac()}>Delete</button>
            <br />
            {text.city}
            <br />
            {text.address}
            <br />
            {text.coordinates}
            <br />
            {text.workingHours}
        </div>
    )

}

export default EditFacultyAdmin
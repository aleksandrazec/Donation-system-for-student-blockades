import { UserContext } from '../../Context'
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import api from '../../services/api'

function EditProfile(props) {
    const user = useContext(UserContext)
    const navigate = useNavigate()
    const [info, setInfo] = useState({
        id: 0,
        first_name: '',
        last_name: '',
        city: '',
        role: 'Guest',
        email: '',
        password: ''
    })

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [city, setCity] = useState('')
    const [text, setText] = useState({
        firstName: '',
        lastName: '',
        city: ''
    })


    useEffect(() => {
        const getInfo = async () => {
            try {
                api.post(`/users/getinfo`, { id: user.user_id })
                    .then((result) => {
                        console.log(result.data);
                        setInfo(result.data)
                        setFirstName(result.data.first_name)
                        setLastName(result.data.last_name)
                        setCity(result.data.city)
                    })
                    .catch(err => console.error('api error: ', err));
            } catch (error) {
                console.error('error: ', error)
            }
        }
        getInfo()
    }, [user])

    const edit = async () => {
        if (info.first_name !== firstName) {
            try {
                api.post(`/users/update`, { id: user.user_id, field: 'first_name', info: firstName })
                    .then((result) => {
                        console.log(result.data)
                        setInfo(prev => ({ ...prev, first_name: firstName }))
                        setText(prev => ({ ...prev, firstName: 'First name updated to ' + firstName }))
                    })
                    .catch(err => console.error('api error: ', err));
            } catch (error) {
                console.error('error: ', error)
            }
        }
        if (info.last_name !== lastName) {
            try {
                api.post(`/users/update`, { id: user.user_id, field: 'last_name', info: lastName })
                    .then((result) => {
                        console.log(result.data)
                        setInfo(prev => ({ ...prev, last_name: lastName }))
                        setText(prev => ({ ...prev, lastName: 'Last name updated to ' + lastName }))
                    })
                    .catch(err => console.error('api error: ', err));
            } catch (error) {
                console.error('error: ', error)
            }
        }
        if (info.city !== city) {
            try {
                api.post(`/users/update`, { id: user.user_id, field: 'city', info: city })
                    .then((result) => {
                        console.log(result.data)
                        setInfo(prev => ({ ...prev, city: city }))
                        setText(prev => ({ ...prev, city: 'City updated to ' + city }))
                    })
                    .catch(err => console.error('api error: ', err));
            } catch (error) {
                console.error('error: ', error)
            }
        }
    }

    const deleteProfile = async () => {
        try {
            api.post(`/users/delete`, { id: user.user_id })
                .then((result) => {
                    console.log(result.data)
                    navigate(`/login`)
                })
                .catch(err => console.error('api error: ', err));
        } catch (error) {
            console.error('error: ', error)
        }
    }

    return (
        <div>
            <h3>Edit profile</h3>
            <p>First Name:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setFirstName(inputItem)} value={firstName || ''} />
            <br />
            <p>Last Name:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setLastName(inputItem)} value={lastName || ''} />
            <br />
            <p>City:</p>
            <input list='text' onChange={({ target: { value: inputItem } }) => setCity(inputItem)} value={city || ''} />
            <br />
            <button onClick={() => edit()}>Edit</button>
            <br />
            <button onClick={() => deleteProfile()}>Delete</button>
            <br />
            {text.firstName}
            <br />
            {text.lastName}
            <br />
            {text.city}
            <br />
        </div>
    )
}

export default EditProfile
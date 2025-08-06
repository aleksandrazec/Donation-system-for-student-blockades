import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { UserContext } from '../../Context'
import api from '../../services/api';


function FacultiesGeneral(props) {
    const user = useContext(UserContext)
    const [faculty, setFaculty] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        if (user.role === 'Guest' || user.role === 'Citizen') {
            try {
                navigate('/faculties')
            } catch (error) {
                console.error(error)
            }
        } else if (user.role === 'Admin') {
            setFaculty({})
        } else if (user.role === 'Student') {
            try {
                api.post(`/users/getfac`, { id: user.user_id })
                    .then(result => {
                        console.log(result.data)
                        setFaculty(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        } else {
            console.error("this is not a user role")
            navigate('/faculties')
        }
    }, [user, navigate])

    const createNewRequest = async () => {
        try {
            navigate(`/create/${faculty.id}`)
        } catch (error) {
            console.error(error)
        }
    }
    const editRequests = async () => {
        try {
            navigate(`/edit/${faculty.id}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            {
                faculty ?
                    <div>
                        <h3>You're the student manager of {faculty.name}</h3>
                        <button onClick={()=>createNewRequest()}>Add new donation request</button>
                        <button onClick={()=>editRequests()}>Edit donation requests</button>
                        <button>Add new forum</button>
                        <button>Edit forums</button>
                        <button>Edit faculty information</button>
                    </div>
                    :
                    <div>
                        <h3>You're an admin</h3>
                        <button>Add new university in blockade</button>
                        <button>Add new faculty in blockade</button>
                        <button>Edit faculties in blockade</button>
                    </div>
            }
        </div>
    )
}
export default FacultiesGeneral
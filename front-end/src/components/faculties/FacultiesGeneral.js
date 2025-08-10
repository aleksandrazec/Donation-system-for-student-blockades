import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { UserContext } from '../../Context'
import api from '../../services/api';


function FacultiesGeneral(props) {
    const user = useContext(UserContext)
    const [faculty, setFaculty] = useState({
        name: '',
        city: '',
        address: '',
        coordinates: '',
        working_hours: '',
        university: '',
        id: ''
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (user.role === 'Guest' || user.role === 'Citizen') {
            try {
                navigate('/facultieshome')
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
            navigate('/facultieshome')
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
    const createForum = async () => {
        try {
            navigate(`/createf/${faculty.id}`)
        } catch (error) {
            console.error(error)
        }
    }
    const deleteForum = async () => {
        try {
            navigate(`/editf/${faculty.id}`)
        } catch (error) {
            console.error(error)
        }
    }
    const facHome = async () => {
        try {
            navigate(`/facultieshome`)
        } catch (error) {
            console.error(error)
        }
    }
    const editFac = async () => {
        try {
            navigate(`/editfac/${faculty.id}`)
        } catch (error) {
            console.error(error)
        }
    }
    const addUni = async () => {
        try {
            navigate(`/adduni`)
        } catch (error) {
            console.error(error)
        }
    }
    const addFac = async () => {
        try {
            navigate(`/addfac`)
        } catch (error) {
            console.error(error)
        }
    }
    const setFacManger = async () => {
        try {
            navigate(`/facman`)
        } catch (error) {
            console.error(error)
        }
    }
    const editFaculties = async () => {
        try {
            navigate(`/editfacs`)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            {
                faculty.id && user.role === "Student" ?
                    <div className="button-div">
                        <h1>You're the student manager of {faculty.name}</h1>
                        <button className="buttons-list" onClick={() => editFac()}>Edit faculty information</button><br />
                        <button className="buttons-list" onClick={() => createNewRequest()}>Add new donation request</button><br />
                        <button className="buttons-list" onClick={() => editRequests()}>Edit donation requests</button><br />
                        <button className="buttons-list" onClick={() => createForum()}>Add new forum</button><br />
                        <button className="buttons-list" onClick={() => deleteForum()}>Delete forums</button><br />
                    </div>
                    :
                    user.role === "Admin" ?
                        <div className="button-div">
                            <h1>You're an admin</h1>
                            <button className="buttons-list" onClick={() => addUni()}>Add new university in blockade</button><br />
                            <button className="buttons-list" onClick={() => addFac()}>Add new faculty in blockade</button><br />
                            <button className="buttons-list" onClick={() => setFacManger()}>Set faculty's student manager</button><br />
                            <button className="buttons-list" onClick={() => editFaculties()}>Edit faculties in blockade</button><br />
                        </div>
                        :
                        <></>
            }
            <div className="button-div">
                <h1>Look at faculties in blockade</h1>
                <button onClick={() => facHome()}>Faculties Home</button>
            </div>
        </div>
    )
}
export default FacultiesGeneral
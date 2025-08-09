import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import { UserContext } from '../../Context'
import api from '../../services/api'

function Profile(props) {
    const user = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({
        id: 0,
        first_name: '',
        last_name: '',
        city: '',
        role: 'Guest',
        email: '',
        password: ''
    })

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
        } else {
            navigate(`/login`)
        }
    }, [user, navigate])

    const resign = async () => {
        try {
            api.get(`/users/setrole`, { id: userInfo.id, role: 'Citizen' })
                .then((result) => {
                    console.log(result.data);
                    setUserInfo(prev => ({ ...prev, role: 'Citizen' }))
                })
                .catch(err => console.error('api error: ', err));
        } catch (error) {
            console.error('error: ', error)
        }
    }

    const logout = async () => {
        try {
            api.get(`/users/logout`)
                .then((result) => {
                    console.log(result.data);
                    setUser({
                        role: 'Guest',
                        user_id: 0
                    })
                    navigate(`/`)
                })
                .catch(err => console.error('api error: ', err));
        } catch (error) {
            console.error('error: ', error)
        }
    }

    const edit=async()=>{
        try {
            navigate(`/editprofile`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Your profile</h1>
            <h3>{userInfo.first_name} {userInfo.last_name}</h3>
            <h3>Email: {userInfo.email}</h3>
            <h3>City: {userInfo.city}</h3>
            <h3>Role: {userInfo.role}</h3>
            {
                userInfo.role === "Student" || userInfo.role === "Admin" ?
                    <div>
                        <button onClick={() => resign()}>Resign as {userInfo.role}</button><br />
                    </div>
                    :
                    <></>
            }
            <button onClick={()=>edit()}>Edit profile</button><br />
            <button onClick={() => logout()}>Logout</button><br />
        </div>
    )
}

export default Profile
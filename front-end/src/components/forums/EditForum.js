import { useState, useEffect, useContext } from 'react'
import ForumCard from './ForumCard'
import api from '../../services/api'
import { UserContext } from '../../Context'
import { useParams, useNavigate } from 'react-router';

function EditForum(props) {
    const user = useContext(UserContext)
    const navigate = useNavigate()
    const { id } = useParams();
    const [forums, setForums] = useState([])
    useEffect(()=>{
        if(user.role!=='Student'){
            navigate(`/`)
        }
    },[navigate, user])
    useEffect(() => {
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

        getForums();
    }, [id])

    const deleteForum = async (id) => {
        try {
            api.post(`/forums/delete`, { id: id })
                .then(result => {
                    console.log(result.data)
                    setForums([])
                    id = id
                })
                .catch(err => console.error(err))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Forums</h1>
            {
                forums ?
                    forums.map(forum =>
                        <div>
                            <ForumCard prompt={forum.prompt} date={forum.date} name={forum.name} id={forum.id} key={forum.id} faculty_id={forum.faculty_id} />
                            <button key={forum.id + 'button'} onClick={() => deleteForum(forum.id)}>Delete</button>
                        </div>)
                    :
                    <></>
            }
        </div>
    )
}

export default EditForum
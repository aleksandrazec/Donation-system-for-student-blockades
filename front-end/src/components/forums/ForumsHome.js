import { useState, useEffect } from 'react'
import ForumCard from './ForumCard'
import api from '../../services/api'

function ForumsHome(props) {
    const [forums, setForums] = useState()

    useEffect(() => {
        const getForums = () => {
            try {
                api.post(`/forums/listall`, 'ASC')
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
    }, [])


    return (
        <div>
            <h1>Forums</h1>
            {
                forums ?
                forums.map(forum=>
                <ForumCard prompt={forum.prompt} date={forum.date} name={forum.name} id={forum.id} key={forum.id} faculty_id={forum.faculty_id}/>)
                :
                <></>
            }
        </div>
    )
}

export default ForumsHome
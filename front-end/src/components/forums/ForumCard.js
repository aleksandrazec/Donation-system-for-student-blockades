import { useNavigate } from 'react-router'

function ForumCard(props) {

    const navigate = useNavigate()

    const {
        prompt,
        date,
        name,
        id,
        faculty_id
    } = props

    const goToForum=async()=>{
        try {
            navigate(`/forums/${id}`)
        } catch (error) {
            console.error(error)
        }
    }


    const goToFaculty = async () => {
        try {
            navigate(`/faculty/${faculty_id}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div>
                <h2 onClick={()=>goToForum()}>{prompt}</h2>
            </div>
            <h3>Posted on {date} by <span onClick={() => goToFaculty()}>{name}</span></h3>
        </div>
    )

}

export default ForumCard
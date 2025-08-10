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
                <h3 onClick={()=>goToForum()}>{prompt}</h3>
            </div>
            <p>Posted on {date} by <span style={{ textDecoration: "underline", color: "#D90429" }} onClick={() => goToFaculty()}>{name}</span></p>
        </div>
    )

}

export default ForumCard
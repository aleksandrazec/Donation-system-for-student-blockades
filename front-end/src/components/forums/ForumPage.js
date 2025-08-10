import { useParams, useNavigate } from 'react-router'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../Context'
import api from '../../services/api';
import Comment from './Comment'

function ForumPage(props) {
    const { id } = useParams()
    const navigate = useNavigate()
    const user = useContext(UserContext)

    const [info, setInfo] = useState({
        prompt: undefined,
        id: undefined,
        date: undefined,
        faculty_id: undefined,
        name: undefined
    })
    const [comments, setComments] = useState()
    const [commentToBe, setCommentToBe] = useState()
    const [text, setText] = useState('')

    const goToFaculty = async () => {
        try {
            navigate(`/facultypage/${info.faculty_id}`)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const getInfo = () => {
            try {
                api.post(`/forums/find`, { id })
                    .then(result => {
                        setInfo(result.data[0])
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        const getComments = () => {
            try {
                api.post(`/forums/getcomments`, { id })
                    .then(result => {
                        setComments(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        getComments();
        getInfo();
    }, [id])

    const postComment = async () => {
        if (user.role === 'Guest') {
            setText('Please log in to post comments')
        } else {
            try {
                api.post(`/forums/comment`, { text: commentToBe, user_id: user.user_id, forum_id: id })
                    .then(result => {
                        setCommentToBe('')
                        window.location.reload(false);

                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div>
            {
                info ?
                    <div>
                        <div>
                            <h1>{info.prompt}</h1>
                        </div>
                        <h3>Posted on {info.date} by <span onClick={() => goToFaculty()} style={{ textDecoration: "underline", color: "#D90429" }}>{info.name}</span></h3>
                    </div>
                    :
                    <></>
            }
            <div>
                <input  className='comment' type="text" id="comment" name="comment" onChange={({ target: { value: input } }) => setCommentToBe(input)} value={commentToBe} />
                <button className='reply-button' onClick={() => postComment()}>Comment</button>
                <p>{text}</p>
                {
                    comments && comments.length > 0?
                        <div>
                            <h1>Comments: </h1>
                            {comments.map(com => <Comment id={com.id} forum_id={com.forum_id} text={com.text} key={com.id} date={com.date} first_name={com.first_name} last_name={com.last_name} user_id={com.user_id} />)}
                        </div>
                        :
                        <h1>No comments yet.</h1>
                }
            </div>
        </div>
    )
}

export default ForumPage
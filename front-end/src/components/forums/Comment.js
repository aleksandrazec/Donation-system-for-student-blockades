import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../Context'
import api from '../../services/api'

function Comment(props) {
    const {
        id,
        text,
        date,
        first_name,
        last_name,
        forum_id
    } = props
    const user = useContext(UserContext)
    const [replies, setReplies] = useState()
    const [replyToBe, setReplyToBe] = useState()
    const [textt, setTextt] = useState('')
    useEffect(() => {
        const getReplies = () => {
            try {
                api.post(`/forums/getreplies`, { id:id })
                    .then(result => {
                        console.log(result.data)
                        setReplies(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }

        getReplies();
    }, [id])

    const postReply = async () => {
        if (user.role === 'Guest') {
            setTextt('Please log in to post comments')
        } else
            try {
                api.post(`/forums/reply`, { text: replyToBe, user_id: user.user_id, forum_id: forum_id, reply_id: id })
                    .then(result => {
                        setReplyToBe('')
                        window.location.reload(false);
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
    }


    return (
        <div>
            <h2>{text}</h2>
            <h3>Posted on {date} by {first_name} {last_name}</h3>
            <input type="text" id="reply" name="reply" onChange={({ target: { value: input } }) => setReplyToBe(input)} value={replyToBe} /><br />
            <button onClick={() => postReply()}>Reply</button>
            <p>{textt}</p>
            <div id='replies' style={{ color: "red" }}>
                {
                    replies ?
                        replies.map(com => <Comment id={com.id} forum_id={com.forum_id} text={com.text} key={com.id} date={com.date} first_name={com.first_name} last_name={com.last_name} user_id={com.user_id} />)
                        :
                        <></>
                }
            </div>
        </div>
    )
}
export default Comment
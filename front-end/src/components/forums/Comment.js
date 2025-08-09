import { useState, useEffect } from 'react'
import api from '../../services/api'

function Comment(props) {
    const {
        id,
        text,
        date,
        first_name,
        last_name,
        user_id,
        forum_id
    } = props

    const [replies, setReplies] = useState()
    const [replyToBe, setReplyToBe] = useState()

    useEffect(() => {
        const getReplies = () => {
            try {
                api.post(`/forums/getreplies`, { id })
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
    }, [])

    const postReply = async () => {
        try {
            api.post(`/forums/reply`, { text: replyToBe, user_id: 1, forum_id: forum_id, reply_id: id })
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
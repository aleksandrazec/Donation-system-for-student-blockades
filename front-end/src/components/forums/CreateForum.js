import { useParams } from 'react-router';
import { useState } from 'react';
import api from '../../services/api';

function CreateForum(props) {
    const { id } = useParams();
    const [prompt, setPrompt] = useState('')
    const [text, setText] = useState('')
    const createForum = () => {
        try {
            api.post(`/forums/create`, { prompt: prompt, faculty_id: id})
                .then(result => {
                    setText('Created forum with following prompt: '+prompt)
                    setPrompt('')
                })
                .catch(err => console.error(err))
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div>
            <h3>Create Forum</h3>
            <p>Type in prompt</p>
            <input type="text" id="prompt" name="prompt" onChange={({ target: { value: input } }) => setPrompt(input)} value={prompt} /><br />
            <button onClick={()=>createForum()}>Post</button><br />
            {text}
        </div>
    )
}

export default CreateForum
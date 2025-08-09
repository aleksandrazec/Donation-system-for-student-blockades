import { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import api from '../../services/api';
import { useNavigate } from 'react-router';

function EditPage(props) {
    const { id } = useParams();
    const navigate = useNavigate()

    const [data, setData] = useState({
        id: undefined,
        quantity: undefined,
        date: undefined,
        item: undefined,
        faculty_id: undefined,
        urgency_level: undefined
    })
    const [quantity, setQuantity] = useState(0)
    const [urgencyLevel, setUgrencyLevel] = useState('')
    const [text, setText] = useState({
        quantity: '',
        urgencyLevel: ''
    })

    useEffect(() => {
        const getData = () => {
            try {
                api.post(`/donationrequests/getreq`, { id: id })
                    .then((result) => {
                        console.log(result.data)
                        setData(result.data);
                        setQuantity(result.data.quantity)
                        setUgrencyLevel(result.data.urgency_level)
                    })
                    .catch(err => console.error('api error: ', err));

            } catch (error) {
                console.error('error: ', error)
            }
        }
        getData()
    }, [id])

    const edit = async () => {
        if (quantity !== data.quantity) {
            try {
                api.post(`/donationrequests/update`, { id: id, field: 'quantity', info: quantity })
                    .then((result) => {
                        console.log(result.data)
                        setData(prev => ({ ...prev, quantity: quantity }))
                        setText(prev => ({ ...prev, quantity: 'Quantity updated to ' + quantity }))
                    })
                    .catch(err => console.error('api error: ', err));

            } catch (error) {
                console.error('error: ', error)
            }
        }
        if (urgencyLevel !== data.urgency_level) {
            try {
                api.post(`/donationrequests/update`, { id: id, field: 'urgency_level', info: urgencyLevel })
                    .then((result) => {
                        console.log(result.data)
                        setData(prev => ({ ...prev, urgency_level: urgencyLevel }))
                        setText(prev => ({ ...prev, urgencyLevel: 'Urgency level updated to ' + urgencyLevel }))
                    })
                    .catch(err => console.error('api error: ', err));

            } catch (error) {
                console.error('error: ', error)
            }
        }

    }

    const deleteReq = async () => {
        try {
            api.post(`/donationrequests/delete`, { id: id })
                .then((result) => {
                    try {
                        navigate(`/edit/${data.faculty_id}`)
                    } catch (error) {
                        console.error(error)
                    }
                })
                .catch(err => console.error('api error: ', err));
        } catch (error) {
            console.error('error: ', error)
        }
    }

    return (
        <div>
            {
                data ?
                    <div>
                        <p>Quantity:</p>
                        <input list='text' onChange={({ target: { value: inputItem } }) => setQuantity(inputItem)} value={quantity} />
                        <br />
                        <p>Urgency level:</p>
                        {
                            <select value={urgencyLevel} onChange={({ target: { value } }) => setUgrencyLevel(value)}>
                                <option value="Urgent" key="Urgent">Urgent</option>
                                <option value="Mildly urgent" key="Mildly urgent">Mildly urgent</option>
                                <option value="Not urgent" key="Not urgent">Not urgent</option>
                            </select>
                        }
                        <br />
                    </div>
                    :
                    <></>
            }
            <button onClick={() => edit()}>Edit</button>
            <br />
            <button onClick={() => deleteReq()}>Delete</button>
            <br />
            {text.quantity}
            <br />
            {text.urgencyLevel}
        </div >
    )
}

export default EditPage
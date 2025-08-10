import api from '../../services/api';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router';

function CreateDonationRequest(props){
    const [state, setState] = useState({
        quantity: 0,
        urgency_level: 'Urgent',
        item: '',
        type: '',
        faculty_id: 0,
    })

    const [items, setItems]=useState([])
    const [types, setTypes]=useState([])
    const [typeFromBackend, setTypeFromBackend] = useState("");
    const [text, setText]=useState('')

    const addDonationRequest = async()=>{
        try{
            api.post('/donationrequests/create', {  ...state, type: typeFromBackend !== '' ? typeFromBackend : state.type})
            setText('Created donation request.')
            setState(prev => ({ ...prev, quantity: 0, urgency_level: 'Urgent', item: '', type: '' }));
        }catch(error){
            console.error(error)
        }
    }

    const urgency_levels=['Urgent', 'Mildly urgent', 'Not urgent'];
    const {id}=useParams();

    useEffect(()=>{
        state.faculty_id=id;
    }, [state, id])

    useEffect(() => {
        const getTypes = async() => {
            try {
                const { data } = await api.get('/donationrequests/typelist')
                setTypes(data);
                console.log(data)
            } catch (error) {
                console.error(error.response?.data?.error || error.message)
            }
        }

        getTypes()
        
    }, [])

    useEffect(()=>{
        const getItems = async()=>{
            try {
                const { data } = await api.get('/donationrequests/subtypelist')
                console.log(data)
                setItems(data);
            } catch (error) {
                console.error(error.response?.data?.error || error.message)
            }
        }
        getItems()
    }, [])

    useEffect(() => {
        const getType = async () => {
            if (items?.some(i => i.subtype === state.item)) {
                try {
                    const { data } = await api.post('/donationrequests/gettype', { subtype: state.item });
                    setTypeFromBackend(data[0].type);
                    setState(prev => ({ ...prev, type: data[0].type }));
                    console.log("Type from backend:", data[0].type)
                } catch (err) {
                    console.error(err.response?.data?.error || err.message);
                }
            } else {
                setTypeFromBackend('');
                setState(prev => ({ ...prev, type: '' }));
            }
        };
        getType();
    }, [state.item, items]);

    return(
        <div>
            <h1>New donation request:</h1>
            <p>Item:</p>
            <input list='item' onChange={({target: {value: inputItem}}) => setState(prevState=>({...prevState, item: inputItem}))} value={state.item}/>
            <datalist id='item'>
                {
                    items?.map(existingItem=> <option value={existingItem.subtype} key={existingItem.subtype}/>)
                }
            </datalist>
            <p>Type of donation:</p>
            {
                typeFromBackend !== '' ?
                    <select id='types'>
                        <option value={typeFromBackend}>{typeFromBackend}</option>
                    </select>
                    :
                    <>
                        <input
                            list="types"
                            value={state.type}
                            onChange={({ target: { value } }) =>
                                setState(prev => ({ ...prev, type: value }))
                            }
                        />
                        <datalist id="types">
                            {types?.map(existingType => (
                                <option value={existingType} key={existingType} />
                            ))}
                        </datalist>
                    </>

            }
            <p>Quantity:</p>
            <input type='number' placeholder="Quantity" onChange={({target: {value: inputQuantity}}) => setState(prevState=>({...prevState, quantity: inputQuantity}))} value={state.quantity}/>
            <p>Urgency level:</p>
            <select  value={state.urgency_level} onChange={({ target: { value } }) => setState(prev => ({ ...prev, urgency_level: value }))}>
                {
                    urgency_levels.map(level=> <option value={level} key={level}>{level}</option>)
                }
            </select>
            <br/>
            <button  className="buttons-list" onClick={()=> addDonationRequest()}>Create Donation request</button>
            <br/>
            {text}
        </div>
    )
}

export default CreateDonationRequest;
import { use, useEffect, useState } from 'react';
import api from '../../services/api';

function Search(props) {

    const [urgency, setUrgency] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [faculties, setFaculties] = useState('')
    const [items, setItems] = useState('')
    const [types, setTypes]= useState('')
    const [unis, setUnis]= useState('')
    const [cities, setCities] = useState('')

    useEffect(() => {
        const getTypes = async () => {
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

    useEffect(() => {
        const getItems = async () => {
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
        const getFaculties = () => {
            try {
                api.get(`/faculties/listfac`)
                    .then(result => {
                        console.log(result.data)
                        setFaculties(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        getFaculties()
    }, [])

    
    useEffect(() => {
        const getData = async () => {
            try {
                api.get(`/faculties/listuni`)
                    .then((result) => {
                        console.log(result.data);
                        setUnis(result.data)
                    })
                    .catch(err => console.error('api error: ', err));

            } catch (error) {
                console.error('error: ', error)
            }
        }

        getData();
    }, [])

    
    
    useEffect(() => {
        const getData = async () => {
            try {
                api.get(`/faculties/listcities`)
                    .then((result) => {
                        console.log(result.data);
                        setCities(result.data)
                    })
                    .catch(err => console.error('api error: ', err));

            } catch (error) {
                console.error('error: ', error)
            }
        }

        getData();
    }, [])


    return (
        <div>
            <h1>Filter: </h1>
            
            <input type="checkbox" id="Urgent" name="urgency_level" value="Urgent" onChange={({ target: { value } })=>setUrgency(value)}/>
            <label for="Urgent">Urgent</label><br/>
            <input type="checkbox" id="Mildly_urgent" name="urgency_level" value="Mildly urgent" onChange={({ target: { value } })=>setUrgency(value)}/>
            <label for="Mildly_urgent">Mildly urgent</label><br/>
            <input type="checkbox" id="Not_urgent" name="urgency_level" value="Not urgent" onChange={({ target: { value } })=>setUrgency(value)}/>
            <label for="Not_urgent">Not urgent</label><br/>

            <input type="range" id="quantity" min="1" max="100" value="0" onChange={({ target: { value } })=>setQuantity(value)}/>
            <label for="quantity">{quantity}</label><br/>

            {
                types?.map(type=>  <input type="checkbox" id={type} name="Types" value={type}> <label for="vehicle1">{type}</label><br/></input> )
            }

            <h1>Sort: </h1>
            <h1>Search: </h1>
            <button> </button>
        </div>
    )
}

export default Search;
import { use, useEffect, useState } from 'react';
import api from '../../services/api';
import Checkbox from './Checkbox'

function Filter(props) {

    const [filteredBy, setFilteredBy] = useState({
        urgencyOn: false,
        facultiesOn: false,
        itemsOn: false,
        typesOn: false,
        unisOn: false,
        citiesOn: false
    })
    const [urgency, setUrgency] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [faculties, setFaculties] = useState('')
    const [items, setItems] = useState('')
    const [types, setTypes] = useState('')
    const [unis, setUnis] = useState('')
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

    useEffect(() => {
        console.log(filteredBy)
    }, [filteredBy])

    return (
        <div>
            <label htmlFor="urgencyCheckbox">Urgency: </label>
            <input type="checkbox" id="urgencyCheckbox" name="urgencyCheckbox" onChange={() => setFilteredBy(prevState => ({ ...prevState, urgencyOn: !prevState.urgencyOn }))} checked={filteredBy.urgencyOn} />
            <br />

            {
                filteredBy.urgencyOn ?
                    <div>
                        <input type="checkbox" id="Urgent" name="urgency_level" value="Urgent" onChange={({ target: { value } }) => setUrgency(value)} />
                        <label htmlFor="Urgent">Urgent</label><br />
                        <input type="checkbox" id="Mildly_urgent" name="urgency_level" value="Mildly urgent" onChange={({ target: { value } }) => setUrgency(value)} />
                        <label htmlFor="Mildly_urgent">Mildly urgent</label><br />
                        <input type="checkbox" id="Not_urgent" name="urgency_level" value="Not urgent" onChange={({ target: { value } }) => setUrgency(value)} />
                        <label htmlFor="Not_urgent">Not urgent</label><br />
                    </div>
                    :
                    <></>
            }
            {/* <label htmlFor="quantityCheckbox">Quantity: </label>
            <input type="checkbox" id="quantityCheckbox" name="quantityCheckbox" onChange={() => setFilteredBy(prevState => ({ ...prevState, quantityOn: !prevState.quantityOn }))} checked={filteredBy.quantityOn} />
            <br />
            {
                filteredBy.quantityOn ?
                    <div>
                        <input type="range" id="quantity" min="0" max="100" onChange={({ target: { value } }) => setQuantity(value)} />
                        <label htmlFor="quantity">{quantity}</label><br />
                    </div>
                    :
                    <></>
            } */}
            <label htmlFor="typesCheckbox">Types: </label>
            <input type="checkbox" id="typesCheckbox" name="typesCheckbox" onChange={() => setFilteredBy(prevState => ({ ...prevState, typesOn: !prevState.typesOn }))} checked={filteredBy.typesOn} />
            <br />
            {
                types && filteredBy.typesOn ?
                    types.map(type => <Checkbox item={type} key={type} />)
                    :
                    <></>
            }
            <label htmlFor="itemsCheckbox">Items: </label>
            <input type="checkbox" id="itemsCheckbox" name="itemsCheckbox" onChange={() => setFilteredBy(prevState => ({ ...prevState, itemsOn: !prevState.itemsOn }))} checked={filteredBy.itemsOn} />
            <br />
            {
                items && filteredBy.itemsOn ?
                    items.map(item => <Checkbox item={item.subtype} key={item.subtype} />)
                    :
                    <></>
            }

            <label htmlFor="facultiesCheckbox">Faculties: </label>
            <input type="checkbox" id="facultiesCheckbox" name="facultiesCheckbox" onChange={() => setFilteredBy(prevState => ({ ...prevState, facultiesOn: !prevState.facultiesOn }))} checked={filteredBy.facultiesOn} />
            <br />
            {
                faculties && filteredBy.facultiesOn ?
                    faculties.map(faculty => <Checkbox item={faculty.name} key={faculty.id} />)
                    :
                    <></>
            }
            <label htmlFor="citiesCheckbox">Cities: </label>
            <input type="checkbox" id="citiesCheckbox" name="citiesCheckbox" onChange={() => setFilteredBy(prevState => ({ ...prevState, citiesOn: !prevState.citiesOn }))} checked={filteredBy.citiesOn} />
            <br />
            {
                cities && filteredBy.citiesOn ?
                    cities.map(city => <Checkbox item={city.city} key={city.key} />)
                    :
                    <></>
            }

        </div>
    )
}

export default Filter
import { use, useEffect, useState } from 'react';
import api from '../../services/api';
import Checkbox from './Checkbox'

function Filter(props) {

    const [filteredBy, setFilteredBy] = useState({
        facultiesOn: false,
        itemsOn: false,
        typesOn: false,
        unisOn: false,
        citiesOn: false
    })
    const [faculties, setFaculties] = useState('')
    const [facultiesState, setFacultiesState] = useState([])
    const handleFacultiesChange = (position) => {
        const updatedState = facultiesState.map((item, index) =>
            index === position ? !item : item
        );
        setFacultiesState(updatedState);
        console.log(faculties)
        console.log(updatedState)
    }
    useEffect(()=>{
        props.facultiesCallback({faculties, facultiesState})
    },[faculties,facultiesState])


    const [items, setItems] = useState('')
    const [itemsState, setItemsState] = useState([])
    const handleItemsChange = (position) => {
        const updatedState = itemsState.map((item, index) =>
            index === position ? !item : item
        );
        setItemsState(updatedState);
        console.log(items)
        console.log(updatedState)
    }
    useEffect(()=>{
        props.itemsCallback({items, itemsState})
    },[items,itemsState])

    const [types, setTypes] = useState('')
    const [typesState, setTypesState] = useState([])
    const handleTypesChange = (position) => {
        const updatedState = typesState.map((item, index) =>
            index === position ? !item : item
        );
        setTypesState(updatedState);
        console.log(types)
        console.log(updatedState)
    }
    useEffect(()=>{
        props.typesCallback({types, typesState})
    },[types,typesState])

    const [unis, setUnis] = useState('')
    const [unisState, setUnisState] = useState([])
    const handleUnisChange = (position) => {
        const updatedState = unisState.map((item, index) =>
            index === position ? !item : item
        );
        setUnisState(updatedState);
        console.log(unis)
        console.log(updatedState)
    }
    useEffect(()=>{
        props.unisCallback({unis, unisState})
    },[unis,unisState])


    const [cities, setCities] = useState('')
    const [citiesState, setCitiesState] = useState([])
    const handleCitiesChange = (position) => {
        const updatedState = citiesState.map((item, index) =>
            index === position ? !item : item
        );
        setCitiesState(updatedState);
        console.log(cities)
        console.log(updatedState)
    }
    useEffect(()=>{
        props.citiesCallback({cities, citiesState})
    },[cities,citiesState])


    useEffect(() => {
        const getTypes = async () => {
            try {
                const { data } = await api.get('/search/type')
                setTypes(data);
                setTypesState(new Array(data.length).fill(false))
                console.log(data)
            } catch (error) {
                console.error(error.response?.data?.error || error.message)
            }
        }
        const getItems = async () => {
            try {
                const { data } = await api.get('/search/subtype')
                console.log(data)
                setItems(data);
                setItemsState(new Array(data.length).fill(false))
            } catch (error) {
                console.error(error.response?.data?.error || error.message)
            }
        }
        const getFaculties = () => {
            try {
                api.get(`/search/fac`)
                    .then(result => {
                        console.log(result.data)
                        setFaculties(result.data)
                        setFacultiesState(new Array(result.data.length).fill(false))
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        const getUnis = async () => {
            try {
                api.get(`/search/uni`)
                    .then((result) => {
                        console.log(result.data);
                        setUnis(result.data)
                        setUnisState(new Array(result.data.length).fill(false))
                    })
                    .catch(err => console.error('api error: ', err));

            } catch (error) {
                console.error('error: ', error)
            }
        }
        const getCities = async () => {
            try {
                api.get(`/search/cities`)
                    .then((result) => {
                        console.log(result.data);
                        setCities(result.data)
                        setCitiesState(new Array(result.data.length).fill(false))
                    })
                    .catch(err => console.error('api error: ', err));

            } catch (error) {
                console.error('error: ', error)
            }
        }

        getCities();
        getUnis();
        getFaculties()
        getItems()
        getTypes()
    }, [])

   
    useEffect(() => {
        console.log(filteredBy)
    }, [filteredBy])

    return (
        <div>
            <label htmlFor="typesCheckbox">Types: </label>
            <input type="checkbox" id="typesCheckbox" name="typesCheckbox" onChange={() => setFilteredBy(prevState => ({ ...prevState, typesOn: !prevState.typesOn }))} checked={filteredBy.typesOn} />
            <br />
            {
                types && filteredBy.typesOn ?
                    types.map(type => {
                        return (
                            <div key={type.key - 1}>
                                <input type="checkbox" id={type.key - 1} value={type.name} name={type.name} checked={typesState[type.key - 1]} onChange={() => handleTypesChange(type.key - 1)} />
                                <label htmlFor={type.name}>{type.name}</label>
                                <br />
                            </div>
                        )
                    })
                    :
                    <></>
            }
            <label htmlFor="itemsCheckbox">Items: </label>
            <input type="checkbox" id="itemsCheckbox" name="itemsCheckbox" onChange={() => setFilteredBy(prevState => ({ ...prevState, itemsOn: !prevState.itemsOn }))} checked={filteredBy.itemsOn} />
            <br />
            {
                items && filteredBy.itemsOn ?
                    items.map(item => {
                        return (
                            <div key={item.key - 1}>
                                <input type="checkbox" id={item.key - 1} value={item.name} name={item.name} checked={itemsState[item.key - 1]} onChange={() => handleItemsChange(item.key - 1)} />
                                <label htmlFor={item.name}>{item.name}</label>
                                <br />
                            </div>
                        )
                    })
                    
                    :
                    <></>
            }

            <label htmlFor="facultiesCheckbox">Faculties: </label>
            <input type="checkbox" id="facultiesCheckbox" name="facultiesCheckbox" onChange={() => setFilteredBy(prevState => ({ ...prevState, facultiesOn: !prevState.facultiesOn }))} checked={filteredBy.facultiesOn} />
            <br />
            {
                faculties && filteredBy.facultiesOn ?
                    faculties.map(faculty => {
                        return (
                            <div key={faculty.key - 1}>
                                <input type="checkbox" id={faculty.key - 1} value={faculty.name} name={faculty.name} checked={facultiesState[faculty.key - 1]} onChange={() => handleFacultiesChange(faculty.key - 1)} />
                                <label htmlFor={faculty.name}>{faculty.name}</label>
                                <br />
                            </div>
                        )
                    })
                    :
                    <></>
            }

            <label htmlFor="unisCheckbox">Universities: </label>
            <input type="checkbox" id="unisCheckbox" name="unisCheckbox" onChange={() => setFilteredBy(prevState => ({ ...prevState, unisOn: !prevState.unisOn }))} checked={filteredBy.unisOn} />
            <br />
            {
                unis && filteredBy.unisOn ?
                    unis.map(uni => {
                        return (
                            <div key={uni.key - 1}>
                                <input type="checkbox" id={uni.key - 1} value={uni.name} name={uni.name} checked={unisState[uni.key - 1]} onChange={() => handleUnisChange(uni.key - 1)} />
                                <label htmlFor={uni.name}>{uni.name}</label>
                                <br />
                            </div>
                        )
                    })                    
                    :
                    <></>
            }
            <label htmlFor="citiesCheckbox">Cities: </label>
            <input type="checkbox" id="citiesCheckbox" name="citiesCheckbox" onChange={() => setFilteredBy(prevState => ({ ...prevState, citiesOn: !prevState.citiesOn }))} checked={filteredBy.citiesOn} />
            <br />
            {
                cities && filteredBy.citiesOn ?
                    cities.map(city => {
                        return (
                            <div key={city.key - 1}>
                                <input type="checkbox" id={city.key - 1} value={city.name} name={city.name} checked={citiesState[city.key - 1]} onChange={() => handleCitiesChange(city.key - 1)} />
                                <label htmlFor={city.name}>{city.name}</label>
                                <br />
                            </div>
                        )
                    })                    :
                    <></>
            }

        </div>
    )
}

export default Filter
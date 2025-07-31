import { use, useEffect, useState } from 'react';
import api from '../../services/api';
import Table from './Table'
import Filter from './Filter'
import Sort from './Sort'

function Search(props) {
    const [settings, setSettings] = useState({
        filter: false,
        sorting: false,
        search: false
    })

    const [textInput, setTextInput] = useState('')
    const [searchResult, setSearchResult] = useState()

    const [faculties, setFaculties] = useState()
    const handleFaculties = (childData) => {
        setFaculties(childData);
        console.log(childData)
    };

    const [items, setItems] = useState()
    const handleItems = (childData) => {
        setItems(childData);
    };
    const [types, setTypes] = useState()
    const handleTypes = (childData) => {
        setTypes(childData);
    };
    const [unis, setUnis] = useState()
    const handleUnis = (childData) => {
        setUnis(childData);
    };
    const [cities, setCities] = useState()
    const handleCities = (childData) => {
        setCities(childData);
    };
    const [sortedBy, setSortedBy] = useState()
    const handleSortedBy = (childData) => {
        setSortedBy(childData);
        console.log(childData)
    };
    const [quantity, setQuantity] = useState(true)
    const handleQuantity = (childData) => {
        childData.quantity ? setQuantity(childData) : setQuantity('')
    };
    const [urgencyLevel, setUrgencyLevel] = useState(true)
    const handleUrgencyLevel = (childData) => {
        childData.urgencyLevel ? setUrgencyLevel(childData) : setUrgencyLevel('')
    };
    const [date, setDate] = useState(true)
    const handleDate = (childData) => {
        childData.date ? setDate(childData) : setDate('')
    };

    useEffect(() => {
        textInput ? setSettings(prevState => ({ ...prevState, search: true })) : setSettings(prevState => ({ ...prevState, search: false }))
    }, [textInput])

    const searchButton = async () => {
        var facString = ''
        var uniString = ''
        var typeString = ''
        var itemString = ''
        var cityString = ''
        var quantityValue = 0
        var urgencyLevelValue = 0
        var dateValue = 0
        if (settings.filter) {
            facString = format(faculties, 'faculties')
            uniString = format(unis, 'unis')
            typeString = format(types, 'types')
            itemString = format(items, 'items')
            cityString = format(cities, 'cities')
        }
        if (settings.sorting) {
            quantityValue = sortedBy.byQuantity ? (quantity ? 1 : 2) : 0
            urgencyLevelValue = sortedBy.byUrgencyLevel ? (urgencyLevel ? 1 : 2 ): 0
            dateValue = sortedBy.byDate ? ( date ? 1 : 2 ): 0
            console.log(quantityValue, urgencyLevelValue, dateValue)
        }

        try {
            const { data } = await api.post('/search/',
                { filter: settings.filter, sort: settings.sorting, faculties: facString, unis: uniString, types: typeString, items: itemString, cities: cityString, quantity: quantityValue, date: dateValue, urgency_level: urgencyLevelValue });
            setSearchResult(data);
            console.log(data)
        } catch (err) {
            console.error(err.response?.data?.error || err.message);
        }
    }
    const format = (dataObj, stateKey) => {
        const { [stateKey]: items, [stateKey + 'State']: stateArray } = dataObj;
        const selected = items.filter((item, index) => stateArray[index]);
        if (selected.length === 0) return '';
        const names = selected.map(item => `'${item.name}'`);
        console.log(`(${names.join(',')})`)
        return `(${names.join(',')})`;
    };

    return (
        <div>
            <label htmlFor="filterCheckbox">Filter: </label>
            <input type="checkbox" id="filterCheckbox" name="filterCheckbox" onChange={() => setSettings(prevState => ({ ...prevState, filter: !prevState.filter }))} checked={settings.filter} />
            <br />
            {
                settings.filter ?
                    <Filter facultiesCallback={handleFaculties} unisCallback={handleUnis} typesCallback={handleTypes} itemsCallback={handleItems} citiesCallback={handleCities} />
                    :
                    <></>
            }
            <label htmlFor="sortingCheckbox">Sort: </label>
            <input type="checkbox" id="sortingCheckbox" name="sortingCheckbox" onChange={() => setSettings(prevState => ({ ...prevState, sorting: !prevState.sorting }))} checked={settings.sorting} />
            <br />
            {
                settings.sorting ?
                    <Sort sortedByCallback={handleSortedBy} quantityCallback={handleQuantity} dateCallback={handleDate} urgencyLevelCallback={handleUrgencyLevel} />
                    :
                    <></>
            }
            <h1>Search for item: </h1>
            <input type="text" id="searchForItem" placeholder="E.g. bread, meat, ..."
                onChange={({ target: { value: input } }) => setTextInput(input)} value={textInput} />
            <br />
            <button onClick={() => searchButton()}> Search </button>
            {
                searchResult ?
                    <Table data={searchResult} />
                    :
                    <></>
            }
        </div>
    )
}

export default Search;
import { use, useEffect, useState } from 'react';
import api from '../../services/api';
import Checkbox from './Checkbox'
import Filter from './Filter'
import Sort from './Sort'

function Search(props) {
    const [settings, setSettings] = useState({
        filter: false,
        sorting: false,
        search: false
    })

    const [textInput, setTextInput ]=useState('')

    useEffect(()=>{
        textInput ? setSettings(prevState => ({ ...prevState, search: true })) : setSettings(prevState => ({ ...prevState, search: false }))
    }, [textInput])
    
    return (
        <div>
            <label htmlFor="filterCheckbox">Filter: </label>
            <input type="checkbox" id="filterCheckbox" name="filterCheckbox" onChange={() => setSettings(prevState => ({ ...prevState, filter: !prevState.filter }))} checked={settings.filter} />
            <br />
            {
                settings.filter ?
                <Filter/>
                :
                <></>
            }
            <label htmlFor="sortingCheckbox">Sort: </label>
            <input type="checkbox" id="sortingCheckbox" name="sortingCheckbox" onChange={() => setSettings(prevState => ({ ...prevState, sorting: !prevState.sorting }))} checked={settings.sorting} />
            <br />
            {
                settings.sorting ?
                <Sort/>
                :
                <></>
            }
            <h1>Search for item: </h1>
            <input type="text" id="searchForItem" placeholder="E.g. bread, meat, ..."
            onChange={({target: {value: input}}) => setTextInput(input)} value={textInput}/>
            <br/>
            <button> Search </button>
        </div>
    )
}

export default Search;
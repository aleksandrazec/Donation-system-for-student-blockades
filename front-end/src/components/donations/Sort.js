import { useState, useEffect } from 'react';

function Sort(props) {

    const [sortedBy, setSortedBy] = useState({
        byQuantity: false,
        byUrgencyLevel: false,
        byDate: false,
    })
    const [quantity, setQuantity] = useState(true)
    const [urgencyLevel, setUrgencyLevel] = useState(true)
    const [date, setDate] = useState(true)

    useEffect(() => {
        console.log(sortedBy)
    }, [sortedBy])
    useEffect(() => {
        console.log(quantity)
    }, [quantity])
    return (
        <div>
            <div>
                <input type="checkbox" id="quantityCheckbox" name="quantityCheckbox" onChange={() => setSortedBy(prevState => ({ ...prevState, byQuantity: !prevState.byQuantity }))} checked={sortedBy.byQuantity} />
                <label htmlFor="quantity">Sort by quantity:</label>

                {
                    sortedBy.byQuantity ?
                        <select name="quantityOptions" id="quantityOptions" onChange={(e) => setQuantity(e.target.value === 'ASC')}>
                            <option value="ASC" >Ascending</option>
                            <option value="DSC" >Descending</option>
                        </select>
                        :
                        <></>
                }
            </div>
            <div>
                <input type="checkbox" id="urgencyLevelCheckbox" name="urgencyLevelCheckbox" onChange={() => setSortedBy(prevState => ({ ...prevState, byUrgencyLevel: !prevState.byUrgencyLevel }))} checked={sortedBy.byUrgencyLevel} />
                <label htmlFor="urgencyLevel">Sort by urgency level:</label>

                {
                    sortedBy.byUrgencyLevel ?
                        <select name="urgencyLevelOptions" id="urgencyLevelOptions" onChange={(e) => setUrgencyLevel(e.target.value === 'ASC')}>
                            <option value="ASC" >Ascending</option>
                            <option value="DSC" >Descending</option>
                        </select>
                        :
                        <></>
                }
            </div>
            <div>
                <input type="checkbox" id="dateCheckbox" name="dateCheckbox" onChange={() => setSortedBy(prevState => ({ ...prevState, byDate: !prevState.byDate }))} checked={sortedBy.byDate} />
                <label htmlFor="date">Sort by date:</label>

                {
                    sortedBy.byDate ?
                        <select name="dateOptions" id="dateOptions" onChange={(e) => setDate(e.target.value === 'ASC')}>
                            <option value="ASC" >Ascending</option>
                            <option value="DSC" >Descending</option>
                        </select>
                        :
                        <></>
                }
            </div>
        </div>
    )
}
export default Sort;
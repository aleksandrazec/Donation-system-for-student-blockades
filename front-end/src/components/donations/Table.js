function Table(props) {
    const { data = [] } = props
    let index = 0

    function getCells(obj) {
        if (!obj || typeof obj !== 'object') return null
        return Object.values(obj).map(value => {
            index++
            return <td key={index}>{value ?? ''}</td>
        });
    }

    function getRows(data) {
        if (!Array.isArray(data) || data.length === 0) return null
        return data.map(obj => {
            index++
            return <tr key={index}>{getCells(obj)}</tr>
        });
    }

    function getHeadings(data) {
        if (!Array.isArray(data) || data.length === 0) return null
        const keys = Object.keys(data[0] || {})
        return keys.map(key => {
            index++
            return <th key={index} style={{backgroundColor: "#2B2D42", color: "white"}}>{key}</th>
        });
    }

    if (!Array.isArray(data) || data.length === 0) {
        return <p>No donation requests available.</p>
    }

    return (
        <div>
            <table>
                <thead><tr>{getHeadings(data)}</tr></thead>
                <tbody>{getRows(data)}</tbody>
            </table>
        </div>
    );
}

export default Table

import { useNavigate } from 'react-router'

function EditTable(props) {
    const navigate = useNavigate()
    const {
        data
    } = props
    var index = 0;
    function getCells(obj) {
        return Object.values(obj).map(value => { index++
            var text;
            value==='Edit' ?
            text=<td key={index} onClick={()=>{
                navigate('/')
            }}>{value}</td>
            :
            text=<td key={index}>{value}</td>
            return text
        });
    }
    function getRows(data) {
        return data.map(obj => {
            index++
            return <tr key={index}>{getCells(obj)}</tr>;
        });
    }
    function getHeadings(data) {
        return Object.keys(data[0]).map(key => {
            index++
            return <th key={index}>{key}</th>;
        });
    }
    return (
        <div>
            {
                data ?
                    <table>
                        <thead><tr>{getHeadings(data)}</tr></thead>
                        <tbody>{getRows(data)}</tbody>
                    </table>
                    :
                    <></>
            }
        </div>
    )
}


export default EditTable
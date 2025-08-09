import { useNavigate } from 'react-router'

function EditUserTable(props) {
    const navigate = useNavigate()
    const {
        data
    } = props
    var index = 0;
    function getCells(obj) {
        return Object.entries(obj).map(([key, value]) => {
            index++;
            if (value === 'Edit') {
                return (
                    <td key={index} onClick={() => {
                        navigate(`/users/${obj.id}`)
                    }}>
                        {value}
                    </td>
                );
            } else {
                return <td key={index}>{value}</td>;
            }
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


export default EditUserTable
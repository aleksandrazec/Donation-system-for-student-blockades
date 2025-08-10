import { useNavigate } from 'react-router';

function EditUserTable(props) {
    const navigate = useNavigate();
    const { data = [] } = props
    let index = 0;

    function getCells(obj) {
        return Object.entries(obj).map(([key, value]) => {
            index++;
            if (value === 'Edit') {
                return (
                    <td
                        key={index}
                         style={{backgroundColor: "#D90429", color: 'white'}} 
                        onClick={() => navigate(`/users/${obj.id}`)}
                    >
                        {value}
                    </td>
                );
            }
            return <td key={index}>{value}</td>;
        });
    }

    function getRows(data) {
        return data.map(obj => {
            index++;
            return <tr key={index}>{getCells(obj)}</tr>;
        });
    }

    function getHeadings(data) {
        if (!data[0]) return null
        return Object.keys(data[0]).map(key => {
            index++;
            return <th key={index} style={{backgroundColor: "#2B2D42", color: "white"}}>{key}</th>;
        });
    }

    return (
        <div>
            {Array.isArray(data) && data.length > 0 ? (
                <table>
                    <thead>
                        <tr>{getHeadings(data)}</tr>
                    </thead>
                    <tbody>{getRows(data)}</tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}

export default EditUserTable

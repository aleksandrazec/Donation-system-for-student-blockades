import { useNavigate } from 'react-router'

function EditTable(props) {
    const navigate = useNavigate();
    const { data = [] } = props
    let index = 0;

    function getCells(obj) {
        return Object.entries(obj).map(([key, value]) => {
            index++;
            if (value === 'Edit') {
                return (
                    <td key={index} onClick={() => navigate(`/editpg/${obj.id}`)}>
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
            index++;
            return <tr key={index}>{getCells(obj)}</tr>;
        });
    }

    function getHeadings(data) {
        return Object.keys(data[0]).map(key => {
            index++;
            return <th key={index}>{key}</th>;
        });
    }

    return (
        <div>
            {Array.isArray(data) && data.length > 0 ? (
                <table>
                    <thead><tr>{getHeadings(data)}</tr></thead>
                    <tbody>{getRows(data)}</tbody>
                </table>
            ) : (
                <p>No donation requests available.</p>
            )}
        </div>
    );
}

export default EditTable

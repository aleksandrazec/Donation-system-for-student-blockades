import {Link} from 'react-router';

function TabItem ({text, url}){
    return(
        <div className='tab-item'>
            <Link to={url}>{text}</Link>
        </div>
    )
}

export default TabItem;
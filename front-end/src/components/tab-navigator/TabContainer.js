import TabItem from './TabItem';
import { UserContext } from '../../Context'
import {useContext} from 'react'

function TabContainer({ children }) {
    const user = useContext(UserContext)
    const getTabs = () => {
        if(user.role==='Student' || user.role==='Admin'){
            return [
                {
                    text: 'Home',
                    url: '/',
                },
                {
                    text: 'Faculties in blockade',
                    url: '/facultiesgen',
                },
                {
                    text: 'Forums',
                    url: '/forums',
                },
                {
                    text: 'Search donation requests',
                    url: '/search',
                },
                {
                    text: 'Profile',
                    url: '/login',
                },
            ]
        }else if(user.role==='Citizen'){
            return [
                {
                    text: 'Home',
                    url: '/',
                },
                {
                    text: 'Faculties in blockade',
                    url: '/faculties',
                },
                {
                    text: 'Forums',
                    url: '/forums',
                },
                {
                    text: 'Search donation requests',
                    url: '/search',
                },
                {
                    text: 'Profile',
                    url: '/login',
                },
            ]
        }else{
            return [
                {
                    text: 'Home',
                    url: '/',
                },
                {
                    text: 'Faculties in blockade',
                    url: '/faculties',
                },
                {
                    text: 'Forums',
                    url: '/forums',
                },
                {
                    text: 'Search donation requests',
                    url: '/search',
                },
                {
                    text: 'Log In',
                    url: '/login',
                },
            ]
        }
    }
    return (
        <div className='tab-navigator'>
            <div className='tab-container'>
                {
                    getTabs().map(({ text, url }) => <TabItem
                        key={text}
                        text={text}
                        url={url}
                    />)
                }
            </div>
            {children}
        </div>
    )
}





export default TabContainer;
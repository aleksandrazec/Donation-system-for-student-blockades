import TabItem from './TabItem';
import { UserContext } from '../../Context'
import { useContext } from 'react'
import './styles.css'

function TabContainer({ children }) {
    const user = useContext(UserContext)
    const getTabs = () => {
        if (user.role === 'Student') {
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
                    url: '/forumshome',
                },
                {
                    text: 'Search donation requests',
                    url: '/searchdonations',
                },
                {
                    text: 'Profile',
                    url: '/profile',
                },
            ]
        } else if (user.role === 'Admin') {
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
                    url: '/forumshome',
                },
                {
                    text: 'Users',
                    url: '/usershome',
                },
                {
                    text: 'Search donation requests',
                    url: '/searchdonations',
                },
                {
                    text: 'Profile',
                    url: '/profile',
                },
            ]
        } else if (user.role === 'Citizen') {
            return [
                {
                    text: 'Home',
                    url: '/',
                },
                {
                    text: 'Faculties in blockade',
                    url: '/facultieshome',
                },
                {
                    text: 'Forums',
                    url: '/forumshome',
                },
                {
                    text: 'Search donation requests',
                    url: '/searchdonations',
                },
                {
                    text: 'Profile',
                    url: '/profile',
                },
            ]
        } else {
            return [
                {
                    text: 'Home',
                    url: '/',
                },
                {
                    text: 'Faculties in blockade',
                    url: '/facultieshome',
                },
                {
                    text: 'Forums',
                    url: '/forumshome',
                },
                {
                    text: 'Search donation requests',
                    url: '/searchdonations',
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
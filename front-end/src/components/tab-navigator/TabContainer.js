import TabItem from './TabItem';

function TabContainer({children}){
    return(
        <div className='tab-navigator'>
            <div className='tab-container'>
                {
                    getTabs().map(({text, url}) => <TabItem
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


    const getTabs = () => {
        return [
            {
                text: 'Home',
                url: '/',
            },
            {
                text: 'Faculties',
                url: '/facultiesgen',
            },
            {
                text: 'Forums',
                url: '/forums',
            },
            {
                text: 'Donate',
                url: '/search',
            },
            {
                text: 'Profile',
                url: '/login',
            },
        ]
    }


export default TabContainer;
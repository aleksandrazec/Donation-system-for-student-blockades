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
                text: 'Faculties',
                url: '/',
            },
            {
                text: 'Forums',
                url: '/',
            },
            {
                text: 'Donate',
                url: '/',
            },
            {
                text: 'Profile',
                url: '/',
            },
        ]
    }


export default TabContainer;
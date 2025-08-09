import './App.css';
import TabContainer from './components/tab-navigator/TabContainer';
import { Outlet } from 'react-router';
import { useState, useEffect } from 'react';
import { UserContext } from './Context'
import api from './services/api'

function App(props) {

  const [user, setUser] = useState({
    role: 'Guest',
    user_id: 0
  });


  useEffect(() => {
    const isUserLoggedIn = async () => {
      try {
        api.get(`/users/session`)
          .then((result) => {
            console.log(result.data);
            if (result.data.logged_in) {
              setUser({ role: result.data.role, user_id: result.data.user_id })
            }
          })
          .catch(err => console.error('api error: ', err));

      } catch (error) {
        console.error('error: ', error)
      }
    }
    isUserLoggedIn()
  }, [])

  return (
    <div>
      {
        <UserContext.Provider value={{...user, setUser}}>
          <TabContainer>
            <Outlet />
          </TabContainer>
        </UserContext.Provider>
      }
    </div>
  )
}
export default App;
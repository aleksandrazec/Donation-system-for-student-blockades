import './App.css';
import TabContainer from './components/tab-navigator/TabContainer';
import { Outlet } from 'react-router';
import {useState} from 'react';

function App(props) {

  const [role, setRole]=useState();

  return (
    <div>
      {
        <TabContainer>
          <Outlet />
        </TabContainer>
      }
    </div>
  )
}
export default App;
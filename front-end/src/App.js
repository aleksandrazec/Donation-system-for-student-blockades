import './App.css';
import React from 'react';
import TabContainer from './components/tab-navigator/TabContainer';
import {Outlet} from 'react-router';

class App extends React.Component{

  render(){
    return(
        <TabContainer>
        <h1>Search through donations</h1>
        <Outlet/>
       </TabContainer>
    );
  }
}
export default App;
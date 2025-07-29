import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App';

class AppRouter extends Component{
    render(){
        return(
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    {/* <Route index={true} element={<Home/>}/>
                    <Route path="lesson" element={<LessonDetails/>}/> */}
                </Route>
            </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;
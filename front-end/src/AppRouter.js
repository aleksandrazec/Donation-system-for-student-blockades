import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App';
import FacultiesHome from './components/faculties/FacultiesHome';
import UniversityPage from './components/faculties/UniversityPage'
import FacultyPage from './components/faculties/FacultyPage'

class AppRouter extends Component{
    render(){
        return(
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index={true} element={<FacultiesHome/>}/>
                    <Route path="university/:name" element={<UniversityPage/>}/>
                    <Route path="faculty/:id" element={<FacultyPage/>}/>

                </Route>
            </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;
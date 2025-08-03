import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App';
import FacultiesHome from './components/faculties/FacultiesHome';
import UniversityPage from './components/faculties/UniversityPage'
import FacultyPage from './components/faculties/FacultyPage'
import CreateDonationRequest from './components/create-requests/CreateDonationRequest'
import Search from './components/donations/Search'
import ForumsHome from './components/forums/ForumsHome'
import ForumPage from './components/forums/ForumPage'

class AppRouter extends Component{
    render(){
        return(
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index={true} element={<FacultiesHome/>}/>
                    <Route path="university/:name" element={<UniversityPage/>}/>
                    <Route path="faculty/:id" element={<FacultyPage/>}/>
                    <Route path="create/:id" element={<CreateDonationRequest/>}/>
                    <Route path="search" element={<Search/>}/>
                    <Route path="forums" element={<ForumsHome/>}/>
                    <Route path="forums/:id" element={<ForumPage/>}/>
                </Route>
            </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;
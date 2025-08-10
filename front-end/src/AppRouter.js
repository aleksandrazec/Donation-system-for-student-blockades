import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App';
import FacultiesHome from './components/faculties/FacultiesHome';
import FacultiesGeneral from './components/faculties/FacultiesGeneral';
import UniversityPage from './components/faculties/UniversityPage'
import FacultyPage from './components/faculties/FacultyPage'
import EditFaculty from './components/faculties/EditFaculty'
import CreateDonationRequest from './components/create-requests/CreateDonationRequest'
import Search from './components/donations/Search'
import ForumsHome from './components/forums/ForumsHome'
import CreateForum from './components/forums/CreateForum'
import EditForum from './components/forums/EditForum'
import ForumPage from './components/forums/ForumPage'
import LogIn from './components/profile/LogIn'
import Profile from './components/profile/Profile'
import EditProfile from './components/profile/EditProfile'
import Register from './components/profile/Register'
import RegisterSuccessPage from './components/profile/RegisterSuccessPage'
import EditDonationRequests from './components/donations/EditDonationRequests'
import EditPage from './components/donations/EditPage'
import AddUni from './components/admin-page/AddUni'
import AddFac from './components/admin-page/AddFac'
import SetFacManager from './components/admin-page/SetFacManager'
import EditFacultiesAdmin from './components/admin-page/EditFacultiesAdmin'
import EditFacultyAdmin from './components/admin-page/EditFacultyAdmin'
import Users from './components/admin-page/Users'
import EditUser from './components/admin-page/EditUser'
import HomePage from './components/home-page/HomePage'

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index={true} element={<HomePage/>}/>
                        <Route path="login" element={<LogIn />} />
                        <Route path="register" element={<Register />} />
                        <Route path="registersuccess" element={<RegisterSuccessPage />} />
                        <Route path="facultieshome" element={<FacultiesHome />} />
                        <Route path="facultiesgen" element={<FacultiesGeneral />} />
                        <Route path="university/:name" element={<UniversityPage />} />
                        <Route path="facultypage/:id" element={<FacultyPage />} />
                        <Route path="create/:id" element={<CreateDonationRequest />} />
                        <Route path="searchdonations" element={<Search />} />
                        <Route path="forumshome" element={<ForumsHome />} />
                        <Route path="createf/:id" element={<CreateForum />} />
                        <Route path="editf/:id" element={<EditForum />} />
                        <Route path="forumspage/:id" element={<ForumPage />} />
                        <Route path="edit/:id" element={<EditDonationRequests />} />
                        <Route path="editpg/:id" element={<EditPage />} />
                        <Route path="editfac/:id" element={<EditFaculty />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="editprofile" element={<EditProfile />} />
                        <Route path="adduni" element={<AddUni />} />
                        <Route path="addfac" element={<AddFac />} />
                        <Route path="facman" element={<SetFacManager />} />
                        <Route path="editfacs" element={<EditFacultiesAdmin />} />
                        <Route path="editfacs/:id" element={<EditFacultyAdmin />} />
                        <Route path="usershome" element={<Users />} />
                        <Route path="userspage/:id" element={<EditUser />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default AppRouter;
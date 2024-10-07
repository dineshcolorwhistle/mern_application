import React from 'react'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


// Personnel Management
const ManageUsers = React.lazy(() => import('./views/personnelmanagement/manageusers/ManageUsers'))
const Breadcrumbs = React.lazy(() => import('./views/personnelmanagement/breadcrumbs/Breadcrumbs'))
const Projects = React.lazy(() => import('./views/Projects/Projects'))
const Profile = React.lazy(() => import('./views/Profile/Profile'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/', name: 'Dashboard', element: Dashboard }, 
  { path: '/projects', name: 'Projects', element: Projects },
  { path: '/profile', name: 'Profile', element: Profile }, 
  { path: '/personnelmanagement/manageusers', name: 'Manage Users', element: ManageUsers },
  { path: '/personnelmanagement/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },  
  
 
]

export default routes

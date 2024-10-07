import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cisBuilding,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const Nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  

  {
    component: CNavGroup,
    name: 'Personnel Management',
    to: '/personnel management',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'ManageUsers',
        to: '/dashboard/personnelmanagement/manageusers',
      },
      // {
      //   component: CNavItem,
      //   name: 'Manage Clients',
      //   to: '/dashboard/personnelmanagement/breadcrumbs',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Manage Project Managers',
      //   to: '/base/cards',
      // },
     
      // {
      //   component: CNavItem,
      //   name: 'Manage Superintendents',
      //   to: '/base/collapses',
      // },
      
     
     
    ],
  },
    {
        component: CNavItem,
        name: 'Projects',
        to: '/dashboard/projects',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />
      }
  
  
]

export default Nav;

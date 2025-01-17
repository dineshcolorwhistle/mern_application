import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {fetchUsers} from '../../slices/userslist';


const Projects = () => {
const dispatch = useDispatch();
const {data: users} = useSelector((state) => state.users);

useEffect(() => {
dispatch(fetchUsers());
},[dispatch]);

    return(
        <div>
            <ul>
{users.map(user => (
<li>{user.name}</li>
))}</ul>
        </div>
    )
}

export default Projects;
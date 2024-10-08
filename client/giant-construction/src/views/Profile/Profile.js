import React, { useState } from "react";

const Profile = () => {
    const[profileImg, setProfileImg]=useState('');
    return(
        <div className="update-profile-section">
            <h3>Manage Profile</h3>
            <div className="custom-upload">
                <img src={profileImg}></img>
            </div>
           <input type="file" name="file"></input>
        </div>
    )
}
export default Profile;
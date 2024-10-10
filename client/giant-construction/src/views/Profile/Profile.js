import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [profileImg, setProfileImg] = useState(null); // State for storing the image file

     const handleChange = (e) => {
     
        setProfileImg(e.target.files[0]);
     }

        const submitImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image",profileImg);

        try{
            const response = await axios.post(
                'http://localhost:5000/uploadimage',formData);

            if(response.data.status === 'uploaded'){
                window.location.reload(); 
            }
        }
        catch(err){

        }
          

        }

        useEffect(() => {
            const fetchProfileImg = async () => {
              try {
                const response = await axios.get('http://localhost:5000/getProfileImage', { withCredentials: true });
                setProfileImg(response.data.image); // This should log the image filename
                console.log(response.data.image);
              } catch (error) {
                console.log('Error fetching profile image:', error);
              }
            };
          
            fetchProfileImg();
          }, []);

    return (
        <div className="update-profile-section">
        <h3>Manage Profile</h3>
        <img src={`http://localhost:5000/uploads/${profileImg}`} />
        <form onSubmit={submitImage}>
            <input type="file" name="file" accept="image/*" onChange={handleChange} />
            <button type="submit">submit</button>
        </form>
    </div>
    );
};

export default Profile;

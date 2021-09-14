
import profileImage from "../assets/images/UserProfile-1.png";
import ProfilePictureUpload from "./ProfilePictureUpload"
import React, { useState } from 'react';


export default function ProfileInfo ({profile, editProfile }) {

    const [showPicUpload, setPicUpload] = useState(false)

    const renderUpload = () => {
        setPicUpload(true)
    }


    return (
    <div className="profile">
        <img id="profile-img" src={profileImage} alt="profile"/>
        <div className="profile-info">
            <h6 id="dashboard-firstname">{profile.first_name} {profile.last_name}</h6>
            <h6 id="dashboard-username">{profile.username}</h6>
            <h6 id="dashboard-location">{profile.location}</h6>
            <h6 id="dashboard-email">{profile.email}</h6>
            <button id="edit-profile" type="button" className="btn" data-id={profile._id} onClick={editProfile}>Update</button>

            <button id="add-image" type="button" className="btn" data-id={profile._id} onClick={renderUpload}>Upload Profile Picture</button>
        </div>
        {showPicUpload?<ProfilePictureUpload />:<div></div>}
    </div>
    
    )

}
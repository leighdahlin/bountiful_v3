import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import ProfileForm from "./ProfileForm";
import ProfileInfo from "./ProfileInfo";

// import Rating from './Rating'; 

export default function ProfileCard ({ profile }) {

    const { username } = useParams();

    // profile state = true will show the profile info, when false, shows the profile form
    let [showProfileInfo, setProfileInfo] = useState(true);

    const [ updateProfile ] = useMutation(UPDATE_USER);

    const [profileState, setProfileState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        location: '',
    });


    // setProfileState({
    //     first_name: profile.first_name,
    //     last_name: profile.last_name,
    //     username: profile.username,
    //     email: profile.email,
    //     location: profile.location,
    // })   

    const editProfile = () => {
        setProfileInfo(false)

        setProfileState({
            first_name: profile.first_name,
            last_name: profile.last_name,
            email: profile.email,
            location: profile.location,    
        })

    }

    const profileHandleChange = (event) => {
        const { name, value } = event.target;

        setProfileState({
        ...profileState,
        [name]: value,
        });

        // console.log(profileState)

    };

    const submitUpdate = async (event) => {
        event.preventDefault();
        // console.log("SUBMIT UPDATE CLICKED")
        try {
            const { submitUpdateProfile } = await updateProfile({
                variables: {  
                    ...profileState    
                },
            });

            setProfileInfo(true)
            window.location.assign('/dashboard/'+ username);

        }catch (e) {
            console.error(e);
    
        }
    }
    // console.log(profile)
    return (
        <div className="profile-container">
            <div>
                <Link to={`/profile/${profile.username}`}><button id="see-profile" className="btn">See Public View</button></ Link>
            </div>

            {showProfileInfo? <ProfileInfo editProfile={editProfile} profile={profile}/> : <ProfileForm profileState={profileState} profileHandleChange={profileHandleChange} submitUpdate={submitUpdate}/>}
        
        </div>
    )
}
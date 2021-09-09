import profileImage from "../assets/images/UserProfile-1.png";
<<<<<<< HEAD
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
=======
//IMPORT RATING COMPONENT HERE?
import Rating from './Rating'; 
>>>>>>> main

export default function ProfileInfo({ profile }) {

    const [ updateProfile ] = useMutation(UPDATE_USER);

    // const [profileState, setProfileState] = useState({
    //     _id: '',
    //     username: '',
    //     location: '',
    //   });

    
    const editProfile = async (event) => {
        const editBtn = document.querySelector('#edit-profile');
        const profileLi = document.querySelector('.profile-info');
        const usernameLi = document.querySelector('#dashboard-username');
        const locationLi = document.querySelector('#dashboard-location')
    
        let username = usernameLi.textContent;
        let location = locationLi.textContent;

        console.log(location)

        // await setProfileState({
        //     _id: user_id,
        //     username: user_username,
        //     location: user_location,
    
        // });

        // console.log(profileState)
    
    
        editBtn.setAttribute("class","hide");
        usernameLi.setAttribute("class","hide");
        locationLi.setAttribute("class","hide");

        const profileForm = document.createElement('form');
        //Create a class attribute here to add the event listener to:
        profileForm.setAttribute("class","profile-submit");
        
        const userInput = document.createElement('input');
        userInput.setAttribute("type","text")
        userInput.setAttribute("class","profile-input");
        userInput.setAttribute("name","username")
        userInput.value = username;
        // userInput.onchange = profileHandleChange();
    
        const locationInputDiv = document.createElement('div');
        const locationInputLabel = document.createElement('label');
        locationInputDiv.appendChild(locationInputLabel);
        locationInputLabel.setAttribute("for","location");
        locationInputLabel.textContent = "Location";
        const locationInputSelect = document.createElement('select');
        locationInputSelect.setAttribute("id","location-edit");
        locationInputSelect.setAttribute("name","location");
        locationInputSelect.value = await location;
        // locationInputSelect.onchange = profileHandleChange();
        locationInputLabel.appendChild(locationInputSelect);
    
        const locationOption1 = document.createElement('option');
        locationOption1.setAttribute("value","Downtown Sacramento");
        locationOption1.textContent = "Downtown Sacramento";
        locationInputSelect.appendChild(locationOption1);
    
        const locationOption2 = document.createElement('option');
        locationOption2.setAttribute("value","West Sacramento");
        locationOption2.textContent = "West Sacramento";
        locationInputSelect.appendChild(locationOption2);
        
        const locationOption3 = document.createElement('option');
        locationOption3.setAttribute("value","East Sacramento");
        locationOption3.textContent = "East Sacramento";
        locationInputSelect.appendChild(locationOption3);
        
        const locationOption4 = document.createElement('option');
        locationOption4.setAttribute("value","North Sacramento");
        locationOption4.textContent = "North Sacramento";
        locationInputSelect.appendChild(locationOption4);
        
        const locationOption5 = document.createElement('option');
        locationOption5.setAttribute("value","South Sacramento");
        locationOption5.textContent = "South Sacramento";
        locationInputSelect.appendChild(locationOption5);
            
        const saveBtn = document.createElement('button');
        saveBtn.setAttribute("class","submit");
        saveBtn.setAttribute("class", "btn save-btn");
        saveBtn.textContent = "Save"
    
        profileForm.appendChild(userInput)
        profileForm.appendChild(locationInputDiv)
        profileForm.appendChild(saveBtn);
        profileLi.appendChild(profileForm);
    
        document.querySelector('.profile-submit').addEventListener('submit', submitUpdate);
        
        // await addOnChange();
    }


    // const profileHandleChange = (event) => {
    //     console.log(profileState);
    //     const { name, value } = event.target;

    //     setProfileState({
    //     ...profileState,
    //     [name]: value,
    //     });

    // };


    const submitUpdate = async (event) => {
        event.preventDefault();
        console.log("SUBMIT UPDATE CLICKED")
        const editBtn = document.querySelector('#edit-profile');

        const user_username = document.querySelector('.profile-input').value.trim();
        // console.log(username);
        const user_location = document.querySelector('#location-edit').value.trim();
        // console.log(location);
        const user_id = editBtn.getAttribute('data-id');


        console.log(user_username)
        console.log(user_location)
        console.log(user_id)

        const { submitUpdateProfile } = await updateProfile({
            variables: {  
            username: user_username,
            location: user_location,
            },
        });


    }
    console.log(profile)
    return (
        <div className="profile-container">
            <div className="profile">
                <img id="profile-img" src={profileImage} alt="profile"/>
                <div className="profile-info">
                    <h6 id="dashboard-firstname">Name: {profile.first_name} {profile.last_name}</h6>
                    <h6 id="dashboard-username">{profile.username}</h6>
                    <h6 id="dashboard-location">{profile.location}</h6>
                    <h6 id="dashboard-email">{profile.email}</h6>
            
                    <button id="edit-profile" type="button" className="btn" data-id={profile._id} onClick={editProfile}>Edit</button>
                
                </div>
            </div>

        </div>
    )
}
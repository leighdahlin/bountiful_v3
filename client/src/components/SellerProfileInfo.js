import profileImage from "../assets/images/UserProfile-1.png";
import { Link } from 'react-router-dom';

export default function ProfileInfo({ userData }) {
    return (
        <div className="profile-container">
            <div className="profile">
                <img id="profile-img" src={profileImage} alt="profile"/>
                <div className="profile-info">
                
                    <h6 id="dashboard-username">{userData.username}</h6>
                    <h6 id="dashboard-location">{userData.location}</h6>
                            
                </div>
            </div>

        </div>
    )
}
import profileImage from "../assets/images/UserProfile-1.png";


export default function ProfileInfo({ profile }) {
    
      console.log(profile)

    return (
        <div className="profile-container">
            <div className="profile">
                <img id="profile-img" src={profileImage} alt="profile image"/>
                <div className="profile-info">
                
                    <h6 id="dashboard-username">{profile.username}</h6>
                    <h6 id="dashboard-location">{profile.location}</h6>
            
                    <button id="edit-profile" type="button" className="btn" data-id="{data.id}">Edit</button>
                
                </div>
            </div>

        </div>
    )
}
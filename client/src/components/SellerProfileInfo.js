import profileImage from "../assets/images/UserProfile-1.png";

export default function ProfileInfo() {
    const data = {
        id: 1,
        username: "leighdahlin",
        location: "Sacramento"
    }
    return (
        <div className="profile-container">
            <div className="profile">
                <img id="profile-img" src={profileImage} alt="profile"/>
                <div className="profile-info">
                
                    <h6 id="dashboard-username">{data.username}</h6>
                    <h6 id="dashboard-location">{data.location}</h6>
            
                    {/* <button id="send-message" type="button" className="btn">Message</button> */}
                
                </div>
            </div>

        </div>
    )
}
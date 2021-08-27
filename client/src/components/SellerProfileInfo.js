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
                <img id="profile-img" src={profileImage} alt="profile image"/>
                <div className="profile-info">
                
                    <h6 id="dashboard-username">{data.username}</h6>
                    <h6 id="dashboard-location">{data.location}</h6>
            
                    {/* <button id="edit-profile" type="button" className="btn" data-id="{data.id}">Edit Profile</button>
                    <button id="add-item" type="button" className="btn">Add Item</button>    */}
                    <button id="send-message" type="button" className="btn">Send Message</button>
                
                </div>
            </div>

        </div>
    )
}
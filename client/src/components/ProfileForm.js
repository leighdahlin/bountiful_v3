

export default function ProfileForm ({ profileState, profileHandleChange, submitUpdate }) {
    return (
    <div className="profile">
        <form className="edit-profile" onSubmit={submitUpdate}>
            <label htmlFor="first-name"><b>First Name</b></label>
            <input
                id="first-name"
                type="text"
                name="first_name"
                value={profileState.first_name}
                onChange={profileHandleChange}
                required
            />
            <label htmlFor="last-name"><b>Last Name</b></label>
            <input
                id="last-name"
                type="text"
                name="last_name"
                value={profileState.last_name}
                onChange={profileHandleChange}
                required
            />
            {/* <label htmlFor="username"><b>Username</b></label>
            <input
                id="username"
                type="text"
                name="username"
                value={profileState.username}
                onChange={profileHandleChange}
                required
            /> */}
            <label htmlFor="email"><b>Email</b></label>
            <input
                id="email"
                type="text"
                name="email"
                value={profileState.email}
                onChange={profileHandleChange}
                required
            />
            <label htmlFor="location-profile"><b>Location</b></label>
            <select id="location-profile" name="location" value={profileState.location} onChange={profileHandleChange} required>
                <option value="Downtown Sacramento">Downtown Sacramento</option>
                <option value="West Sacramento">West Sacramento</option>
                <option value="East Sacramento">East Sacramento</option>
                <option value="North Sacramento">North Sacramento</option>
                <option value="South Sacramento">South Sacramento</option>
            </select>
    
            <button id="edit-profile" type="submit" className="btn">Save Changes</button>
        </form>
    </div>
    
    )
}
import ProfileInfo from '../components/ProfileInfo';
import DashboardCard from '../components/DashboardCard';

export default function MyBounty() {
    const data = [
        {
            id: 1,
            title: "Blueberries",
            item_price: "5",
            item_unit: "pint",
            item_quantity: "5",
            name: "Blueberries",
            category: "Fruit",
            description: "Fresh, juicy blueberries",
            createdAt: Date.now()
        },
        {
            id: 2,
            title: "Strawberries",
            item_price: "8",
            item_unit: "quart",
            item_quantity: "3",
            name: "Strawberries",
            category: "Fruit",
            description: "Fresh, juicy Strawberries",
            createdAt: Date.now()

        },
        {
            id: 3,
            title: "Squash",
            item_price: "5",
            item_unit: "pint",
            item_quantity: "5",
            name: "Blueberries",
            category: "Fruit",
            description: "Fresh, juicy blueberries",
            createdAt: Date.now()
        },
        {
            id: 4,
            title: "Seeds",
            item_price: "8",
            item_unit: "quart",
            item_quantity: "3",
            name: "Blueberries",
            category: "Fruit",
            description: "Fresh, juicy blueberries",
            createdAt: Date.now()
        },
        {
            id: 5,
            title: "Corn",
            item_price: "5",
            item_unit: "pint",
            item_quantity: "5",
            name: "Blueberries",
            category: "Fruit",
            description: "Fresh, juicy blueberries",
            createdAt: Date.now()
        },
        {
            id: 6,
            title: "Potatos",
            item_price: "8",
            item_unit: "quart",
            item_quantity: "3",
            name: "Blueberries",
            category: "Fruit",
            description: "Fresh, juicy blueberries",
            createdAt: Date.now()
        },
        {
            id: 7,
            title: "Watermelon",
            item_price: "8",
            item_unit: "quart",
            item_quantity: "3",
            name: "Blueberries",
            category: "Fruit",
            description: "Fresh, juicy blueberries",
            createdAt: Date.now()
        },
        {
            id: 8,
            title: "Eggs",
            item_price: "5",
            item_unit: "pint",
            item_quantity: "5",
            name: "Blueberries",
            category: "Fruit",
            description: "Fresh, juicy blueberries",
            createdAt: Date.now()
        },
        {
            id: 9,
            title: "Goat Milk",
            item_price: "8",
            item_unit: "quart",
            item_quantity: "3",
            name: "Blueberries",
            category: "Fruit",
            description: "Fresh, juicy blueberries",
            createdAt: Date.now()
        }
    ];    
    
    return(
    <div id="dashboard-image" className="dashboard-container">
        <div className="d-flex">
            <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Listings</button>
                <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
                <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button>
                <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Reviews</button>
            </div>
            <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><DashboardCard data = {data} /></div>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><ProfileInfo /></div>
                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
            </div>
        </div>
        
                
    </div>
    )
}
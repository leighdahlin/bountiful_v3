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
            cateogry: "Fruit",
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
            cateogry: "Fruit",
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
            cateogry: "Fruit",
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
            cateogry: "Fruit",
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
            cateogry: "Fruit",
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
            cateogry: "Fruit",
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
            cateogry: "Fruit",
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
            cateogry: "Fruit",
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
            cateogry: "Fruit",
            description: "Fresh, juicy blueberries",
            createdAt: Date.now()
        }
    ];    
    
    return(
    <div id="dashboard-image" className="dashboard-container">
        <ProfileInfo />
        <div className = "your-bounty">
            <div className="items">
                <DashboardCard data = {data} />
            </div>
        </div>
    </div>
    )
}
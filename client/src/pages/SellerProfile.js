import SellerProfileInfo from '../components/SellerProfileInfo';
import SellerProfileCard from '../components/SellerProfileCard';

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
    <div className="seller-profile-container">
        <SellerProfileInfo />
        <div className = "seller-bounty">
            <div className="seller-items">
                <SellerProfileCard data = {data} />
            </div>
        </div>
    </div>
    )
}
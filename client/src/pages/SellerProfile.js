import SellerProfileInfo from '../components/SellerProfileInfo';
import SellerProfileCard from '../components/SellerProfileCard';
import Review from '../components/Review';

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
        
        <div className="seller-nav-container d-flex flex-column">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#bounty" role="tab" aria-controls="home" aria-selected="true">Bounty</button>
                </li>
                <li className="nav-item">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#reviews" role="tab" aria-controls="profile" aria-selected="false">Reviews</button>
                </li>
                <li className="nav-item">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#message" role="tab" aria-controls="contact" aria-selected="false">Message</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="bounty" role="tabpanel" aria-labelledby="home-tab">
                    <div className = "seller-bounty">
                        <div className="seller-items">
                            <SellerProfileCard data = {data} />
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="seller-reviews">
                        <Review />
                    </div>
                </div>
                <div className="tab-pane fade" id="message" role="tabpanel" aria-labelledby="contact-tab">
                    <div className="seller-message-form">
                        Message Form
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

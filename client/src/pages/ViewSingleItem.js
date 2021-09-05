import CartForm from '../components/CartForm';
import SellerProfileInfo from '../components/SellerProfileInfo';
import SingleItemInfo from '../components/SingleItemInfo';
import { Link } from 'react-router-dom';

export default function ViewSingleItem() {
    const itemData = {
                id: 1,
                title: "Blueberries",
                item_price: "5",
                item_unit: "pint",
                item_quantity: "5",
                name: "Blueberries",
                category: "Fruit",
                description: "Fresh, juicy blueberries",
                createdAt: Date.now()
            };

        return (
        <div id="itemvview-image">
            <div>
                    <CartForm />
            </div>
            <div className="page-container">
                <div className="left-container">
                    <SellerProfileInfo />
                    <Link className="seller-btn" to="/profile"><button>Go to Seller's Profile</button></Link>
                </div>
                <div className="right-container">
                    <SingleItemInfo singleItemData = {itemData} />
                </div>
            </div>

        </div>

        )

}
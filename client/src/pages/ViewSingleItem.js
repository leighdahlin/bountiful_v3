import CartForm from '../components/CartForm';
import SellerProfileInfo from '../components/SellerProfileInfo';
import SingleItemInfo from '../components/SingleItemInfo';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_ITEM } from '../utils/queries';


export default function ViewSingleItem() {
    // const itemData = {
    //             id: 1,
    //             title: "Blueberries",
    //             item_price: "5",
    //             item_unit: "pint",
    //             item_quantity: "5",
    //             name: "Blueberries",
    //             category: "Fruit",
    //             description: "Fresh, juicy blueberries",
    //             createdAt: Date.now()
    //         };

    const { id } = useParams();

    console.log(id)

    const { loading, data } = useQuery(QUERY_SINGLE_ITEM, {
        variables: { _id: id },
    })

    console.log(data)

    const itemData = data?.item || {};

    const userData = data?.item.user || {};
    console.log("SINGLE USER")
    console.log(itemData.user)


    if(loading) {
        return <div>Loading...</div>
    }



        return (
        <div id="itemvview-image">
            <div>
                    <CartForm />
            </div>
            <div className="page-container">
                <div className="left-container">
                    <SellerProfileInfo userData = {userData}/>
                    <Link className="seller-btn" to={`/profile/${userData.username}`}><button>Go to Seller's Profile</button></Link>
                </div>
                <div className="right-container">
                    <SingleItemInfo singleItemData = {itemData} />
                </div>
            </div>

        </div>

        )

}
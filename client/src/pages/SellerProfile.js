import SellerProfileInfo from '../components/SellerProfileInfo';
import SellerProfileCard from '../components/SellerProfileCard';
import Review from '../components/Review';
import Cart from '../components/Cart/Cart';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SELLER } from '../utils/queries';

export default function MyBounty() {

    const { username } = useParams();

    const { loading, data } = useQuery(QUERY_SELLER, {
        variables: { username: username },
      });

    const profile = data?.seller || {};
    const sellerListings = profile.items

    if(loading) {
        return <div>Loading...</div>
    }

    return(
    <div className="seller-profile-container">
        <Cart />
        <SellerProfileInfo userData={profile}/>
        
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
                            <SellerProfileCard data = {sellerListings} />
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

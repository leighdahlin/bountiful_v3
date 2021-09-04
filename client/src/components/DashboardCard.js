import logo from "../assets/images/b-logo.png";
import formatTime from "../utils/helpers.js";

import { QUERY_ITEMS_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';

export default function DashboardCard({ toggleItem }) {

    let username = localStorage.getItem('username');

    const { loading, data } = useQuery(QUERY_ITEMS_USER, {
        variables: { username: username },
      });
    

    // if(!data){
        return(
            <div>You don't have any listings yet!</div>
        )
    // }

    // if(data.itemsuser){
    //     return data.map((item) => (
    //         <div id = {item.id} key={item.id} className="card mb-3 item-card" style={{maxWidth: "500px"}}>
    //         <div className="row g-0">
    //             <div className="col-md-4 card-pic">
    //                 <div className="item-buttons">
    //                 </div>
    //                 <img src={logo} className="img-fluid rounded-start items-b-logo" alt={item.name}/>
    //             </div>
    //             <div className="col-md-8">
    //                     <div className="card-title">
    //                         <h2 className="item-title"><strong>{item.title}</strong> </h2>
    //                     </div>
    //                     <div className="card-body">
    //                         <p className="card-text">Item Name: <span className="item-name">{item.name}</span></p>
    //                         <p className="card-text">Category: <span className="item-categories">{item.category}</span></p>
    
    //                         <p className="card-text">Price: $ <span className="item-price">{item.item_price}</span> / <span className="item-unit">{item.item_unit}</span></p>
    //                         <p className="card-text">Quantity: <span className="item-quantity">{item.item_quantity}</span></p>
                            
    //                         <p className="card-text">Description: <span className="item-description">{item.item_description}</span></p>
    //                         <p className="card-text"><small className="text-muted">Date created: {formatTime(item.createdAt)}</small></p>
    //                         <div className="center-btns">
    //                             <button id = {item.id} type="button" className="btn item-btn edit-item" onClick={toggleItem}>Edit</button>   
    //                             <button type="button" className="btn item-btn delete-item" data-id={item.id}>Delete</button>           
    //                         </div>
    //                     </div>
    //             </div>
    //         </div>
    //     </div>
    //     ));
    
    // }
    
}
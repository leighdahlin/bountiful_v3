import logo from "../assets/images/b-logo.png";
import formatTime from "../utils/helpers.js";
import { Link } from 'react-router-dom';

export default function DashboardCard({ data }) {
    return data.map((item) => (
        <Link to={`/browse/item/${item._id}`}>
            <div id = {item.id} key={item.id} className="card mb-3 item-card" style={{maxWidth: "500px"}}>
                <div className="row g-0">
                    <div className="col-md-4 card-pic">
                        <div className="item-buttons">
                        </div>
                        <img src={logo} className="img-fluid rounded-start items-b-logo" alt={item.item_name}/>
                    </div>
                    <div className="col-md-8">
                            <div className="card-title">
                                <h2 className="item-title"><strong>{item.title}</strong> </h2>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Item Name: <span className="item-name">{item.item_name}</span></p>
                                <p className="card-text">Category: <span className="item-categories">{item.category_name}</span></p>

                                <p className="card-text">Price: $ <span className="item-price">{item.item_price}</span> / <span className="item-unit">{item.item_unit}</span></p>
                                <p className="card-text">Quantity: <span className="item-quantity">{item.item_quantity}</span></p>
                                
                                <p className="card-text">Description: <span className="item-description">{item.item_description}</span></p>
                                <p className="card-text"><small className="text-muted">Date created: {formatTime(item.createdAt)}</small></p>
                                <div className="center-btns">
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        </Link>




    ));
}
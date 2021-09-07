import logo from "../assets/images/b-logo.png";
import { Link } from 'react-router-dom';


export default function BrowseCard({ data }) {

    return data.map((item) => (
        <Link to={`/browse/item/${item._id}`}>
            <div key={item._id} className="card item-card" style={{width: "18rem"}}>
                <li className="card-title list-group-item">{item.title}</li>
                <div className="browse-img-div">
                    <img src={logo} className="card-img-top browse-logo" alt="produce-pic"/>
                </div>
                <div className="card-body">
                    <p className="card-text">${item.item_price}/{item.item_unit}</p>
                    <p className="card-text">Quantity: {item.item_quantity}</p>
                </div>
            </div>
        </Link>
    ));
}
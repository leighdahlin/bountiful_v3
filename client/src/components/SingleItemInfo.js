// import tomato from "../assets/images/tomato.jpg"
import formatTime from "../utils/helpers.js";


export default function SingleItemInfo({ singleItemData }) {
    return (
    <div className="item-info itemview-components" key={singleItemData._id}>
        <h3>{singleItemData.title}</h3>
        <p>Item Name: <span id="itemview-name">{singleItemData.item_name}</span></p>
        <p>Price: $<span id="itemview-price">{singleItemData.item_price}</span>/<span id="itemview-unit">{singleItemData.item_unit}</span></p>
        <p>Quantity available: <span id="itemview-quantity">{singleItemData.item_quantity}</span></p>
        <p>Category: <span id="itemview-catname">{singleItemData.category_name}</span></p>
        <p>Date posted: <span id="itemview-createdAt">{formatTime(singleItemData.createdAt)}</span></p>
        {/* <p>Updated at: <span id="itemview-updatedAt">{{format_time updatedAt}}</span></p> */}
        <p>{singleItemData.item_description}</p>
        {/* <img id="item-view-img" src={tomato} className="card-img-top itemview-components" alt="..."/>     */}
    </div>

    )
}
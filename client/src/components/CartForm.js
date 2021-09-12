export default function CartForm({ quantity, handleQuantityChange, addToCart }) {
    return(
    <div className="form-container">
        <form id="add-cart-form">
            <select id="cart-quantity" className="add-to-cart" name="locations" defaultValue="1" value={quantity} onChange={handleQuantityChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button type="submit" className="btn add-to-cart add-cart" onClick={addToCart}>Add to Cart</button>
        </form>
    
    </div>
    
    )

}
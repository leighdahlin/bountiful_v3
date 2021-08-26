import BrowseCard from '../components/BrowseCard';

export default function Browse() {

    const data = [
        {
            title: "Blueberries",
            item_price: "5",
            item_unit: "pint",
            item_quantity: "5"
        },
        {
            title: "Strawberries",
            item_price: "8",
            item_unit: "quart",
            item_quantity: "3"
        },
        {
            title: "Squash",
            item_price: "5",
            item_unit: "pint",
            item_quantity: "5"
        },
        {
            title: "Seeds",
            item_price: "8",
            item_unit: "quart",
            item_quantity: "3"
        },
        {
            title: "Corn",
            item_price: "5",
            item_unit: "pint",
            item_quantity: "5"
        },
        {
            title: "Potatos",
            item_price: "8",
            item_unit: "quart",
            item_quantity: "3"
        },
        {
            title: "Watermelon",
            item_price: "8",
            item_unit: "quart",
            item_quantity: "3"
        },
        {
            title: "Eggs",
            item_price: "5",
            item_unit: "pint",
            item_quantity: "5"
        },
        {
            title: "Goat Milk",
            item_price: "8",
            item_unit: "quart",
            item_quantity: "3"
        }
    ];

    return (
        <div id="browse-background">
            <div class="browse-container">
                <div class="form-container">
                    <form class="browse-form">
                        {/* {{!-- <label for="item-categories"><h4 id="browse-cat" class="browse-cat">Browse by Category</h4></label> --}} */}
                        <select id="item-categories" class="browse-cat" name="category">
                            <option selected disabled hidden>Choose a Category</option>
                            <option value="fruits" data-id="1">Fruits</option>
                            <option value="vegetables"data-id="2">Vegetables</option>
                            <option value="herbs" data-id="3">Herbs</option>
                            <option value="dairy" data-id="4">Dairy</option>
                            <option value="dairy" data-id="5">Flowers</option>
                        </select>
                        <button id="browse-cat-btn" type="submit" class="btn browse-cat">FILTER</button>
                    </form>
        
                {/* {{!-- Add in an IF statement to render a heading for the category when a category is selected?? --}} */}
        
                </div>
                <div class="browse-items">
                    <BrowseCard data = {data} />
                    {/* {{#each items as |item|}}
                        {{>browsecard}}
                    {{/each}} */}
                </div>
            </div>
        </div>
    
    )
}
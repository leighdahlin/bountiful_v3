import BrowseCard from '../components/BrowseCard';

import { useQuery } from '@apollo/client';
import { QUERY_ITEMS } from '../utils/queries';


export default function Browse() {

    const { loading, data } = useQuery(QUERY_ITEMS)
    const allItems = data?.items || {};
    console.log(allItems)

    if(loading) {
        return <div>Loading...</div>
    }

    return (
        <div id="browse-background">
            <div className="browse-container">
                <div className="form-container">
                    <form className="browse-form">
                        {/* {{!-- <label for="item-categories"><h4 id="browse-cat" className="browse-cat">Browse by Category</h4></label> --}} */}
                        <select id="item-categories" className="browse-cat" name="category">
                            <option selected disabled hidden>Choose a Category</option>
                            <option value="fruits" data-id="1">Fruits</option>
                            <option value="vegetables"data-id="2">Vegetables</option>
                            <option value="herbs" data-id="3">Herbs</option>
                            <option value="dairy" data-id="4">Dairy</option>
                            <option value="dairy" data-id="5">Flowers</option>
                        </select>
                        <button id="browse-cat-btn" type="submit" className="btn browse-cat">FILTER</button>
                    </form>
        
                {/* {{!-- Add in an IF statement to render a heading for the category when a category is selected?? --}} */}
        
                </div>
                <div className="browse-items">
                    <BrowseCard data = {allItems} />
                    {/* {{#each items as |item|}}
                        {{>browsecard}}
                    {{/each}} */}
                </div>
            </div>
        </div>
    
    )
}
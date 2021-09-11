import React, { useState } from 'react';
import BrowseCard from '../components/BrowseCard';

import { useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_ITEMS, QUERY_CAT_ITEMS } from '../utils/queries';
// import {  } from '../utils/queries';


export default function Browse() {

    // let filterItems = {}
    let items = {}

    const [usefilter, setUseFilter] = useState(false)

    const { loading, data } = useQuery(QUERY_ITEMS)

    const [categoryState, setCategoryState] = useState({
        category_name: '',
      });
    
    //   const [executeFilter, filteredData] = useLazyQuery(QUERY_CAT_ITEMS)
      console.log(usefilter)

    if (data && !usefilter) {
        items = data?.items || {};
    } else {
        items = data?.items.filter((item) => item.category_name === categoryState.category_name) || {};
    }
    // console.log(allItems)


    // console.log(filteredData.data);


    const categoryChange = (event) => {
        const { name, value } = event.target;

        setCategoryState({
        ...categoryState,
        [name]: value,
        });
    };

    if(loading) {
        return <div>Loading...</div>
    }
    const filterButton = document.querySelector("#browse-cat-btn");
    const clearFilter = document.querySelector('#clear-filter')


    const filterCategory = async (event) => {
        event.preventDefault();
        // console.log("ITEMS IN FILTER")
        // console.log(filteredData.data.itemscat)

        // console.log(categoryState.category_name)

        // executeFilter({
        //     variables: { category_name: categoryState.category_name }
        // })
        // filterItems = await filteredData.data?.itemscat || {};

        // console.log("NEW ITEMS")
        // console.log(filteredData)


        // console.log(categoryState)
        // filterItems = await allItems.filter((item) => item.category_name === categoryState.category_name);
        // console.log("FILTERED ITEMS")
        // console.log(filterItems)

        setUseFilter(true)

        filterButton.className = "browse-cat hide"
        clearFilter.className="btn browse-cat"

    }

    const removeFilter = async() => {

        await setUseFilter(false)

        
        clearFilter.className = await "browse-cat hide"
        filterButton.className = await "btn browse-cat"



    }

    return (
        <div id="browse-background">
            <div className="browse-container">
                <div className="form-container">
                    <form className="browse-form">
                        {/* {{!-- <label for="item-categories"><h4 id="browse-cat" className="browse-cat">Browse by Category</h4></label> --}} */}
                        <select id="item-categories" className="browse-cat" name="category_name" value={categoryState.category_name} onChange={categoryChange}>
                            <option value="" disabled selected>Choose a Category</option>
                            <option value="fruits" data-id="1">Fruits</option>
                            <option value="vegetables"data-id="2">Vegetables</option>
                            <option value="herbs" data-id="3">Herbs</option>
                            <option value="dairy" data-id="4">Dairy</option>
                            <option value="flowers" data-id="5">Flowers</option>
                        </select>
                        <button id="browse-cat-btn" type="submit" className="btn browse-cat" onClick={filterCategory}>FILTER</button>
                        <button id="clear-filter" type="submit" className="hide browse-cat" onClick={removeFilter}>CLEAR FILTER</button>
                    </form>
        
                {/* {{!-- Add in an IF statement to render a heading for the category when a category is selected?? --}} */}
        
                </div>
                <div className="browse-items">
                    <BrowseCard data={items} />
                    {/* {usefilter? <BrowseCard data = {filterItems} />:<BrowseCard data = {allItems} />} */}
                    {/* {{#each items as |item|}}
                        {{>browsecard}}
                    {{/each}} */}
                </div>
            </div>
        </div>
    
    )
}
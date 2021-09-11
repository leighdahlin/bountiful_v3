import { useQuery } from '@apollo/client';
import { QUERY_ITEMS, QUERY_CAT_ITEMS } from '../utils/queries';

import heroImage from "../assets/images/different-vegetables-textile-bag-grey.jpg"

export default function Homepage() {

    let catName = "flowers"

    const { data } = useQuery(QUERY_CAT_ITEMS, {
      variables: { category_name: catName },
  })

  console.log(data);


    return (
        <div id="hero-image" className="image">
          <img className="image" alt="vegetable basket" src={heroImage}/>
        </div>
    )
}

import { useEffect } from "react";
import heroImage from "../assets/images/different-vegetables-textile-bag-grey.jpg"

export default function Homepage() {

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "../assets/homepageJS.js";
    //     script.async = true;
    //     document.body.appendChild(script);
    //   return () => {
    //       document.body.removeChild(script);
    //     }
    //   }, []);

    return (
        <div id="hero-image" className="image">
          <img className="image" alt="vegetable basket" src={heroImage}/>
        </div>
    )
}
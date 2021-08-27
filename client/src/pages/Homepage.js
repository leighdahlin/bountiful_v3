
import { useEffect } from "react";

export default function Homepage() {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "../assets/homepageJS.js";
        script.async = true;
        document.body.appendChild(script);
      return () => {
          document.body.removeChild(script);
        }
      }, []);

    return (
        <div id="hero-image" className="image">
        </div>
    )
}
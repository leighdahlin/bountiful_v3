import farmerMarket from "../assets/images/farmers-market2.jpg";
import VegPic1 from "../assets/images/veg-box-frontview.jpg";
import VegPic2 from "../assets/images/close-up-woman-harvesting-garden.jpg";
import VegPic3 from "../assets/images/vegetable-basket.jpg";



export default function HomepageContent() {
    return (
    <div className="content homepage-content">
        <div className="hp-section">
            <h2 className="homepage-title">Bringing the Farmer's Market to You</h2>
            <div className="homepage-content-div-1">
                <p className="homepage-pg">Sacramento is the nation's Farm to Fork Capital and it inspired us to want to bring the weekend farmer's market to eveyone's home. Whether it be a community based garden stall, a living wall of herbs, or an indoor
                garden, growers are sometimes faced with a produce in abundance. Too many tomatos? No worries! That's why we created Bountiful, a peer-to-peer produce sharing app.
                Where non-commercial gardeners can connect with their local community members to buy and sell produce and other locally grown goods.</p>
                <img id="farmer-market" src={farmerMarket} alt="Farmer's Market"/>
          </div>
        </div>
        <div className="hp-section section-2">
            <h2 className="homepage-title">At Bountiful, we say, "Power to the Produce!"</h2>
            <div className="homepage-content-div-2">
                <div className="hp-pics-div">
                    <img className="veg-pics" src={VegPic1} alt="Vegetables"/>
                    <img className="veg-pics" src={VegPic2} alt="Vegetables"/>
                    <img className="veg-pics" src={VegPic3} alt="Vegetables"/>
                </div>
            </div>
        </div>
    </div>
  
    )
}
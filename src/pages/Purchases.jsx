import axios from "axios";
import { useState, useEffect } from "react";
import getConfig from "../utils/getConfig";

const Purchases = () => {

    const [purchases, setPurchases] = useState([])

    useEffect(()=>{
        axios
        .get("https://shop-back-lqyj.onrender.com/purchases", getConfig())
        .then(resp =>setPurchases(resp.data))
    }, [])  

    return(
        <div className="purchases">
            <h1>Purchases</h1>
            {purchases.map((purchase) =>
            purchase.cart.products.map((item) => 
            <li key={item.title}>{item.title}</li>
            ))}
        </div>
    );
}
export default Purchases;
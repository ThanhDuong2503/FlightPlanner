import "./searchBox.css";
import React from "react";

// re-center to original user position
function Homebase({panTo}) {
    return (
        <button className="homeBase" onClick={() => {
            // if user's browser allows it, get user's position and re-center to it
            navigator.geolocation.getCurrentPosition((position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            }, () => null)
        }}>
            <img src="/images/AeroPathLogoSmall.png" alt="AeroPath Logo"/>
        </button>
    )
}

export default Homebase;
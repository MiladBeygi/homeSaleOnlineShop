import { Icon } from "leaflet";
import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
const LocationMarker = (props) => {
    const { homeLocation, position } = props;
    // const [position, setPosition] = useState(null);
    const icon = new Icon({
        iconUrl: require("../img/home.png"),
        iconSize: [48, 48] //size of the marker
    });
    const map = useMapEvents({
        click(e) {
            // console.log(e.latlng);
            // setPosition(e.latlng);
            homeLocation(e.latlng);
            map.flyTo(e.latlng, map.getZoom())
        },

    })
    return position === null ? null : (
        <Marker position={position} icon={icon}>
            <Popup>
                موقعیت مکانی شما در اینجاست
            </Popup>
        </Marker>
    )
}
export default LocationMarker;
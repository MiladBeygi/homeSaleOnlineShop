import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
const MyMap = (props) => {
    const { position } = props;
    const icon = new Icon({
        iconUrl: require("../img/home.png"),
        iconSize: [48, 48] //size of the marker
    });

    return <>
        <MapContainer className="h-[400px] w-full mx-auto rounded-2xl" center={position} zoom={15} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup chunkedLoading>
                <Marker position={position} icon={icon}>
                    <Popup>
                        hello there
                    </Popup>
                </Marker>
            </MarkerClusterGroup>
        </MapContainer>

    </>
}
export default MyMap;
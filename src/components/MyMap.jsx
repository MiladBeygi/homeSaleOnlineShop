import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
const MyMap = (props) => {
    const position = [35.710, 51.427];
    const icon = new Icon({
        iconUrl: require("../img/home.png"),
        iconSize: [48, 48] //size of the marker
    });
    const markers = [
        {
            geoCode: [35.710, 51.420],
            popUp: 'honarmandan park'
        },
        {
            geoCode: [35.710, 51.427],
            popUp: 'shirudi complex'
        },
        {
            geoCode: [35.736, 51.411],
            popUp: "saei park"
        }
    ]
    return <>
        <MapContainer className="h-[400px] w-[50%] mx-auto" center={position} zoom={16} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup chunkedLoading>
                {markers.map((marker, index) => {
                    return <Marker key={index + 1} position={marker.geoCode} icon={icon}>
                        <Popup>
                            {marker.popUp}
                        </Popup>
                    </Marker>
                })}
            </MarkerClusterGroup>
            {/* <Marker position={position} icon={icon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}
        </MapContainer>
        {/* <MapContainer style={{ height: "300px", width: "100%" }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer> */}
    </>
}
export default MyMap;
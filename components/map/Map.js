import { useState, useEffect, useMemo, useRef } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  Rectangle,
  Circle,
  Polyline,
} from "react-leaflet";
import { GeoLocation } from "../../helpers/geolocationservice";
import { icon } from "leaflet";

const ICON = icon({
  iconUrl:
    "https://cdn.pixabay.com/photo/2013/07/13/11/54/location-158934_960_720.png",
  iconSize: [18, 32],
  className: "text-teal-400",
});
export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 12);
  return null;
}
const rectangle = [
  [11.398254435705123, -69.70069885253908],
  [11.423915325616994, -69.62971687316896],
];
const multiPolyline = [
  [
    [11.382436076777566, -69.70602035522462],
    [11.414450513304278, -69.69808101654054],
    [11.433884586263314, -69.63546752929689],
    [11.419035728484044, -69.62851524353029],
    [11.384329277775967, -69.66516494750978],
    [11.377766127140651, -69.70537662506105],
    [11.382299345106707, -69.70602571964265],
  ],
  [
    [51.5, -0.05],
    [51.5, -0.06],
    [51.52, -0.06],
  ],
];
export default function Map() {
  const [geoData, setGeoData] = useState({ lat: 11.396634, lng: -69.689852 });
  const markerRef = useRef(null);
  const inputAddressRef = useRef(null);
  const center = [geoData.lat, geoData.lng];
  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const geoData = marker.getLatLng();
          const address = await GeoLocation({ geoData });
          inputAddressRef.current.value = address;
          console.log(geoData);
        }
      },
    }),
    []
  );
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setGeoData({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);
  return (
    <>
      <p className="block uppercase text-slate-800 font-bold text-xl">
        Marca tu ubicacion
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
          <MapContainer center={center} zoom={12} style={{ height: "15rem" }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoData.lat && geoData.lng && (
              <Marker
                icon={ICON}
                draggable
                ref={markerRef}
                eventHandlers={eventHandlers}
                position={[geoData.lat, geoData.lng]}
              >
                <Popup minWidth={90}>
                  <span>Marker is draggable</span>
                </Popup>
              </Marker>
            )}
            <ChangeView coords={center} />
            <Polyline
              positions={multiPolyline}
              pathOptions={{ color: "red" }}
            />
          </MapContainer>
        </div>
        <div className="">
          <p>
            Para una entrega eficiente lo mas importante es puntuar tu direccion
            exacta en el mapa
          </p>
          <label
            htmlFor="details"
            className="block uppercase text-slate-800 font-bold text-xl"
          >
            Especifica la Direccion (opcional)
          </label>

          <input
            ref={inputAddressRef}
            id="details"
            type="text"
            placeholder="escribe o marca en el mapa tu direccion"
            className="bg-gray-200 w-full mt-3 p-2 rounded-md "
          />
        </div>
      </div>
    </>
  );
}

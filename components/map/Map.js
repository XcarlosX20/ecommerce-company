import { useState, useEffect, useMemo, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import { GeoLocation } from "../../helpers/geolocationservice";
export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 12);
  return null;
}

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
        Marca tu ubicacion (obligatorio)
      </p>
      <MapContainer center={center} zoom={12} style={{ height: "100vh" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData.lat && geoData.lng && (
          <Marker
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
      </MapContainer>
      <p>
        Para una entrega eficiente lo mas importante es puntuar tu direccion
        exacta en el mapa
      </p>
      <div>
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
          className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
        />
      </div>
    </>
  );
}

import { OpenStreetMapProvider } from "leaflet-geosearch";
export const GeoLocation = async ({ geoData }) => {
  const provider = new OpenStreetMapProvider();

  // search
  const results = await provider.search({
    query: `${geoData.lat}, ${geoData.lng}`,
  });
  return results[0].label;
};

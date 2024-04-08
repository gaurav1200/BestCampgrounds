import React, { useEffect, useRef, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.workerClass = MapboxWorker;
const center = {
  latitude: 7.2905715, // default latitude
  longitude: 80.6337262, // default longitude
  zoom: 8, // default zoom
};
function ShowMap({ campgrounds }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [mapContainerStyle, setMapContainerStyle] = useState({
    width: "500px",
    height: "360px",
  });

  useEffect(() => {
    if (campgrounds?.length === 1) {
      center.latitude = campgrounds[0].geometry.lat;
      center.longitude = campgrounds[0].geometry.lng;
      center.zoom = 3.5;
      setMapContainerStyle({
        width: "500px",
        height: "360px",
      });
    } else if (campgrounds?.length > 1) {
      center.lat =
        campgrounds.reduce((acc, curr) => acc + curr.geometry.lat, 0) /
        campgrounds.length;
      center.lng =
        campgrounds.reduce((acc, curr) => acc + curr.geometry.lng, 0) /
        campgrounds.length;
      setMapContainerStyle({
        width: "90vw",
        height: "90vh",
      });
      setLat(77.02);
      setLng(32.57);
      setLat(center.lat);
      setLng(center.lng);
      setZoom(1);
    }

    const campgroundsString = { type: "FeatureCollection", features: [] };
    for (let camp of campgrounds) {
      campgroundsString.features.push({
        type: "Feature",
        geometry: camp.geometry,
        properties: {
          title: "Mapbox",
          description: camp.title,
        },
      });
    }
    console.log(campgroundsString);
    if (!map.current) {
      // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: 2.5,
      });

      map.current.addControl(new mapboxgl.NavigationControl());

      campgrounds.forEach((campground) => {
        new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>${campground.title}</h3><p>${campground.city}, ${campground.state}, ${campground.country}</p>`
            )
          )
          .addTo(map.current);
      });
    }
  }, []);

  return (
    <div className="d-flex position-relative justify-content-center">
      <div ref={mapContainer} style={mapContainerStyle} />
    </div>
  );
}

export default ShowMap;

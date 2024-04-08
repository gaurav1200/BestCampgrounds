import React, { useEffect, useRef, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const center = {
  latitude: 7.2905715, // default latitude
  longitude: 80.6337262, // default longitude
  zoom: 8, // default zoom
};
function ShowMap({ campgrounds }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const [zoom, setZoom] = useState(9);
  const [mapContainerStyle, setMapContainerStyle] = useState({
    width: "500px",
    height: "360px",
  });

  useEffect(() => {
    center.latitude = campgrounds[0].geometry.lat;
    center.longitude = campgrounds[0].geometry.lng;
    center.zoom = 3.5;
    setMapContainerStyle({
      width: "500px",
      height: "360px",
    });

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

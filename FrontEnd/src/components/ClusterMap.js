import React, { useEffect, useRef, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
const center = {
  latitude: 7.2905715, // default latitude
  longitude: 80.6337262, // default longitude
  zoom: 8, // default zoom
};
function ClusterMap({ campgrounds }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(43.82715019954796);
  const [lat, setLat] = useState(39.79358829830636);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    center.lat =
      campgrounds.reduce((acc, curr) => acc + curr.geometry.lat, 0) /
      campgrounds.length;
    center.lng =
      campgrounds.reduce((acc, curr) => acc + curr.geometry.lng, 0) /
      campgrounds.length;

    // setLat(77.02);
    // setLng(32.57);
    setLat(
      campgrounds.reduce((acc, curr) => acc + curr.geometry.lat, 0) /
        campgrounds.length
    );
    setLng(
      campgrounds.reduce((acc, curr) => acc + curr.geometry.lng, 0) /
        campgrounds.length
    );
    setZoom(2);

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

    if (!map.current) {
      // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.addControl(new mapboxgl.NavigationControl());
      map.current.on("load", () => {
        // Add a new source from our GeoJSON data and
        // set the 'cluster' option to true. GL-JS will
        // add the point_count property to your source data.
        map.current.addSource("campgroundsString", {
          type: "geojson",
          // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
          // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
          data: campgroundsString,
          cluster: true,
          clusterMaxZoom: 8, // Max zoom to cluster points on
          clusterRadius: 30, // Radius of each cluster when clustering points (defaults to 50)
        });

        map.current.addLayer({
          id: "clusters",
          type: "circle",
          source: "campgroundsString",
          filter: ["has", "point_count"],
          paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#51bbd6",
              5,
              "#f1f075",
              15,
              "#f28cb1",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              10,
              30,
              30,
              40,
            ],
          },
        });

        map.current.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "campgroundsString",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
        });

        map.current.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "campgroundsString",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });

        // inspect a cluster on click
        map.current.on("click", "clusters", (e) => {
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = features[0].properties.cluster_id;
          map.current
            .getSource("campgroundsString")
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;

              map.current.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.current.on("click", "unclustered-point", (e) => {
          console.log(e);
          // const t = e.features[0].properties.popUp;
          const coordinates = e.features[0].geometry.coordinates.slice();

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(e.features[0].properties.description)
            //   .setHTML(`<h3>${e.features[0].properties.description}</h3>`)
            .addTo(map.current);
        });

        map.current.on("mouseenter", "clusters", () => {
          map.current.getCanvas().style.cursor = "pointer";
        });
        map.current.on("mouseleave", "clusters", () => {
          map.current.getCanvas().style.cursor = "";
        });
        map.current.on("mouseenter", "unclustered-point", () => {
          map.current.getCanvas().style.cursor = "pointer";
        });
        map.current.on("mouseleave", "unclustered-point", () => {
          map.current.getCanvas().style.cursor = "";
        });
      });
    }
  }, [lat, lng, zoom, campgrounds]);

  return (
    <div className="d-flex justify-content-center">
      <div ref={mapContainer} style={{ width: "95vw", height: "80vh" }} />
    </div>
  );
}

export default ClusterMap;

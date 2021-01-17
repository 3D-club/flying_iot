// src/DisplayMapClass.js
import * as React from "react";

var wp_arr = [];
var count = 0;
var my_arr = [];

class DisplayMapClass extends React.Component {
  mapRef = React.createRef();
  state = {
    map: null,
  };

  componentDidMount() {
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "3H10rLgR14JItkoy62qrTqFjcF4rFMfM6G_ZIaNKPk0",
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 50, lng: 5 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    map.setCenter({ lat: 22.9734, lng: 78.6569 });
    function addMarkersToMap(map, coords) {
      var Marker = new H.map.Marker({
        lat: coords.lat.toFixed(4),
        lng: coords.lng.toFixed(4),
      });
      map.addObject(Marker);
    }
    function setUpClickListener(map) {
      // Attach an event listener to map display
      // obtain the coordinates and display in an alert box.
      map.addEventListener("tap", function (evt) {
        var coord = map.screenToGeo(
          evt.currentPointer.viewportX,
          evt.currentPointer.viewportY
        );
        wp_arr.push({
          Latitude:
            Math.abs(coord.lat.toFixed(4)) + (coord.lat > 0 ? "N" : "S"),
          Longitude:
            Math.abs(coord.lng.toFixed(4)) + (coord.lng > 0 ? "E" : "W"),
        });
        //console.log(wp_arr[count].Latitude);
        console.log(wp_arr);
        console.log(count);
        //my_arr[count][0] = wp_arr[count].Latitude;
        //my_arr[count][1] = wp_arr[count].Longitude;
        count++;
        //console.log(my_arr[count][1]);
        addMarkersToMap(map, coord);
      });
    }

    setUpClickListener(map);

    this.setState({ map });
  }

  componentWillUnmount() {
    this.state.map.dispose();
  }

  render() {
    return <div ref={this.mapRef} style={{ height: "500px" }} />;
  }
}

export { DisplayMapClass as default, count, wp_arr };

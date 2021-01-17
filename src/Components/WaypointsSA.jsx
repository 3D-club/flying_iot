import React, { Component } from "react";
import axios from "axios";
import Disp, { count, wp_arr } from "./DisplayMapClass.js";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat_long: "",
      latitude: "",
      longitude: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    var i = 0;
    for (i = 0; i < count; i++) {
      if (i == 0) {
        this.state.lat_long = wp_arr[i].Latitude + wp_arr[i].Longitude;
        this.state.latitude = wp_arr[i].Latitude;
        this.state.longitude = wp_arr[i].Longitude;
      } else {
        this.setState({
          lat_long: wp_arr[i].Latitude + wp_arr[i].Longitude,
          latitude: wp_arr[i].Latitude,
          longitude: wp_arr[i].Longitude,
        });
      }

      const { lat_long, latitude, longitude } = this.state;
      console.log(latitude);
      console.log(i);
      await axios
        .post("https://9t0ax6l8x2.execute-api.ap-south-1.amazonaws.com/CORS", {
          lat_long,
          latitude,
          longitude,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}
export default Form;

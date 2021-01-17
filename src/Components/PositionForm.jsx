import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state);
  }
  async handleSubmit(event) {
    event.preventDefault();

    const { latitude, longitude } = this.state;
    console.log(latitude);
    await axios
      .post("https://9t0ax6l8x2.execute-api.ap-south-1.amazonaws.com/CORS", {
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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Latitude:</label>
          <input
            type="text"
            name="latitude"
            onChange={this.handleChange}
            value={this.state.latitude}
          />
          <label>Longitude:</label>
          <input
            type="text"
            name="longitude"
            onChange={this.handleChange}
            value={this.state.longitude}
          />
          <br></br>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}
export default Form;

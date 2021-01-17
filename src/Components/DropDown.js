import React, { Component } from "react";
import "./CloudDropDown.css";

class DropDown extends Component {
  container = React.createRef();

  state = {
    open: false,
  };

  handleBtnClick = () => {
    this.setState((state) => {
      return { open: !state.open };
    });
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false,
      });
    }
  };

  render() {
    return (
      <div>
        <div className="dropDownBtnParent" ref="this.container">
          <button
            onClick={this.handleBtnClick}
            type="button"
            className="dropBtn"
          >
            CloudInfo
          </button>
          {this.state.open && (
            <div className="cloudDropDownMenu">
              <ul>
                <li>
                  <a>Camera view</a>
                </li>
                <li>
                  <a>Thermal view</a>
                </li>
                <li>
                  <a>Sensor Output</a>
                </li>
                <li>
                  <a>etc</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

/*
function drop() {
  document.getElementById("myDropDown").classList.toggle('show');
  // document.getElementsByClassName(".cloud-dropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.DropBtn')) {
      var dropdowns = document.getElementsByClassName("cloud-dropdown");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
*/

export default DropDown;

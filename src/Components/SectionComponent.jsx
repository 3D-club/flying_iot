import React, { Component } from "react";
import DropDown from "./DropDown";

class SectionComponent extends Component {
  state = {};
  render() {
    return (
      <div className="Section">
        <section>
          <h3>MAP VIEW</h3>
          <article>
            <img src="https://picsum.photos/400"></img>
          </article>
        </section>
        <section>
          <h3>
            <DropDown />
          </h3>
          <article>
            <img src="https://picsum.photos/400"></img>
          </article>
        </section>
      </div>
    );
  }
}

export default SectionComponent;

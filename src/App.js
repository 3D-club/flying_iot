import "./AdarshApp.css";
import "./Components/HeaderComponent";
import HeaderComponents from "./Components/HeaderComponent.jsx";
import SectionComponent from "./Components/SectionComponent.jsx";
import SideMenu from "./Components/SideMenu";
import MyFooter from "./Components/footer";
import NavBar from "./Components/NavBar";
//import PosForm from "./Components/PositionForm";
import DisplayMapClass from "./Components/DisplayMapClass";
import WaypointsSA from "./Components/WaypointsSA";

function App() {
  return (
    <div>
      <SideMenu />

      <div className="App">
        <header className="App-header">
          <p>
            <HeaderComponents />
          </p>
        </header>
        <NavBar />
        <DisplayMapClass />
        <WaypointsSA />
        <SectionComponent />

        <MyFooter />
      </div>
    </div>
  );
}

export default App;

import "./AdarshApp.css";
import "./Components/HeaderComponent";
import HeaderComponents from "./Components/HeaderComponent.jsx";
import SectionComponent from "./Components/SectionComponent.jsx";
import SideMenu from "./Components/SideMenu";
import MyFooter from "./Components/footer";
import NavBar from "./Components/NavBar";

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

        <SectionComponent />

        <MyFooter />
      </div>
    </div>
  );
}

export default App;

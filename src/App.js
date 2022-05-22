import MicroFrontend from "./components/MicroFrontend"

let weatherHost = "http://localhost:3003";
let dogsHost = "http://localhost:3002";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span id="weather" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          Learn React
          {/* <MicroFrontend host={weatherHost} name="Dogs" fallback={<span>Weather not available</span>} options={{location:"Johannesburg, ZA"}} /> */}
          <MicroFrontend host={dogsHost} name="Dogs" />;
      </header>
    </div>
  );
}

export default App;

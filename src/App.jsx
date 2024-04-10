import Summary from "./components/Summary";
import Hero from "./components/Hero";
import "./index.css";

function App() {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Summary />
      </div>
    </main>
  );
}

export default App;

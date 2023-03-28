import './App.css';
import SensorCharts from './components/SensorCharts.js';

function App() {
  return (
    <main>
      <div><h1>Smart Garden IoT</h1></div>
      {SensorCharts()}
    </main>
  )
}

export default App;

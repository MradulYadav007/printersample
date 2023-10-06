import {thermalReceipt} from './printer.js'

function App() {

  const handleclick=()=>{
    thermalReceipt();
  }
  return (
    <div className="App">
      <button onClick={handleclick}>Print</button>
    </div>
  );
}

export default App;

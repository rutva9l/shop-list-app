import ShopList from './components/shopList';
import Buttons from './components/Buttons';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Shops List</h1>
      <Buttons />
      <ShopList />
    </div>
  );
}

export default App;

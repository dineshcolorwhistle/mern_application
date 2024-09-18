import {Routes , Route, Link} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="giant-construction">
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;

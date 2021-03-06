import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Chat from './components/Chat'
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Route exact path='/' component={Home}/>
        <Route  path='/chat' component={Chat}/>
      </Router>
    </>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import VideoGames from './videoGames';
import Contact from './contact';
import './index.css';

class Todo extends React.Component{
  render(){
    return (
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/" element={<VideoGames />}/>
        </Routes>
      </Router>
    );
  }

}

function Navigation(){
  return (
    <nav className="text-2xl md:text-2xl p-10 md:p-20 flex flex-col md:flex-row gap-5 md:gap-10">
      <NavLink to="/" caption="video games" bg="video" />
      <NavLink to="/contact" caption="contact" bg="contact"/>
    </nav>
  )
}

function NavLink(props){
  const location = useLocation();
  return (
    <Link className="font-heading-white uppercase relative hover:text-gray" to={props.to}>
      { location.pathname === props.to && 
        <div className="absolute bottom-2 -left-4 md:-left-8 text-3xl md:text-5xl opacity-20">{props.bg}</div>
      }
      {props.caption}
    </Link>
  )  
}

ReactDOM.render(
  <Todo />,
  document.getElementById('root')
);

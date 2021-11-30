import './App.css';
import React, { useEffect, useState } from 'react';
import Data from './Data';


function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people`)
      .then((responce) => {
        return responce.json();
      })
      .then((data) => {
        setPersons([...data.results])
      })
  }, [])



  return (
    <div className="App">
      <div className="planets-row">
        {
          persons.map((person, index) => {
            return <Data key={index} person={person} />;
          })
        }
      </div>
    </div>
  );
}

export default App;

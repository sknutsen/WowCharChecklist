import React, { useState } from 'react';
import './App.css';
import { Character } from './entities/Character';

function App() {
  const [chars, setChars] = useState<Character[]>([]);
  const [name, setName] = useState("");
  const [account, setAccount] = useState(1);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Account</th>
            <th>Gold</th>
            <th>Mats</th>
            <th>TBC</th>
            <th>Classic</th>
          </tr>
        </thead>
        <tbody>
          {chars.map((c) => 
            <tr>
              <td>{c.name}</td>
              <td>{c.account}</td>
              <td><input type="checkbox" onChange={(e) => c.goldTransferred = e.target.checked} /></td>
              <td><input type="checkbox" onChange={(e) => c.matsTransferred = e.target.checked} /></td>
              <td><input type="checkbox" onChange={(e) => c.tbc = e.target.checked} /></td>
              <td><input type="checkbox" onChange={(e) => c.classic = e.target.checked} /></td>
            </tr>
          )}
        </tbody>
      </table>
      <hr />
      <form onSubmit={async (e) => {
        e.preventDefault();
        const char: Character = new Character();
        char.name = name;
        char.account = account;

        chars.push(char);

        setName("");
      }}>
        <label>Name</label>
        <input name="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Account</label>
        <input name="Account" type="number" value={account} onChange={(e) => setAccount(Number(e.target.value))} min={1} max={5} />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;

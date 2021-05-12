import React, { useState } from 'react';
import './App.css';
import { apiUrl } from './constants';
import { Character } from './entities/Character';

function App() {
  const [chars, setChars] = useState<Character[]>([]);
  const [name, setName] = useState("");
  const [account, setAccount] = useState(1);

  const getChars = async () => {
    const response = await fetch(`${apiUrl}/`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json; charset=UTF-8'
      }, 
      mode: "cors", 
    });

    const data: Character[] = await response.json();

    data.sort((x, y) => {
      return x.id < y.id ? -1 : 1;
    });

    console.log(data);

    setChars(data);
  };

  const putChar = async (id: number, char: Character) => {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json; charset=UTF-8'
      }, 
      mode: "cors", 
      body: JSON.stringify(char)
    });

    const data = await response.json();

    console.log(data);
  };

  const postChar = async () => {
    const response = await fetch(`${apiUrl}/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charset=UTF-8'
      }, 
      mode: "cors", 
      body: JSON.stringify({
          "name": name,
          "account": account
      })
    });

    const data = await response.json();

    console.log(data);
  };

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
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.account}</td>
              <td><input type="checkbox" defaultChecked={c.goldTransferred} onChange={(e) => {c.goldTransferred = e.target.checked; putChar(c.id, c);}} /></td>
              <td><input type="checkbox" defaultChecked={c.matsTransferred} onChange={(e) => {c.matsTransferred = e.target.checked; putChar(c.id, c);}} /></td>
              <td><input type="checkbox" defaultChecked={c.tbc} onChange={(e) => {c.tbc = e.target.checked; putChar(c.id, c);}} /></td>
              <td><input type="checkbox" defaultChecked={c.classic} onChange={(e) => {c.classic = e.target.checked; putChar(c.id, c);}} /></td>
            </tr>
          )}
        </tbody>
      </table>
      <hr />
      <form onSubmit={async (e) => {
        e.preventDefault();
        // const char: Character = new Character();
        // char.name = name;
        // char.account = account;

        // chars.push(char);

        await postChar();

        await getChars();

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
      <button onClick={getChars}>Fetch</button>
    </div>
  );
}

export default App;

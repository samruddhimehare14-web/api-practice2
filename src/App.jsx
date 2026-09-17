import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");


  // GET METHOD

  async function getUsers() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    console.log("GET Status:", response.status);

    const data = await response.json();

    console.log("GET Response:", data);

    setUsers(data);

    setStatus(response.status);
  }


  // POST METHOD

  async function addUser(e) {
    e.preventDefault();

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          Username: Username,
          email: email,
        }),
      }
    );

    console.log("POST Status:", response.status);

    setStatus(response.status);

    const data = await response.json();

    console.log("POST Response:", data);

    if (response.status === 201) {
      setMessage("User created successfully!");
    } else {
      setMessage("Something went wrong!");
    }

    setUsername("");
    setEmail("");
  }


  // PUT METHOD

  async function updateUser() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: "Vaishnavi",
          email: "vaishnavi@gmail.com",
        }),
      }
    );

    console.log("PUT Status:", response.status);

    const data = await response.json();

    console.log("PUT Response:", data);

    if (response.status === 200) {
      setMessage("User updated successfully!");
    } else {
      setMessage("Something went wrong!");
    }

    setStatus(response.status);
  }

  return (
    <div>
      <h1>User Management</h1>

      {/* GET BUTTON*/}

      <button onClick={getUsers}>
        Get Users
      </button>

      <br />
      <br />

      {/*POST FORM*/}

      <form onSubmit={addUser}>
        <div>
          <label>Name: </label>

          <input
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Email: </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Add User
        </button>
      </form>

      <br />

      {/*PUT BUTTON*/}

      <button onClick={updateUser}>
        Update User 1
      </button>

      <h3>{message}</h3>

      {status && (
        <p>
          Status Code: {status}
        </p>
      )}

      <hr />

      {/* DISPLAY USERS */}

      <h2>Users</h2>

      {users.map((user) => (
        <p key={user.id}>
          {user.name} - {user.email}
        </p>
      ))}
    </div>
  );
}

export default App;
import React, {useState} from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleInputChange = (e) => {
    const { name, value} = e.target;
    if (name === "username") {
        setUsername(value)
    } else if (name === "password") {
        setPassword(value)
    }
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    console.log("Username",username);
    console.log("Password",password)
  }

  return (
      <form>
          <label>
              Username:
              <input type="text" value={username} onChange={handleInputChange} placeholder= "Username (Required)" name="username" />
          </label>
          <label>
              Password:
              <input type="text" value={password} onChange={handleInputChange} placeholder="Password (Required)" name="password" />
          </label>
          <input type="submit" value="submit" onClick={handleFormSubmit} />
      </form>
  )
}

export default Signup;
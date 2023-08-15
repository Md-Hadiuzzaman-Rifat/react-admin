import "./login.scss";
import { useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import initalizeApp from "../../firebase/firebase.initialize"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authModalContext";

initalizeApp()

const Login = () => {
  
  const navigate=useNavigate()
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {dispatch}=useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential= await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user
      dispatch({type:"LOGIN", payload:user})
      console.log(user);
      navigate('/')

    } catch (err) {
      setError(err.message)
      console.log(error);
    }
  };

  return (
    <div className="login" onSubmit={handleSubmit}>

      <form className="login-content">
        <h1>Login</h1>
        <input
          type="text"
          id="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          id="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Login;

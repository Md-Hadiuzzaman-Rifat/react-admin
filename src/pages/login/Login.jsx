import "./login.scss";

const Login = () => {

  const handleSubmit=()=>{

  }

  return (
    <div className="login">
      <form className="login-content">
        <h1>Login</h1>
        <input type="text" placeholder="Enter Email" />
        <input type="text" placeholder="Enter Password" />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Login;

import "./Login.scss";

function Login() {
  return (
    <div className="Login">
      <div className="LoginContainer">
        <div className="LoginTitle">Access</div>
        <input
          placeholder="Username"
          type="text"
          className="InputLogin GlowingBorder"
        ></input>
        <input
          placeholder="Password"
          className="InputLogin GlowingBorder"
          type="password"
        ></input>
        <div className="GuestAccessLink">
          <button>Guest buttonccess...</button>
        </div>
      </div>
    </div>
  );
}

export default Login;

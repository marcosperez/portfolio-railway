import { useDispatch } from "react-redux";
import { loginUser } from "../features/User/UserSlice";
import "./Login.scss";
import { Formik } from "formik";
import { AppDispatch } from "../features/store";

function Login() {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: { username: string; password: string }) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="Login">
      <div className="LoginContainer">
        <Formik
          initialValues={{ username: "marcos", password: "testtest" }}
          validate={(values) => {
            const errors = {} as any;
            if (!values.username) {
              errors.username = "Field Required";
            }
            if (!values.password) {
              errors.password = "Field Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="LoginTitle">Access</div>
              <input
                placeholder="Username"
                type="text"
                className="InputLogin GlowingBorder"
                defaultValue="marcos"
              ></input>
              {!!errors.username && <div>errors.username</div>}
              <input
                placeholder="Password"
                className="InputLogin GlowingBorder"
                type="password"
                defaultValue="testtest"
              ></input>
              {!!errors.password && <div>errors.password</div>}
              {/* <div className="GuestAccessLink">
          <button>Guest buttonccess...</button>
        </div> */}

              <button
                type="submit"
                className="btn btn-primary btn-ghost LoginButton"
              >
                Login
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;

import "./Login.scss";
import { Formik } from "formik";
import { UserLogin } from "../features/User/models/UserLogin";
import { GetUser, useLoginUser } from "../features/User/hooks";
import * as yup from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";

let LoginSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().required(),
});

function Login() {
  const loginUser = useLoginUser();
  const { isFetching, isError, isSuccess, reason } = GetUser();

  const onSubmit = (data: UserLogin) => {
    loginUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Loggin Success", { position: toast.POSITION.TOP_RIGHT });
    }
  }, [isSuccess]);

  return (
    <div className="Login">
      <div className="LoginContainer">
        <div></div>
        <div></div>
        <div></div>
        <Formik
          initialValues={{ login: "admin", password: "testtest" }}
          validationSchema={LoginSchema}
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
                name="login"
                className="InputLogin GlowingBorder"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.login}
              ></input>
              {!!errors.login && (
                <div className="terminal-alert terminal-alert-error">
                  {errors.login}
                </div>
              )}
              <input
                placeholder="Password"
                name="password"
                className="InputLogin GlowingBorder"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              ></input>
              {!!errors.password && (
                <div className="terminal-alert terminal-alert-error">
                  {errors.password}
                </div>
              )}
              {/* <div className="GuestAccessLink">
          <button>Guest buttonccess...</button>
        </div> */}

              <button
                type="submit"
                className="btn btn-primary btn-ghost LoginButton"
                disabled={isSubmitting && isFetching}
              >
                Login
              </button>
              {isError && (
                <div className="terminal-alert terminal-alert-error  LoginError">
                  Upps - {reason}
                </div>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;

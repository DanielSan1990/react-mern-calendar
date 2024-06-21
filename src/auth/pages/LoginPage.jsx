import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import "./LoginPage.css";

// Campos del formulario de inicio de sesión
const initialLoginForm = {
  email: "",
  password: "",
};

// Campos del formulario de registro
const initialRegisterForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const LoginPage = () => {
  const { initiateLogin, errorMessage, initiateRegister } = useAuthStore();

  // Manejo de formulario de inicio de sesión
  const {
    email: loginEmail,
    password: loginPassword,
    handleInputChange: onLoginInputChange,
  } = useForm(initialLoginForm);

  // Manejo de formulario de registro
  const {
    email: registerEmail,
    name: registerName,
    password: registerPassword,
    confirmPassword: registerConfirmPassword,
    handleInputChange: onRegisterInputChange,
  } = useForm(initialRegisterForm);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    initiateLogin({ email: loginEmail, password: loginPassword });
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      Swal.fire("Error en registro", "Las contraseñas no coinciden", "error");
      return;
    }
    initiateRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="email"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="name"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="email"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="confirmPassword"
                value={registerConfirmPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

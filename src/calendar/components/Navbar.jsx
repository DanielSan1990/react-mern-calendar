import { useAuthStore } from "../../hooks/useAuthStore";

export const Navbar = () => {
    const { initiateLogout, user } = useAuthStore();

    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i>
                &nbsp;
                {user.name}
            </span>

            <button 
                className="btn btn-outline-danger"
                onClick={initiateLogout}
            >
                <i className="fas fa-sign-out-alt"></i>
                &nbsp;
                <span>Salir</span>
            </button>
        </div>
    );
}

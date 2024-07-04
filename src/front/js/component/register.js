import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const PasswordErrorMessage = () => {
    return (
        <p className="FieldError">Password should have at least 8 characters</p>
    );
};

const ConfirmPasswordErrorMessage = () => (
    <div className="text-danger">Passwords do not match</div>
);

const Register = () => {
    const { actions } = useContext(Context);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({ value: '', isTouched: false });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', isTouched: false });
    const navigate = useNavigate();

    const getIsFormValid = () => {
        return (
            first_name &&
            last_name &&
            email &&
            password.value.length >= 8 &&
            confirmPassword.value === password.value
        );
    };

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword({ value: "", isTouched: false });
        setConfirmPassword({ value: "", isTouched: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                first_name,
                last_name,
                email,
                password: password.value
            };

            await actions.register(userData);
            alert("Account created!");
            clearForm();
            navigate("/login");
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    return (
        <div className="my-5 mt-5">
            <form onSubmit={handleSubmit}>
                <div className="row mb-3 mt-5 text-center ">
                    <h3 className="mt-5">Register</h3>
                    <div className="col-sm-5 m-auto">
                        <input
                            type="name"
                            className="form-control "
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First name"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-5 m-auto">
                        <input
                            type="name"
                            className="form-control"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last name"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-5 m-auto">
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-5 m-auto">
                        <input
                            type="password"
                            className="form-control"
                            value={password.value}
                            onChange={(e) =>
                                setPassword({ ...password, value: e.target.value })
                            }
                            onBlur={() =>
                                setPassword({ ...password, isTouched: true })
                            }
                            placeholder="Password"
                        />
                        {password.isTouched && password.value.length < 8 ? (
                            <PasswordErrorMessage />
                        ) : null}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-5 m-auto ">
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword.value}
                            onChange={(e) =>
                                setConfirmPassword({ ...confirmPassword, value: e.target.value })
                            }
                            onBlur={() =>
                                setConfirmPassword({ ...confirmPassword, isTouched: true })
                            }
                            placeholder="Confirm Password"
                        />
                        {confirmPassword.isTouched && confirmPassword.value !== password.value ? (
                            <ConfirmPasswordErrorMessage />
                        ) : null}
                    </div>
                </div>
                {/* Comenté el campo de selección de rol porque parece que no lo estás utilizando actualmente */}
                {/* <fieldset className="row mb-3 ">
                    <div className="col-sm-5 d-flex justify-content-evenly m-auto">
                        <div className="form-check ">
                            <label className="form-check-label" htmlFor="gridRadios1">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios1"
                                    value="Artist"
                                    onChange={(e) => setRole(e.target.value)}
                                    checked={role === "Artist"}
                                />
                                Artist
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="gridRadios2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios2"
                                    value="Client"
                                    onChange={(e) => setRole(e.target.value)}
                                    checked={role === "Client"}
                                />
                                Client
                            </label>
                        </div>
                    </div>
                </fieldset> */}

                <button
                    type="submit"
                    className="btn btn-primary col-sm-2 col-12 m-auto my-3"
                    disabled={!getIsFormValid()}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;

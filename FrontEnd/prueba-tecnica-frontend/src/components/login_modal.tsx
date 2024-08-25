"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useToken  } from '../components/TokenContext';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const { setToken, setEmail } = useToken();

    useEffect(() => {
        if (modalRef.current) {
            if (isOpen) {
                modalRef.current.showModal();
            } else {
                modalRef.current.close();
            }
        }
    }, [isOpen]);

    const [emailUser, setEmailUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = {
            email:emailUser,
            password
        };

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                console.error('Correct:', result);
                setToken(result.token);
                setEmail(result.email);
                setSuccessMessage('Login Exitoso');
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                console.error('Error al registrar:', errorData);
                console.error('Mensaje de error:', errorData.message);
                if (Array.isArray(errorData.message)) {
                    setErrorMessage(errorData.message.join(', '));
                  } else if (typeof errorData.message === 'string') {
                    setErrorMessage(errorData.message);
                  } else {
                    setErrorMessage('Se ha producido un error inesperado.');
                  }
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const closeModal = () => {
        setEmail('');
        setPassword('');
        setErrorMessage('');
        setSuccessMessage('');
        onClose();
    };

    return (
        <dialog ref={modalRef} id="my_modal_5" className="modal modal-middle max-md:w-[90%]">
            <div className="modal-box">
                <div className="flex justify-end mb-4">
                    <button
                        type="button"
                        className="btn"
                        onClick={closeModal}
                    >
                        <svg
                            className="h-8 w-8 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <h3 className="font-bold text-3xl text-center">Iniciar Sesión</h3>

                <form method="dialog" onSubmit={handleLogin}>
                    <div className="py-4">
                        <label className="input input-bordered flex items-center gap-2 m-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                autoComplete="off"
                                type="text"
                                id="emailUser"
                                value={emailUser}
                                placeholder="Email"
                                onChange={(e) => setEmailUser(e.target.value)}
                                required
                            />
                        </label>

                        <label className="input input-bordered flex items-center gap-2 m-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input
                                autoComplete="off"
                                type="text"
                                id="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    {errorMessage && (
                        <div className="bg-red-500 text-white text-center border border-red-300 p-3 rounded mt-2 z-20 relative m-3">
                            Error: {errorMessage}
                        </div>
                    )}

                    {successMessage && (
                        <div className="bg-green-500 text-white text-center border border-green-300 p-3 rounded mt-2 z-20 relative m-3">
                            {successMessage}
                        </div>
                    )}

                    <div className="modal-action flex justify-center p-3">
                        <button type="submit" className="btn btn-primary w-full">Login</button>
                    </div>

                </form>
            </div>
        </dialog>
    );
};

export default LoginModal;

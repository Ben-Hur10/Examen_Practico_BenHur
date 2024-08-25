"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LoginModal from '../components/login_modal';
import RegisterModal from '../components/register_modal';
import { motion, AnimatePresence } from "framer-motion";
import { useToken } from '../components/TokenContext';

const Navbar = () => {
  const { setToken } = useToken();
  const { token } = useToken();

  const [isClick, setIsClick] = useState(false);
  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  const handleLogout = () => {
    setToken(null);
  };


  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  return (
    <div className="md:flex md:justify-center  w-full">
      <nav className="w-[95%] bg-zinc-700 bg-opacity-70 m-3 rounded-lg">
        <div className="px-4 lg:px-8">
          <div className="flex items-center md:justify-between h-16">
            <div className="md:hidden">
              <button
                className="inline-flex rounded-md text-white"
                onClick={toggleNavbar}
              >
                {isClick ? (
                  <svg
                    className="h-6 w-6 mt-1"
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
                      className="animate-fade-left animate-once animate-duration-[900ms] animate-ease-out"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 stroke-current mt-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                      className="animate-fade-right animate-once animate-duration-[900ms] animate-ease-out"

                    ></path>
                  </svg>
                )}
              </button>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="text-white font-bold max-md:m-4">
                  Logo
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex justify-center space-x-4 lg:ml-40 md:ml-28">
                <a
                  href="/pages/users"
                  className="custom-link text-white font-semibold p-2 relative"
                >
                  Usuarios
                </a>

                <a
                  href="/pages/books"
                  className="custom-link text-white font-semibold p-2 relative"
                >
                  Libros
                </a>
              </div>
            </div>
            <div className="flex justify-end max-md:w-full ">

              {token ? (
                <div className="flex justify-end mx-1">
                  <button
                    className="btn btn-ghost hover:bg-transparent border-2 hover:border-white font-semibold text-white"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-end mx-1">
                    <button
                      className="btn btn-ghost hover:bg-transparent border-2 hover:border-white font-semibold text-white"
                      onClick={openLoginModal}
                    >
                      Iniciar Sesión
                    </button>
                    <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="btn btn-ghost hover:bg-transparent border-2 hover:border-white font-semibold text-white"
                      onClick={openRegisterModal}
                    >
                      Registrarse
                    </button>
                    <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </nav>

      {/* Menu lateral */}
      <AnimatePresence>
        {isClick && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isClick ? 1 : 0, y: isClick ? 0 : -20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: .4, ease: "easeInOut" }}
            className="md:hidden bg-zinc-700 bg-opacity-60 m-3 rounded-lg w-[40%] absolute z-10 h-[8.2rem]"
          >
            <div className="space-y-1 px-3 flex flex-col">
              <a
                href="/pages/users"
                className="custom-link-menu relative text-white font-semibold p-2 my-4"
              >
                Usuarios
              </a>
              <a
                href="/pages/books"
                className="custom-link-menu relative text-white font-semibold p-2 my-4"
              >
                Libros
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

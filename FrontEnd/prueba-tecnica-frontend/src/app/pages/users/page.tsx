"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import RegisterModal from '../../../components/register_modal';
import { useToken } from '../../../components/TokenContext';


interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const UsersPage = () => {
  const { token, email } = useToken();

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
    obtenerUsuarios();
  }
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();

      const usuariosMapeados = data.map((usuario: any, index: number) => ({
        id: usuario.id,
        nombre: usuario.name,
        email: usuario.email,
      }));
      setUsuarios(usuariosMapeados);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const eliminarUsuario = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.id !== id)
        );
      } else {
      }
    } catch (error) {
    }
  };

  return (
    <div className="md:p-8 px-3">
      <div className="w-full bg-zinc-700 bg-opacity-70 rounded-md">
        <div
          className="flex flex-row justify-between items-center w-full text-black"
        >
          <h2 className="text-center p-3 font-bold text-xl text-white">Lista de Usuarios</h2>
          <button className="btn-sm btn-ghost hover:bg-transparent border-2 hover:border-white font-semibold text-white m-2 rounded-md"
            onClick={openRegisterModal}>
            Agregar ➕
          </button>
          <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
        </div>

        <table className="table bg-zinc-700 bg-opacity-70  rounded-none">
          <thead>
            <tr className="text-left md:text-[0.9rem] text-xs font-bold text-white">
              <th className="p-2">
                <div className="flex items-center">
                  ID
                  <Image
                    src="/sort.png"
                    alt="Icon"
                    width={20} // Ajusta el tamaño según lo necesites
                    height={32}
                  />
                </div>
              </th>
              <th className="p-2">
                <div className="flex items-center">
                  Nombre
                  <Image
                    src="/sort.png"
                    alt="Icon"
                    width={20} // Ajusta el tamaño según lo necesites
                    height={32}
                  />
                </div>
              </th>
              <th className="p-2">
                <div className="flex items-center">
                  Email
                  <Image
                    src="/sort.png"
                    alt="Icon"
                    width={20} // Ajusta el tamaño según lo necesites
                    height={32}
                  />
                </div>
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="">
            {usuarios.map((usuario) => (
              <tr
                key={usuario.id}
                className="hover:bg-zinc-500 bg-zinc-700 bg-opacity-70 text-white max-md:text-xs"
              >
                <td className="p-2">{usuario.id}</td>
                <td className="p-2">{usuario.nombre}</td>
                <td className="p-2">{usuario.email}</td>
                <td className="p-0 text-center">
                  <button className="w-[33%] p-2">
                    <Image
                      src="/edit.png"
                      alt="Icon"
                      width={25} // Ajusta el tamaño según lo necesites
                      height={32}
                    />
                  </button>
                  <button className="w-[33%] p-2" onClick={() => eliminarUsuario(usuario.id)}>
                    <Image
                      src="/delete.png"
                      alt="Icon"
                      width={25} // Ajusta el tamaño según lo necesites
                      height={32}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersPage
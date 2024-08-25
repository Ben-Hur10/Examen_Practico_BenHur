"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BookRegisterModal from '../../../components/book_register_modal';
import { useToken } from '../../../components/TokenContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    release_date: string;
    user: string
}

const BooksPage = () => {

    const { token, email } = useToken();
    const [errorMessage, setErrorMessage] = useState('');

    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const openRegisterModal = () => setRegisterModalOpen(true);
    const closeRegisterModal = () => {
        setRegisterModalOpen(false);
        obtenerLibros();
    }

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        obtenerLibros();
    }, []);

    const obtenerLibros = async () => {
        try {
            setErrorMessage('');
            const response = await fetch("http://localhost:3000/books");
            const data = await response.json();

            const librosMapeados = data.map((book: any) => ({
                id: book.id,
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                release_date: book.release_date,
                user: book.user.name,
            }));

            setBooks(librosMapeados);
        } catch (error) {
            console.error("Error al obtener los libros:", error);
        }
    };

    const eliminarLibro = async (id: number) => {
        try {
            setErrorMessage('');
            if (!token) {
                setErrorMessage('Usuario no autenticado.');
                return;
            }
            const response = await fetch(`http://localhost:3000/books/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setBooks((prevBooks) =>
                    prevBooks.filter((book) => book.id !== id)
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
                    <h2 className="text-center p-3 font-bold text-xl text-white">Lista de libros</h2>
                    <button className="btn-sm btn-ghost hover:bg-transparent border-2 hover:border-white font-semibold text-white m-2 rounded-md"
                        onClick={openRegisterModal}>
                        Agregar ➕
                    </button>
                    <BookRegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
                </div>

                <table className="bg-zinc-700 bg-opacity-70  rounded-none w-full">
                    <thead>
                        <tr className="text-left md:text-[0.9rem] text-xs font-bold text-white">
                            <th className="p-2">
                                <div className="flex items-center">
                                    Titulo
                                </div>
                            </th>
                            <th className="p-2">
                                <div className="flex items-center">
                                    Autor
                                </div>
                            </th>
                            <th className="p-2">
                                <div className="flex items-center">
                                    ISBN
                                </div>
                            </th>
                            <th className="p-2">
                                <div className="flex items-center">
                                    Lanzamiento
                                </div>
                            </th>
                            <th className="p-2">
                                <div className="flex items-center">
                                    Agregado
                                </div>
                            </th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {books.map((book) => (
                            <tr
                                key={book.id}
                                className="hover:bg-zinc-500 bg-zinc-700 bg-opacity-70 text-white max-md:text-xs"
                            >
                                <td className="">{book.title}</td>
                                <td className="">{book.author}</td>
                                <td className="">{book.isbn}</td>
                                <td className="">
                                    {new Date(book.release_date)
                                        .toLocaleDateString("es-ES", {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                            timeZone: "UTC",
                                        })
                                        .replace(
                                            /(\d{2})\s([a-záéíóúñ]+)/,
                                            (match, dia, mes) =>
                                                `${dia} ${mes.charAt(0).toUpperCase()}${mes.slice(1)}`
                                        )}
                                </td>
                                <td className="p-2">{book.user}</td>
                                <td className="p-0 text-center">
                                    <button className="w-[40%]" onClick={() => eliminarLibro(book.id)}>
                                        <Image
                                            src="/delete.png"
                                            alt="Icon"
                                            width={20} // Ajusta el tamaño según lo necesites
                                            height={32}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {errorMessage && (
                    <motion.div
                        className="bg-red-500 text-white text-center border border-red-300 p-3 rounded mt-2 z-20 relative m-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Error: {errorMessage}
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default BooksPage
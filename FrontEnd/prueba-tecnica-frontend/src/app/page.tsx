"use client";
import { useToken  } from '../components/TokenContext';
import Image from "next/image";

export default function Home() {
  const { token } = useToken();
  return (
    <div
      className="flex items-center h-[85%]
    animate-fade-down animate-once animate-duration-[2s] animate-ease-linear"
    >
      <div className="hero justify-center ">
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <div className="flex justify-center">
              <h3 className="mb-5 mr-4 text-5xl font-bold animate-pulse animate-infinite animate-duration-[2500ms] animate-ease-linear">Hello</h3>
              <h3 className="mb-5 text-5xl font-bold text-red-600">There</h3>
            </div>
            <p className="mb-5">
                Organiza y guarda tus libros favoritos en un lugar especial, donde cada historia siempre estará al alcance de tus manos 
                y lista para ser redescubierta.
            </p>
            <div>
            {/* {token ? <p>Token: {token}</p> : <p>No hay token</p>} */}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

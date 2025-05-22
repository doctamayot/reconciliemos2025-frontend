// src/components/homepage/ProcessSection.jsx
import React from "react";
import {
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const ProcessSection = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className={`py-20 bg-white transition-all duration-700 ease-out transform
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-16">
          Nuestro Proceso Simplificado
        </h2>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Paso 1 */}
          <div className="relative flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow">
            <div className="absolute -top-8 bg-yellow-400 text-gray-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
              1
            </div>
            <CheckCircleIcon className="h-12 w-12 text-yellow-400 mt-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Solicitud</h3>
            <p className="text-gray-600">
              Presentas tu caso ante nuestro centro, de forma presencial o
              virtual.
            </p>
          </div>
          {/* Paso 2 */}
          <div className="relative flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow">
            <div className="absolute -top-8 bg-pink-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
              2
            </div>
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-pink-500 mt-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Audiencia</h3>
            <p className="text-gray-600">
              Citamos a las partes a una audiencia facilitada por un conciliador
              experto.
            </p>
          </div>
          {/* Paso 3 */}
          <div className="relative flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow">
            <div className="absolute -top-8 bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
              3
            </div>
            <DocumentCheckIcon className="h-12 w-12 text-blue-600 mt-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Acuerdo o Constancia</h3>
            <p className="text-gray-600">
              Se formaliza el acuerdo logrado o se expide constancia si no hay
              acuerdo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

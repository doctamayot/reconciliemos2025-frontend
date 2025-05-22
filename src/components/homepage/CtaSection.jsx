// src/components/homepage/CtaSection.jsx

import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

// --- IMPORTACIÓN DE LA IMAGEN ---
// Asegúrate de que 'cta.png' exista en la ruta 'src/assets/cta.png'
// Si el archivo tiene otro nombre o está en otra subcarpeta de assets, ajusta la ruta.
import CtaImageFromFile from "../../assets/cta.jpg";
// --- FIN IMPORTACIÓN ---

const CtaSection = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    // Fondo con un color claro de la paleta, por ejemplo, un azul muy pálido
    <section
      ref={sectionRef}
      className={`py-20 bg-blue-50 transition-all duration-700 ease-out transform
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Columna para la Imagen (Izquierda en desktop, Arriba en móvil) */}
          <div className="w-full md:w-1/2">
            {/* --- USO DE LA IMAGEN IMPORTADA --- */}
            <img
              src={CtaImageFromFile}
              alt="Visual para la llamada a la acción de Reconciliemos Colombia" // Actualiza el alt text según la imagen
              className="rounded-lg shadow-xl w-full h-auto max-h-[450px] object-cover mx-auto" // max-h para limitar altura, object-cover para rellenar sin distorsionar
            />
            {/* --- FIN USO DE LA IMAGEN --- */}
          </div>

          {/* Columna para Texto y Botón (Derecha en desktop, Abajo en móvil) */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <RocketLaunchIcon className="h-16 w-16 mx-auto md:mx-0 mb-4 text-yellow-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
              Da el Primer Paso Hacia la Solución Definitiva
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              No permitas que los desacuerdos se prolonguen. En Reconciliemos
              Colombia te ofrecemos un camino claro y efectivo. Contáctanos hoy
              mismo y descubre cómo la conciliación puede beneficiarte.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=573133547614&text=Hola,%20quiero%20una%20asesor%C3%ADa!!!"
              className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-10 rounded-md text-lg md:text-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Contactar Ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

// src/components/homepage/BenefitsSection.jsx

import {
  ShieldCheckIcon,
  ClockIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import useIntersectionObserver from "../../hooks/useIntersectionObserver"; // Importa el hook

const BenefitsSection = () => {
  // Usa el hook. El threshold: 0.1 significa que la animación se dispara cuando el 10% del elemento es visible.
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef} // Asigna la ref al elemento raíz de la sección
      // Clases base para la transición y estado inicial (oculto y desplazado)
      className={`py-16 bg-white transition-all duration-700 ease-out transform
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
      // Si isVisible es true: opacidad total y posición original
      // Si isVisible es false: opacidad cero y ligeramente desplazado hacia abajo
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {/* El contenido interno no necesita cambiar para la animación de la sección */}
          <div className="flex flex-col items-center">
            <ShieldCheckIcon className="h-12 w-12 mb-3 text-pink-500" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Confidencial y Neutral
            </h3>
            <p className="text-gray-600">
              Proceso reservado con un tercero imparcial que facilita el
              diálogo.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <ClockIcon className="h-12 w-12 mb-3 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Rápido y Eficiente
            </h3>
            <p className="text-gray-600">
              Evita la congestión y los tiempos extendidos del sistema judicial
              tradicional.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <DocumentCheckIcon className="h-12 w-12 mb-3 text-red-600" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Validez Legal Plena
            </h3>
            <p className="text-gray-600">
              El acuerdo tiene la misma fuerza legal que una sentencia judicial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

// src/components/homepage/TestimonialsSection.jsx
import { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid"; // Usamos solid para los controles

import useIntersectionObserver from "../../hooks/useIntersectionObserver";

// --- DATOS DE TESTIMONIOS (PLACEHOLDER) ---
// Deberás reemplazar estos con testimonios reales y las rutas a las imágenes de tus clientes
const testimonialsData = [
  {
    id: 6, // Nuevo ID
    quote:
      "Gracias a Reconciliemos Colombia y el proceso de insolvencia, pude renegociar mis obligaciones y hoy mi emprendimiento tiene un nuevo aire. ¡Un alivio total y un equipo muy profesional!",
    name: "Ricardo G.",
    role: "Dueño de Pequeño Negocio",
    image: "/src/assets/testimonials/ricardo.webp", // Placeholder para imagen
  },
  {
    id: 7, // Nuevo ID
    quote:
      "Después de perder mi empleo, las deudas se acumularon rápidamente. El proceso de insolvencia me dio la tranquilidad que necesitaba para reorganizar mis finanzas. El acompañamiento de Reconciliemos Colombia muy claro en cada etapa.",
    name: "Sofía C.",
    role: "Profesional Independiente",
    image: "/src/assets/testimonials/sofia.webp", // Placeholder para imagen
  },
  {
    id: 1,
    quote:
      "El proceso de conciliación fue sorprendentemente rápido y mucho menos estresante de lo que esperaba. Logramos un acuerdo justo para ambas partes gracias a la excelente mediación. ¡Totalmente recomendado!",
    name: "Ana María P.",
    role: "Usuaria de Conciliación Familiar",
    image: "/src/assets/testimonials/anamaria.webp", // Ejemplo de ruta cuando tengas la imagen
  },
  {
    id: 2,
    quote:
      "Como empresario, el tiempo es oro. Reconciliemos Colombia me ayudó a resolver una disputa comercial de forma eficiente, ahorrándome costos y el desgaste de un litigio. Su profesionalismo es destacable.",
    name: "Carlos L.",
    role: "Gerente General, Soluciones Tech SAS",
    image: "/src/assets/testimonials/carlos.webp",
  },
  {
    id: 3,
    quote:
      "Tenía muchas dudas sobre la conciliación para un tema de arrendamiento, pero el conciliador fue muy claro y nos guio para encontrar una solución que nos benefició a ambos. ¡Muchas gracias!",
    name: "Lucía V.",
    role: "Arrendataria",
    image: "/src/assets/testimonials/lucia.webp",
  },
  {
    id: 4,
    quote:
      "Necesitábamos formalizar un acuerdo de apoyo y el proceso fue muy humano y respetuoso. Nos sentimos escuchados y bien asesorados en cada paso.",
    name: "Familia Rodriguez G.",
    role: "Acuerdo de Apoyo",
    image: "/src/assets/testimonials/familia.webp",
  },
  {
    id: 5,
    quote:
      "Después de un accidente de tránsito menor, la conciliación fue la vía más sensata. Evitamos un proceso largo y llegamos a un acuerdo sobre los daños rápidamente. La atención fue excelente.",
    name: "Javier M.",
    role: "Usuario por Accidente de Tránsito",
    image: "/src/assets/testimonials/javier.webp",
  },
];
// --- FIN DATOS DE TESTIMONIOS ---

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  // Opcional: Auto-play para el carrusel
  useEffect(() => {
    const timer = setTimeout(() => {
      nextTestimonial();
    }, 7000); // Cambia cada 7 segundos
    return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
  }, [currentIndex]); // Se ejecuta cuando currentIndex cambia

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-pink-50 transition-all duration-700 ease-out transform
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
    >
      {" "}
      {/* Fondo rosa muy claro del logo */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-4 text-pink-500" />{" "}
          {/* Icono y color del logo */}
          <h2 className="text-3xl md:text-4xl font-bold text-red-600">
            {" "}
            {/* Color rojo del logo */}
            Lo Que Dicen Nuestros Usuarios
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Historias reales de soluciones y acuerdos alcanzados.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto overflow-hidden">
          {/* Contenedor de Slides - Usaremos un efecto de fundido (fade) */}
          <div className="relative h-80 sm:h-72 md:h-64 flex items-center justify-center">
            {" "}
            {/* Altura fija para el contenido del slide */}
            {testimonialsData.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute w-full transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                {index === currentIndex && ( // Solo renderiza el contenido del slide activo para mejor rendimiento
                  <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                    {/* Placeholder para la imagen del cliente */}
                    <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <UserCircleIcon className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                    <p className="text-gray-700 italic text-md md:text-lg mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <p className="font-semibold text-blue-600">
                      {testimonial.name}
                    </p>{" "}
                    {/* Color azul del logo */}
                    {testimonial.role && (
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Controles de Navegación */}
          {testimonialsData.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute top-1/2 left-0 sm:-left-4 md:-left-8 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-blue-600 p-2 rounded-full shadow-md transition"
                aria-label="Anterior testimonio"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute top-1/2 right-0 sm:-right-4 md:-right-8 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-blue-600 p-2 rounded-full shadow-md transition"
                aria-label="Siguiente testimonio"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Indicadores de Puntos (opcional) */}
        {testimonialsData.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-pink-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;

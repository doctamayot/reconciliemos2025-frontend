import { useEffect, useState, useRef } from "react";

/**
 * Custom Hook para detectar cuándo un elemento entra en el viewport.
 * @param {Object} options - Opciones para el IntersectionObserver (threshold, rootMargin, etc.).
 * @returns {[React.RefObject, boolean]} - Un array con la ref para el elemento y un booleano indicando si está intersectando.
 */
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null); // La ref que asignaremos al elemento a observar

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Actualiza el estado solo si está intersectando y no lo estaba antes
      // O si quieres que la animación se repita cada vez que entra al viewport,
      // podrías simplemente hacer setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        // Opcional: Deja de observar el elemento una vez que ha sido visible
        // para que la animación solo ocurra una vez.
        observer.unobserve(entry.target);
      }
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Función de limpieza para dejar de observar cuando el componente se desmonte
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]); // El efecto se re-ejecutará si las opciones cambian

  return [elementRef, isIntersecting];
};

export default useIntersectionObserver;

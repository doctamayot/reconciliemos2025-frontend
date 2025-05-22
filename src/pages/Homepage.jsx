/// src/pages/HomePage.jsx
import React, { Suspense, lazy } from "react";

// Importa el componente Hero de forma normal, ya que es visible al cargar
import HeroSection from "../components/homepage/HeroSection";
// Importa el componente de carga
import LoadingSpinner from "../components/common/LoadingSpinner"; // Asegúrate que la ruta es correcta

// --- Importa las demás secciones de forma diferida (lazy) ---
const BenefitsSection = lazy(() =>
  import("../components/homepage/BenefitsSection")
);
const ServicesSection = lazy(() =>
  import("../components/homepage/ServicesSection")
);
const ProcessSection = lazy(() =>
  import("../components/homepage/ProcessSection")
);
const TestimonialsSection = lazy(() =>
  import("../components/homepage/TestimonialsSection")
);
const CtaSection = lazy(() => import("../components/homepage/CtaSection"));
// --- Fin de importaciones lazy ---

const HomePage = () => {
  return (
    <div className="w-full">
      <HeroSection /> {/* Carga normal, no diferida */}
      {/* Envuelve cada componente lazy en Suspense */}
      {/* Puedes tener un Suspense individual por componente o uno que envuelva varios */}
      <Suspense fallback={<LoadingSpinner message="Cargando beneficios..." />}>
        <BenefitsSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner message="Cargando servicios..." />}>
        <ServicesSection />
      </Suspense>
      <Suspense
        fallback={<LoadingSpinner message="Cargando nuestro proceso..." />}
      >
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner message="Cargando testimonios..." />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner message="Cargando contacto..." />}>
        <CtaSection />
      </Suspense>
    </div>
  );
};

export default HomePage;

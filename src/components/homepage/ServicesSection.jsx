// src/components/homepage/ServicesSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  UserGroupIcon,
  BuildingOffice2Icon,
  ScaleIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import useIntersectionObserver from "../../hooks/useIntersectionObserver"; // Importa el hook

const services = [
  // ... (datos de servicios sin cambios)
  {
    title: "Conciliación Familiar",
    description:
      "Cuotas alimentarias, custodia, visitas, unión marital de hecho, liquidación de sociedad conyugal/patrimonial.",
    icon: UserGroupIcon,
    color: "pink-500",
  },
  {
    title: "Conciliación Civil",
    description:
      "Incumplimiento de contratos (préstamos, servicios, etc.), restitución de inmuebles, pago de deudas y facturas.",
    icon: BuildingOffice2Icon,
    color: "blue-600",
  },
  {
    title: "Conciliación Comercial",
    description:
      "Conflictos entre socios, competencia desleal, problemas contractuales entre empresas.",
    icon: BriefcaseIcon,
    color: "red-600",
  },
  {
    title: "Responsabilidad Civil",
    description:
      "Acuerdos por daños en accidentes de tránsito (sin lesiones graves), responsabilidad extracontractual.",
    icon: ExclamationTriangleIcon,
    color: "yellow-400",
  },
  {
    title: "Acuerdos de Apoyo (Ley 1996)",
    description:
      "Formalización de acuerdos para facilitar la toma de decisiones de personas con discapacidad.",
    icon: ScaleIcon,
    color: "blue-600",
  },
  {
    title: "Insolvencia Persona Natural",
    description:
      "Negociación de deudas para no comerciantes y pequeños comerciantes (Ley 1564 / 2445).",
    icon: CurrencyDollarIcon,
    color: "pink-500",
  },
];

const ServicesSection = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className={`py-20 bg-slate-50 transition-all duration-700 ease-out transform
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
          Áreas de Conciliación
        </h2>
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          Te ayudamos a encontrar soluciones en una amplia gama de materias
          conciliables.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const borderColorClass = `border-${service.color}`;
            const textColorClass = `text-${service.color}`;
            return (
              // Podrías incluso animar cada card individualmente si quisieras,
              // aplicando el hook a cada card y añadiendo un pequeño delay
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl border-l-4 ${borderColorClass} transition-all duration-300 flex flex-col text-left`}
              >
                <Icon className={`h-10 w-10 mb-4 ${textColorClass}`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

// src/components/homepage/HeroSection.jsx

import HeroBackgroundImage from "../../assets/home.png"; // Asegúrate que 'home.png' esté en 'src/assets/'

const HeroSection = () => {
  const handleScrollToServices = (event) => {
    event.preventDefault();
    const servicesSection = document.getElementById("servicios");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
      {/* Capa de Imagen de Fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src={HeroBackgroundImage}
          alt="Fondo representando alivio financiero y nuevas oportunidades" // Alt text más acorde
          className="w-full h-full object-cover"
        />
        {/* Overlay oscuro para contraste */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Contenido Superpuesto */}
      <div className="relative z-10 p-6 flex flex-col items-center">
        {/* --- TEXTO H1 MODIFICADO --- */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight uppercase tracking-wide text-white text-shadow">
          Ponle Fin a tus Deudas: <br className="hidden md:block" /> Asesoría
          Experta en Insolvencia
        </h1>
        {/* --- FIN TEXTO H1 MODIFICADO --- */}

        {/* --- TEXTO PÁRRAFO MODIFICADO --- */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 max-w-3xl font-light">
          En Reconciliemos Colombia, te guiamos a través del proceso de
          insolvencia para persona natural y pequeño comerciante. Negocia tus
          deudas o liquida tu patrimonio de forma ordenada y recupera tu
          tranquilidad bajo la Ley 2445 de 2025.
        </p>
        {/* --- FIN TEXTO PÁRRAFO MODIFICADO --- */}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="https://api.whatsapp.com/send?phone=573133547614&text=Hola,%20quiero%20asesor%C3%ADa%20sobre%20insolvencia!!!" // Texto del mensaje de WhatsApp actualizado
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-md text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Agenda una Asesoria
          </a>
          <button
            onClick={handleScrollToServices}
            className="w-full sm:w-auto bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-semibold py-3 px-8 rounded-md text-lg transition duration-300"
          >
            Otros Servicios
          </button>
        </div>
      </div>
    </section>
  );
};

// Helper CSS (opcional, para sombra de texto - añadir a index.css o App.css si no lo has hecho)
/*
.text-shadow {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}
*/

export default HeroSection;

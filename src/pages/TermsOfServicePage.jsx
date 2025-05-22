// src/pages/TermsOfServicePage.jsx
import React from "react";
import { Link } from "react-router-dom"; // Si necesitas enlaces internos

const TermsOfServicePage = () => {
  const siteName = "Reconciliemos Colombia";
  const lastUpdatedDate = "12 de mayo de 2025"; // Fecha de última actualización
  const contactEmail = "info@reconciliemoscolombia.co"; // Email de contacto (ejemplo)

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Términos y Condiciones de Uso de {siteName}
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Última actualización: {lastUpdatedDate}
        </p>

        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            1. Aceptación de los Términos
          </h2>
          <p>
            Bienvenido a {siteName} (en adelante, "el Sitio Web" o "la
            Plataforma"). Estos Términos y Condiciones de Uso (en adelante,
            "Términos") rigen su acceso y uso del Sitio Web y los servicios de
            información y facilitación de contacto para la conciliación
            ofrecidos por {siteName} (en adelante, "los Servicios").
          </p>
          <p>
            Al acceder o utilizar nuestro Sitio Web y Servicios, usted acepta
            haber leído, entendido y estar legalmente obligado por estos
            Términos y nuestra{" "}
            <Link
              to="/politica-de-privacidad"
              className="text-blue-600 hover:underline"
            >
              Política de Privacidad
            </Link>
            , que se incorpora aquí como referencia. Si no está de acuerdo con
            alguno de estos Términos, no debe utilizar el Sitio Web ni los
            Servicios.
          </p>
          <p>
            Nos reservamos el derecho de modificar estos Términos en cualquier
            momento. Le notificaremos los cambios publicando los términos
            actualizados en el Sitio Web e indicando la fecha de la última
            revisión. Su uso continuado del Sitio Web después de dichos cambios
            constituye su aceptación de los nuevos Términos.
          </p>
        </div>

        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            2. Descripción de los Servicios
          </h2>
          <p>
            {siteName} es un centro de conciliación que ofrece servicios para la
            resolución alternativa de conflictos de conformidad con la
            legislación colombiana, incluyendo la Ley 2220 de 2022 (Estatuto de
            Conciliación) y la Ley 2445 de 2025 (que modifica el régimen de
            insolvencia de persona natural). Nuestro Sitio Web proporciona
            información sobre nuestros servicios, el proceso de conciliación, y
            facilita el contacto para iniciar trámites de conciliación.
          </p>
          <p>
            Los servicios específicos de conciliación se rigen por los acuerdos
            y la documentación pertinente a cada caso, de conformidad con la
            ley. El Sitio Web actúa como un canal informativo y de primer
            contacto.
          </p>
          <p>
            [Detallar más sobre los servicios específicos que se pueden iniciar
            o consultar a través de la plataforma web, por ejemplo, envío de
            solicitudes, agendamiento (si aplica), consulta de información
            general, etc.]
          </p>
        </div>

        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            3. Elegibilidad y Registro de Usuario
          </h2>
          <p>
            Para utilizar ciertos Servicios, como la solicitud de una
            conciliación, es posible que deba proporcionar información personal
            y cumplir con los requisitos legales para ser parte en un proceso de
            conciliación en Colombia. Usted declara y garantiza que toda la
            información que proporciona es precisa, actual y completa.
          </p>
          <p>
            [Si hay un sistema de cuentas de usuario en la plataforma, detallar
            aquí los requisitos de edad, el proceso de creación de cuenta,
            responsabilidades sobre la cuenta y contraseña, etc.]
          </p>
          <p>
            El uso de los servicios de conciliación está sujeto a las
            disposiciones legales colombianas sobre capacidad y representación.
          </p>
        </div>

        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            4. Responsabilidades del Usuario
          </h2>
          <p>
            Usted se compromete a utilizar el Sitio Web y los Servicios de
            manera responsable y de conformidad con la ley y estos Términos. Se
            compromete a:
          </p>
          <ul className="list-disc pl-5">
            <li>
              Proporcionar información veraz, exacta y completa al solicitar
              servicios o al interactuar con la Plataforma.
            </li>
            <li>
              No utilizar el Sitio Web para fines ilegales, fraudulentos o no
              autorizados.
            </li>
            <li>No suplantar la identidad de ninguna persona o entidad.</li>
            <li>
              No interferir ni interrumpir el funcionamiento del Sitio Web o los
              servidores y redes conectados.
            </li>
            <li>
              Respetar la confidencialidad inherente a los procesos de
              conciliación.
            </li>
            <li>
              [Añadir otras responsabilidades específicas del usuario de la
              plataforma].
            </li>
          </ul>
        </div>

        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            5. Rol de {siteName}
          </h2>
          <p>
            {siteName} actúa como un centro de conciliación autorizado,
            facilitando el encuentro entre las partes en conflicto y un
            conciliador neutral e imparcial. El conciliador guiará a las partes
            para que exploren soluciones y lleguen a acuerdos mutuamente
            satisfactorios.
          </p>
          <p>
            Es importante entender que {siteName} y sus conciliadores no actúan
            como abogados ni representantes legales de ninguna de las partes, ni
            imponen decisiones. El resultado de la conciliación depende de la
            voluntad de las partes.
          </p>
          <p>
            Los acuerdos de conciliación alcanzados tienen efectos de cosa
            juzgada y prestan mérito ejecutivo, de acuerdo con la ley
            colombiana.
          </p>
        </div>

        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            6. Tarifas y Pagos (Si Aplica)
          </h2>
          <p>
            [Si {siteName} cobra tarifas por sus servicios (especialmente los
            tramitados a través de la plataforma), detallar aquí la estructura
            de tarifas, los métodos de pago aceptados, las políticas de
            reembolso (si las hay), y la información sobre la gratuidad de
            ciertos servicios según la ley (ej. consultorios jurídicos,
            entidades públicas, casos de insolvencia en centros públicos a
            partir de 2026 según Ley 2445 de 2025)].
          </p>
          <p>
            Si no hay cobros directos a través de la plataforma para el inicio,
            especificarlo.
          </p>
        </div>

        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            7. Propiedad Intelectual
          </h2>
          <p>
            Todo el contenido disponible en el Sitio Web, incluyendo pero no
            limitado a textos, gráficos, logos (como el logo de {siteName}),
            íconos, imágenes, clips de audio, compilaciones de datos y software,
            es propiedad de {siteName} o de sus licenciantes y está protegido
            por las leyes colombianas e internacionales de propiedad
            intelectual.
          </p>
          <p>
            Usted no puede reproducir, distribuir, modificar, crear trabajos
            derivados, mostrar públicamente, ejecutar públicamente, republicar,
            descargar, almacenar o transmitir ningún material de nuestro Sitio
            Web sin el consentimiento previo por escrito de {siteName}, salvo
            las excepciones permitidas por la ley.
          </p>
        </div>

        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            8. Exclusión de Garantías y Limitación de Responsabilidad
          </h2>
          <p>
            El Sitio Web y los Servicios se proporcionan "tal cual" y "según
            disponibilidad", sin garantías de ningún tipo, ya sean expresas o
            implícitas. {siteName} no garantiza que el Sitio Web o los Servicios
            sean ininterrumpidos, seguros o libres de errores.
          </p>
          <p>
            En la máxima medida permitida por la ley aplicable, {siteName} no
            será responsable por ningún daño indirecto, incidental, especial,
            consecuente o punitivo, incluyendo, entre otros, la pérdida de
            beneficios, datos, uso, buena voluntad u otras pérdidas intangibles,
            resultantes de (i) su acceso o uso o incapacidad para acceder o usar
            el Sitio Web o los Servicios; (ii) cualquier conducta o contenido de
            terceros en el Sitio Web; (iii) cualquier contenido obtenido del
            Sitio Web; y (iv) el acceso, uso o alteración no autorizados de sus
            transmisiones o contenido.
          </p>
          <p>
            La responsabilidad de {siteName} con respecto a los servicios de
            conciliación se rige por la legislación colombiana aplicable a los
            centros de conciliación.
          </p>
        </div>

        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            9. Terminación
          </h2>
          <p>
            Nos reservamos el derecho de suspender o terminar su acceso al Sitio
            Web y a los Servicios, a nuestra entera discreción, sin previo aviso
            y por cualquier motivo, incluyendo el incumplimiento de estos
            Términos.
          </p>
          <p>
            [Detallar condiciones de terminación de cuentas de usuario, si
            aplica].
          </p>
        </div>

        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            10. Ley Aplicable y Jurisdicción
          </h2>
          <p>
            Estos Términos se regirán e interpretarán de acuerdo con las leyes
            de la República de Colombia, sin tener en cuenta sus disposiciones
            sobre conflicto de leyes.
          </p>
          <p>
            Cualquier disputa, controversia o reclamo que surja de o esté
            relacionado con estos Términos, o el incumplimiento, terminación,
            ejecución, interpretación o validez de los mismos, o el uso del
            Sitio Web o los Servicios, se resolverá [Especificar el mecanismo de
            resolución de disputas: ej., inicialmente mediante negociación
            directa, y si no es posible, ante los jueces competentes de la
            ciudad de Bogotá D.C., Colombia, o el mecanismo que defina su asesor
            legal].
          </p>
        </div>

        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            11. Disposiciones Generales
          </h2>
          <p>
            Si alguna disposición de estos Términos es considerada inválida o
            inaplicable por un tribunal de jurisdicción competente, las
            disposiciones restantes de estos Términos permanecerán en pleno
            vigor y efecto. La renuncia a cualquier término de estos Términos no
            se considerará una renuncia posterior o continua de dicho término o
            de cualquier otro término.
          </p>
        </div>

        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            12. Contáctenos
          </h2>
          <p>
            Si tiene alguna pregunta sobre estos Términos y Condiciones, por
            favor contáctenos en:
          </p>
          <p>
            {siteName} <br />
            Cra 16 # 80-11 of 701 <br />
            Bogotá, Colombia] <br />
            Correo electrónico: {contactEmail} <br />
            3133547614
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;

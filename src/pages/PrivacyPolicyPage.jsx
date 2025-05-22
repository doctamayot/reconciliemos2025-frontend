// src/pages/PrivacyPolicyPage.jsx
import React from "react";
import { Link } from "react-router-dom"; // Si necesitas enlaces internos

// Puedes colocar este componente dentro de tu PublicLayout si quieres el mismo header/footer
// Si no, crea un layout simple para páginas de contenido como esta.

const PrivacyPolicyPage = () => {
  const siteName = "Reconciliemos Colombia"; // Nombre de tu sitio/organización
  const contactEmail = "secretaria@reconciliemoscolombia.com"; // Email de contacto para privacidad (ejemplo)
  const lastUpdatedDate = "12 de mayo de 2025"; // Fecha de última actualización

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Política de Privacidad de {siteName}
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Última actualización: {lastUpdatedDate}
        </p>

        {/* Introducción */}
        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            1. Introducción
          </h2>
          <p>
            Bienvenido a {siteName}. Nos comprometemos a proteger la privacidad
            de nuestros usuarios y clientes. Esta Política de Privacidad explica
            cómo recopilamos, usamos, divulgamos y salvaguardamos su información
            cuando visita nuestro sitio web reconciliemoscolombia.com, utiliza
            nuestros servicios de conciliación, o se comunica con nosotros.
          </p>
          <p>
            Lea atentamente esta política de privacidad. Si no está de acuerdo
            con los términos de esta política de privacidad, por favor no acceda
            al sitio ni utilice nuestros servicios. Nos regimos por la Ley
            Estatutaria 1581 de 2012 de Protección de Datos Personales y demás
            normatividad concordante en Colombia.
          </p>
        </div>

        {/* Información que Recopilamos */}
        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            2. Información que Recopilamos
          </h2>
          <p>
            Podemos recopilar información sobre usted de varias maneras. La
            información que podemos recopilar en el Sitio o a través de nuestros
            servicios incluye:
          </p>
          <ul className="list-disc pl-5">
            <li>
              <strong>Datos Personales Identificables:</strong> Como su nombre
              completo, número de identificación (cédula de ciudadanía, etc.),
              dirección postal, dirección de correo electrónico, número de
              teléfono, y otros datos de contacto que usted nos proporciona
              voluntariamente al registrarse, solicitar un servicio de
              conciliación, o al contactarnos.
            </li>
            <li>
              <strong>Información del Caso de Conciliación:</strong> Detalles y
              documentos relacionados con el conflicto que desea conciliar,
              incluyendo información sobre las partes involucradas, los hechos,
              las pretensiones y cualquier otra información relevante para el
              proceso de conciliación. Esta información puede incluir datos
              sensibles y se tratará con la máxima confidencialidad.
            </li>
            <li>
              <strong>Datos de Uso del Sitio Web:</strong> Información que su
              navegador envía automáticamente cada vez que visita nuestro Sitio,
              como su dirección IP, tipo de navegador, proveedor de servicios de
              Internet, páginas de referencia/salida, sistema operativo, sello
              de fecha/hora y datos de flujo de clics.
            </li>
            <li>
              <strong>Cookies y Tecnologías de Seguimiento:</strong> Podemos
              usar cookies y tecnologías de seguimiento similares para recopilar
              información sobre su interacción con nuestro Sitio. Puede
              controlar el uso de cookies a nivel de navegador individual.
            </li>
          </ul>
        </div>

        {/* Cómo Usamos Su Información */}
        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            3. Cómo Usamos Su Información
          </h2>
          <p>
            Tener información precisa sobre usted nos permite ofrecerle una
            experiencia fluida, eficiente y personalizada. Específicamente,
            podemos usar la información recopilada sobre usted para:
          </p>
          <ul className="list-disc pl-5">
            <li>
              Facilitar y gestionar los servicios de conciliación solicitados.
            </li>
            <li>Crear y gestionar su cuenta (si aplica).</li>
            <li>
              Comunicarnos con usted sobre su caso, nuestros servicios y
              responder a sus consultas.
            </li>
            <li>
              Cumplir con nuestras obligaciones legales y regulatorias,
              incluyendo las establecidas en la Ley 2220 de 2022 (Estatuto de
              Conciliación).
            </li>
            <li>
              Mejorar la eficiencia y operatividad de nuestro Sitio y servicios.
            </li>
            <li>
              Prevenir actividades fraudulentas y garantizar la seguridad de
              nuestro Sitio y usuarios.
            </li>
          </ul>
        </div>

        {/* Base Legal para el Tratamiento (Importante para GDPR y buenas prácticas) */}
        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            4. Base Legal para el Tratamiento de sus Datos
          </h2>
          <p>
            Trataremos sus datos personales basándonos en una o más de las
            siguientes bases legales, según la Ley 1581 de 2012:
          </p>
          <ul className="list-disc pl-5">
            <li>
              <strong>Consentimiento:</strong> Cuando nos haya dado su
              consentimiento explícito para tratar sus datos personales para uno
              o más fines específicos.
            </li>
            <li>
              <strong>Ejecución de un Contrato:</strong> Cuando el tratamiento
              es necesario para la ejecución de un contrato en el que usted es
              parte (por ejemplo, para prestarle el servicio de conciliación
              solicitado).
            </li>
            <li>
              <strong>Obligación Legal:</strong> Cuando el tratamiento es
              necesario para cumplir con una obligación legal a la que{" "}
              {siteName} está sujeto.
            </li>
            <li>
              <strong>Intereses Legítimos:</strong> [Este punto requiere
              cuidadosa consideración legal]
            </li>
          </ul>
        </div>

        {/* Divulgación de Su Información */}
        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            5. Divulgación de Su Información
          </h2>
          <p>
            No compartiremos, venderemos, alquilaremos ni intercambiaremos su
            información personal con terceros sin su consentimiento, excepto
            como se describe en esta Política de Privacidad o según lo requiera
            la ley. Podemos divulgar su información en las siguientes
            situaciones:
          </p>
          <ul className="list-disc pl-5">
            <li>
              <strong>Por Requerimiento Legal:</strong> Si la divulgación es
              necesaria para cumplir con un proceso legal, solicitud
              gubernamental, o leyes aplicables.
            </li>
            <li>
              <strong>Para la Prestación del Servicio:</strong> Con las partes
              involucradas en un proceso de conciliación, siempre con el
              objetivo de facilitar el acuerdo y dentro del marco de
              confidencialidad del proceso.
            </li>
            <li>
              <strong>Proveedores de Servicios:</strong> Podemos compartir su
              información con proveedores externos que realizan servicios para
              nosotros o en nuestro nombre (por ejemplo, alojamiento web,
              análisis de datos, [especificar otros]).
            </li>
            <li>
              <strong>Con su Consentimiento:</strong> Podemos divulgar su
              información personal para cualquier otro propósito con su
              consentimiento explícito.
            </li>
            <li>[Añadir otros escenarios de divulgación específicos]</li>
          </ul>
        </div>

        {/* Seguridad de Su Información */}
        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            6. Seguridad de Su Información
          </h2>
          <p>
            Utilizamos medidas de seguridad administrativas, técnicas y físicas
            para ayudar a proteger su información personal y la confidencialidad
            de los procesos de conciliación. Si bien hemos tomado medidas
            razonables para proteger la información personal que nos
            proporciona, tenga en cuenta que ningún sistema de seguridad es
            impenetrable.
          </p>
        </div>

        {/* Retención de Datos */}
        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            7. Retención de Datos
          </h2>
          <p>
            Conservaremos su información personal solo durante el tiempo que sea
            necesario para los fines establecidos en esta política de privacidad
            y para cumplir con nuestras obligaciones legales (por ejemplo, la
            conservación de actas de conciliación según la normativa vigente).
          </p>
          <p>Segun la ley de conciliación</p>
        </div>

        {/* Sus Derechos (Habeas Data) */}
        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            8. Sus Derechos
          </h2>
          <p>
            De conformidad con la Ley 1581 de 2012 y sus decretos
            reglamentarios, usted tiene derecho a:
          </p>
          <ul className="list-disc pl-5">
            <li>Conocer, actualizar y rectificar sus datos personales.</li>
            <li>
              Solicitar prueba de la autorización otorgada para el tratamiento
              de sus datos (salvo excepciones legales).
            </li>
            <li>
              Ser informado sobre el uso que se le ha dado a sus datos
              personales.
            </li>
            <li>
              Presentar quejas ante la Superintendencia de Industria y Comercio
              por infracciones a la ley de protección de datos.
            </li>
            <li>
              Revocar la autorización y/o solicitar la supresión de sus datos
              cuando no se respeten los principios, derechos y garantías
              constitucionales y legales.
            </li>
            <li>
              Acceder en forma gratuita a sus datos personales que hayan sido
              objeto de Tratamiento.
            </li>
          </ul>
          <p>
            Para ejercer estos derechos, puede contactarnos a través de{" "}
            {contactEmail}.
          </p>
        </div>

        {/* Política de Cookies (Si aplica) */}
        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            9. Política de Cookies
          </h2>
          <p>
            La presente Política de Cookies describe cómo Reconciliemos Colombia
            (en adelante, "nosotros", "nuestro" o "la Empresa") utiliza cookies
            y tecnologías similares en nuestro sitio web
            reconciliemoscolombia.com (en adelante, "el Sitio Web"). Al utilizar
            nuestro Sitio Web, usted acepta el uso de cookies de conformidad con
            esta política. Le recomendamos leerla detenidamente para entender
            qué tipo de cookies utilizamos, la información que recopilamos a
            través de ellas y cómo se utiliza dicha información. 1. ¿Qué son las
            cookies? Las cookies son pequeños archivos de texto que los sitios
            web que visita envían a su dispositivo (ordenador, tableta, teléfono
            móvil, etc.). Estos archivos se almacenan en su dispositivo y
            permiten a los sitios web recordar información sobre su visita, como
            sus preferencias de idioma, información de inicio de sesión y otros
            ajustes. Esto puede facilitar su próxima visita y hacer que el sitio
            sea más útil para usted. Las cookies también pueden utilizarse para
            recopilar información sobre sus hábitos de navegación. 2. ¿Qué tipos
            de cookies utilizamos y para qué fines? Nuestro Sitio Web utiliza
            diferentes tipos de cookies, tanto propias como de terceros, con
            diversas finalidades: Cookies Esenciales o Estrictamente Necesarias:
            Descripción: Estas cookies son fundamentales para el funcionamiento
            básico del Sitio Web y para permitirle navegar por él y utilizar sus
            funciones, como el acceso a áreas seguras o la utilización de
            nuestros servicios. Sin estas cookies, los servicios que ha
            solicitado no pueden prestarse. Ejemplos: Cookies de sesión para
            mantener su sesión activa, cookies para recordar elementos en un
            carrito de compra (si aplica), cookies de autenticación.
            Consentimiento: Generalmente, estas cookies no requieren su
            consentimiento explícito, ya que son indispensables para la
            prestación del servicio. Cookies de Rendimiento o Analíticas:
            Descripción: Estas cookies recopilan información sobre cómo los
            visitantes utilizan nuestro Sitio Web, por ejemplo, qué páginas
            visitan con más frecuencia, el tiempo que pasan en el sitio, si
            reciben mensajes de error, y cómo llegaron al sitio. La información
            recopilada es agregada y anónima, y se utiliza para mejorar el
            funcionamiento de nuestro Sitio Web y la experiencia del usuario.
            Ejemplos: Cookies de Google Analytics (u otras herramientas de
            análisis) que nos ayudan a entender la interacción de los usuarios
            con nuestro contenido. Consentimiento: Para el uso de estas cookies,
            solicitaremos su consentimiento previo e informado. Cookies de
            Funcionalidad o Preferencias: Descripción: Estas cookies permiten
            que el Sitio Web recuerde las elecciones que usted realiza (como su
            nombre de usuario, idioma o la región en la que se encuentra) y
            proporcionan características mejoradas y más personales. También
            pueden utilizarse para recordar los cambios que ha realizado en el
            tamaño del texto, las fuentes y otras partes de las páginas web que
            puede personalizar. Ejemplos: Cookies que recuerdan sus preferencias
            de idioma o configuración regional. Consentimiento: Para el uso de
            estas cookies, solicitaremos su consentimiento previo e informado.
            Cookies de Publicidad o Marketing: Descripción: Estas cookies se
            utilizan para rastrear a los visitantes a través de los sitios web.
            La intención es mostrar anuncios que sean relevantes y atractivos
            para el usuario individual y, por lo tanto, más valiosos para los
            editores y anunciantes externos. Pueden ser utilizadas por nosotros
            o por terceros (como redes publicitarias) para construir un perfil
            de sus intereses y mostrarle anuncios relevantes en otros sitios.
            Ejemplos: Cookies utilizadas para el retargeting o para mostrar
            publicidad basada en sus intereses. Consentimiento: Para el uso de
            estas cookies, solicitaremos su consentimiento previo, expreso e
            informado. Cookies de Redes Sociales: Descripción: Si nuestro Sitio
            Web integra funcionalidades de redes sociales (por ejemplo, botones
            de "Me gusta" o "Compartir"), estas redes pueden instalar sus
            propias cookies. Estas cookies pueden ser utilizadas por dichas
            redes sociales para rastrear su actividad de navegación y crear un
            perfil de sus intereses. Ejemplos: Cookies de Facebook, Twitter,
            LinkedIn, Instagram, etc. Consentimiento: El uso de estas cookies
            está sujeto a las políticas de privacidad de las respectivas redes
            sociales,
          </p>
        </div>

        {/* Cambios a esta Política de Privacidad */}
        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            10. Cambios a esta Política de Privacidad
          </h2>
          <p>
            Podemos actualizar esta Política de Privacidad de vez en cuando. Le
            notificaremos cualquier cambio publicando la nueva Política de
            Privacidad en esta página y actualizando la fecha de "Última
            actualización" en la parte superior. Le recomendamos que revise esta
            Política de Privacidad periódicamente para cualquier cambio.
          </p>
        </div>

        {/* Contacto */}
        <div className="mb-8 prose prose-lg text-gray-700">
          <h2 className="text-xl font-semibold text-gray-800">
            11. Contáctenos
          </h2>
          <p>
            Si tiene preguntas o comentarios sobre esta Política de Privacidad,
            por favor contáctenos en:
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

export default PrivacyPolicyPage;

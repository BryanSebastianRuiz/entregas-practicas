# Patrón API REST

## Introducción

El Patrón API REST (Representational State Transfer) es un estilo arquitectónico utilizado en el desarrollo de servicios web para la comunicación entre sistemas distribuidos. Fue propuesto por Roy Fielding en su tesis doctoral en el año 2000 y se ha convertido en el estándar más utilizado para la creación de APIs (Application Programming Interfaces).

REST define un conjunto de restricciones y prácticas que permiten construir sistemas escalables, flexibles y compatibles con diferentes tecnologías. Su popularidad radica en su simplicidad, eficiencia y su integración con el protocolo HTTP.

---

## Principios de REST

Para que una API sea considerada **RESTful**, debe seguir estos principios:

1. **Características de una API REST**

Para que una API pueda considerarse RESTful, debe cumplir con ciertos principios y restricciones:

2. **Cliente-Servidor**

Se establece una separación clara entre el cliente y el servidor. El cliente solicita recursos y el servidor los proporciona, lo que facilita la escalabilidad y la modularidad del sistema.

3. **Stateless (Sin estado)**

Cada solicitud HTTP enviada por el cliente debe contener toda la información necesaria para procesarla. El servidor no debe almacenar el estado de la sesión del cliente, lo que mejora la escalabilidad y permite que cada solicitud sea independiente.

4. **Cacheable**

Las respuestas del servidor pueden ser almacenadas en caché para reducir la latencia y mejorar el rendimiento. Es importante que el servidor especifique si la información es cacheable mediante cabeceras HTTP como Cache-Control.

5. **Interfaz uniforme:** Uso de métodos HTTP estándar como:

   - `GET`    /users        → Obtener lista de usuarios
   - `GET`    /users/{id}   → Obtener detalles de un usuario
   - `POST`   /users        → Crear un usuario
   - `PUT`    /users/{id}   → Actualizar un usuario
   - `DELETE` /users/{id}   → Eliminar un usuario

6. **Sistema en capas:** Se pueden usar múltiples capas (servidores proxy, balanceadores de carga) sin afectar la comunicación entre cliente y servidor.

---

## Ejemplo de una API REST  
Un ejemplo de cómo funciona una API REST en JSON:

### Petición `GET` para obtener usuarios:

```http
GET /books HTTP/1.1
Host: api.biblioteca.com
```

---

### Respuesta en JSON

[
  {
    "id": 1,
    "titulo": "El principito",
    "autor": "Antoine de Saint-Exupéry",
    "año_publicacion": 1943
  },
  {
    "id": 2,
    "titulo": "Cien años de soledad",
    "autor": "Gabriel García Márquez",
    "año_publicacion": 1967
  }
]

---

### Peticion `POST` para agregar un libro

POST /books HTTP/1.1
Host: api.biblioteca.com
Content-Type: application/json

{
  "titulo": "1984",
  "autor": "George Orwell",
  "año_publicacion": 1949
}

---

## Diferencias entre REST y SOAP

Antes de REST, muchas APIs utilizaban SOAP (Simple Object Access Protocol), un protocolo más rígido basado en XML.

**Característica REST:**

Formato de datos: JSON, XML, YAML, etc.
Velocidad: Rápido y ligero
Facilidad de uso: Simple y flexible
Consumo de ancho de banda: Bajo
Compatibilidad: Web, móvil, IoT

**Característica SOAP:**

Formato de datos: XML
Velocidad: Más lento
Facilidad de uso: Complejo
Consumo de ancho de banda:Alto
Compatibilidad: Principalmente web	
		
Gracias a estas ventajas, REST ha superado a SOAP en la mayoría de los escenarios de desarrollo de APIs.

---

## Ventajas de las APIs RESTful

**Escalabilidad:** Pueden manejar un gran número de solicitudes sin perder rendimiento.
**Flexibilidad:** Pueden ser utilizadas en web, móviles y dispositivos IoT.
**Estandarización:** Utilizan protocolos comunes como HTTP y formatos como JSON o XML.
**Facilidad de integración:** Se pueden conectar con otros sistemas y servicios sin complicaciones.
**Seguridad:** Pueden implementar autenticación y autorización con OAuth, JWT o API Keys.

---

## Desafíos y Limitaciones de REST

**Falta de estado:** Algunas aplicaciones requieren información de sesión, lo que puede ser un reto con REST.
**Problemas de seguridad:** Al exponer APIs en la web, se debe proteger contra ataques como inyección SQL, XSS o CSRF.
**Estructura rígida:** Aunque es flexible, algunas aplicaciones requieren más personalización, donde GraphQL o gRPC pueden ser mejores opciones.


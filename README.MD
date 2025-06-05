# QCC Backend

Microservicio en Node.js + Express para recibir formularios de contacto y enviar correos (usando Zoho SMTP).

## Descripción
Este backend expone:
- `GET /` → devuelve un mensaje de estado.
- `POST /api/contact` → recibe `{ nombre, correo, asunto, mensaje }` y envía:
  1. Un email al administrador (configurado en `EMAIL_TO`).
  2. Un email de confirmación al cliente (el valor `correo`).

## Instrucciones de instalación

1. Clonar el repositorio:

2. Instalar dependencias:
cd qcc-backend
npm install
3. Crear un archivo `.env` en la raíz con las variables:
PORT=5000

EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_USER=contacto@qcc.cl
EMAIL_PASS=<TU_APP_PASSWORD_ZOHO>
EMAIL_FROM="QCC SPA" contacto@qcc.cl
EMAIL_TO=contacto@qcc.cl

4. Iniciar el servidor:
npm start

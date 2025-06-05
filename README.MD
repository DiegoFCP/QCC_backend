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

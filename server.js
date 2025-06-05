
import 'dotenv/config';       // Equivale a require('dotenv').config()
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

// MIDDLEWARES

app.use(cors());
app.use(express.json());

// VARIABLES DE ENTORNO
const PORT = process.env.PORT || 5000;
const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_FROM,
    EMAIL_TO
} = process.env;

// NODEMAILER CONFIG

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

// VERIFICACION DE CONEXION

await transporter.verify();
console.log("SERVER LISTO");

// RUTA DE PRUEBA GET

app.get('/', (req, res) => {
    res.send('Servidor Zoho-contact Backend funcionando');
});

// RUTA DE PRUEBA POST

app.post('/api/contact', async (req, res) => {
    // EXTRAE INFO DEL BODY DE PETICION
    const { nombre, correo, asunto, mensaje } = req.body;

    // VALIDA CAMPOS PRESENTES
    if (!nombre || !correo || !asunto || !mensaje) {
        return res.status(400).json({ ok: false, error: 'faltan fatos obligatorios' });
    }

    // OPCIONES DE CORREO
    const mailOptions = {
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `Nuevo mensaje de: ${nombre}`, 
        html: `
        <h2>Formulario de Contacto QCC</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${correo}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong><br/>${mensaje.replace(/\n/g, '<br/>')}</p>
        `
    };

    try {
        // ENVIAR CON NODEMAILER
        await transporter.sendMail(mailOptions);
        // RESPONDER FRONT END
        return res.status(200).json({ ok: true, msg: 'correo enviado correctamente'});
    } catch (error) {
        console.error('Error al enviar correo: ', error);
        // RESPONDE ERROR A FRONT END
        return res.status(500).json({ ok: false, msg: 'Error interno al enviar correo'});
    }
});



// SERVER
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
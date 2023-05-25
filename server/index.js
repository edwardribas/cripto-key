const express = require('express');
const crypto = require('crypto');
const app = express();
const cors = require("cors");

app.use(cors());

const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);

const encryptValue = (value, key) => {
    const keyBuffer = crypto.pbkdf2Sync(key, iv, 10000, 32, 'sha256');
    const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
    const encrypted = cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
}

const decryptValue = (value, key) => {
    const keyBuffer = crypto.pbkdf2Sync(key, iv, 10000, 32, 'sha256');
    const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
    const decrypted = decipher.update(value, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
}

app.get('/encrypt', (req, res) => {
    try {
        const { text, key } = req.query;
        const cryptedValue = encryptValue(text, key);
        res.send({text, key, result: cryptedValue});
    }
    catch (err) {
        res.send(`An error has occurred: "${err.message}"`);
    }
})

app.get('/decrypt', (req, res) => {
    try {
        const { text, key } = req.query;
        const decryptedValue = decryptValue(text, key);
        res.send({text, key, result: decryptedValue});
    }
    catch (err) {
        res.send(`An error has occurred: "${err.message}"`);
    }
})

app.listen(3000, () => {
    console.log(`\nServidor rodando na porta 3000\n`);
})

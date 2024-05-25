const express = require('express');
const axios = require('axios');
const { remini } = require('betabotz-tools'); 
const fs = require('fs');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Server is running. Please use the /remini endpoint to process images.');
});

app.get('/remini', async (req, res) => {
    try {
        const image = req.query.input;

        if (!image) {
            return res.status(400).send('Bad Request: Missing input image');
        }

        const result = await remini(image); 
        res.send(result);
    } catch (error) {
        console.error('Error calling Remini API:', error.message);
        res.status(error.response?.status || 500).send({
            error: 'Internal Server Error',
            details: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

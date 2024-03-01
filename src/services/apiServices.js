// apiService.js

const axios = require('axios');

const colorIdentificationApiUrl = 'https://www.thecolorapi.com/id';
const colorSchemeGenerationApiUrl = 'https://www.thecolorapi.com/scheme';

const convertColorsApiUrl = 'https://convert-colors.p.rapidapi.com/harmonies/cielab';

// Function to interact with Color Identification API
// apiService.js

async function getColorInfo(hex, userLanguage = 'en') {
    try {
        const response = await axios.get(`${colorIdentificationApiUrl}?hex=${hex}&format=json&lang=${userLanguage}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching color information:', error.message);
        throw error;
    }
}

async function getColorScheme(hex, mode = 'analogic', count = 6, userLanguage = 'en') {
    try {
        const response = await axios.get(`${colorSchemeGenerationApiUrl}?hex=${hex}&mode=${mode}&count=${count}&format=json&lang=${userLanguage}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching color scheme:', error.message);
        throw error;
    }
}

// ... (other code)


// Function to interact with the Convert Colors API
async function getConvertedColors() {
    const options = {
        method: 'GET',
        url: `${convertColorsApiUrl}/91.13/116.84/-9.10`,
        headers: {
            'X-RapidAPI-Key': 'YOUR-RAPIDAPI-KEY', // Replace with your actual key
            'X-RapidAPI-Host': 'convert-colors.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error fetching converted colors:', error.message);
        throw error;
    }
}

module.exports = { getColorInfo, getColorScheme, getConvertedColors };

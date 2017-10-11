const cron = require('cron');
const axios = require('axios');

const TIME_ZONE = 'America/Sao_Paulo';
const CRON_TIME = '00 30 8 * * 1-5'; // Todos os dias (Segunda a Sexta-Feira) às 8h:30m, não roda Sabado e Domingo 
const URL = 'http://localhost:3000/data-import';

const cronImportData = new cron.CronJob({
    cronTime: CRON_TIME,
    onTick: () => {
        console.log('Job import data Started');
        axios.post(URL, {}).then(response => response.data);
    },
    start: false,
    timeZone: TIME_ZONE
});

module.exports = cronImportData;
require('dotenv').config(); // ler variaveis de ambiente

export const port = process.env.PORT || 3000;

export const reportsPath = process.env.REPORTS_PATH;

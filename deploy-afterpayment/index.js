import express from 'express';
import initApp from './src/app.router.js';
import dotenv from 'dotenv'
//pdfKit
import { createInvoice } from "./src/utils/pdf.js"
dotenv.config()

const app = express()

const port = process.env.PORT || 5000

console.log({DB: process.env.URL_DB});

// app.set("case sensitive routing", true)
initApp(app, express)






app.listen(port, () => console.log(`Example app listening on port ${port}!`))
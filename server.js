const express = require("express");
const mysql = require("mysql");
const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

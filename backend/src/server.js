const app = require('./app.js');
require('dotenv').config()

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`)); 
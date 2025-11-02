import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || "")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err))

// Rutas de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente ⚽")
})

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`))

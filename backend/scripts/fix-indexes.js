import mongoose from "mongoose";
import "dotenv/config";

async function fixIndexes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    const db = mongoose.connection.db;
    const collection = db.collection("users");

    // Lista índices actuales
    const indexes = await collection.indexes();
    console.log("\n📋 Índices actuales:");
    indexes.forEach((idx) => console.log(`  - ${idx.name}:`, idx.key));

    // Elimina el índice username_1 si existe
    try {
      await collection.dropIndex("username_1");
      console.log("\n✅ Índice 'username_1' eliminado exitosamente");
    } catch (err) {
      if (err.code === 27) {
        console.log("\n⚠️  Índice 'username_1' no existe (ya estaba limpio)");
      } else {
        throw err;
      }
    }

    // Lista índices después de la limpieza
    const afterIndexes = await collection.indexes();
    console.log("\n📋 Índices después de limpiar:");
    afterIndexes.forEach((idx) => console.log(`  - ${idx.name}:`, idx.key));

    console.log("\n✅ Listo! Ahora puedes registrar usuarios sin problemas.");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

fixIndexes();

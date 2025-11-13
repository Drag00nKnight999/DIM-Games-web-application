import express from "express";
import path from "path";
import { registerRoutes } from "./routes";

const app = express();
const PORT = process.env.PORT || 5000; // Default port 5000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function startServer() {
  await registerRoutes(app);

  // Serve static files from the "dist" directory
  app.use(express.static(path.join(process.cwd(), "dist")));

  // Serve index.html at root
  app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "dist", "index.html"));
  });

  // Use a catch-all route to serve index.html for any unknown routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "dist", "index.html"));
  });

  // Ensure the server listens on 0.0.0.0 for external access
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);

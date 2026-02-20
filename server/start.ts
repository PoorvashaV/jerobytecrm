// FIX: Remove .js extension
import { createServer } from "./index";

const app = createServer();
// Render uses the PORT environment variable
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});

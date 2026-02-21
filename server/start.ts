// FIX: Remove .js extension
import { createServer } from "./index";

const app = createServer();
// Render uses the PORT environment variable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

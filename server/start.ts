import { createServer } from "./index.js";

const app = createServer();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

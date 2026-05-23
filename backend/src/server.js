import createApp from "./app.js";
import { pool } from "./config/db.js";

const port = process.env.PORT || 5000;
const app = createApp(pool);

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

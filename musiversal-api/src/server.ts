import app from "./app";
import { checkAndGenerateMusicians } from "./utils/actions/musiciansGenerator";
import { data } from "./utils/data/data";

const port = process.env.PORT || 3000;

// listening app at port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  checkAndGenerateMusicians(data);
});
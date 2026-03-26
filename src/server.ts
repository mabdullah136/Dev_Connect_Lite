import { connectDatabase } from "./config/database";
import { env } from "./config/env";
import { app } from "./app";

const bootstrap = async (): Promise<void> => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server listening on port ${env.port}`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to bootstrap application", error);
  process.exit(1);
});

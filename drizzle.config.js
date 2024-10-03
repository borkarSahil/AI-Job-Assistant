/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:slf5YZDwWz1b@ep-lucky-glade-a575r003.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
};

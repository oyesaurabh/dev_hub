const config = {
  backendUrl:
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api/v1",
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
};

export default config;

import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { router } from "./routes";

const app = express();

app.use(express.json()).use(router).use(cors());

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});

app.get("/github", (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

export { serverHttp, io };
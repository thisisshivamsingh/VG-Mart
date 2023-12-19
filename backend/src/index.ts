import express, { Express, json } from "express";
import { vegetables } from "./router";
import "./db/connection";
import { createServer } from "node:http";
import { Server } from "socket.io";
const port: number = 8080;
const app: Express = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
var cors = require("cors"); // use const or let and use import and export if you are using the same for all

app.use(cors());
app.options("*", cors());
// use  "app.use(cors({ origin: "*" }));" to reduce the above two lines

app.use(json());

app.use("/v1", vegetables);
io.on("connection", (socket) => {
  console.log("a user connected");
  app.set("socket", socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(
  port,
  () => console.log("listening on port:http://localhost:" + port) // use templete literals
);

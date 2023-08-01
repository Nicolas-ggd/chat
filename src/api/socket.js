import io from "socket.io-client"

const SERVER_ENDPOINT = "https://chat-app-node-8ndm.onrender.com/";

export const socket = io(SERVER_ENDPOINT).on("connection");
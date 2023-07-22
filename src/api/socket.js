import io from "socket.io-client"

const SERVER_ENDPOINT = "http://localhost:8000";

export const socket = io(SERVER_ENDPOINT).on("connection");
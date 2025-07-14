import { Server } from "socket.io";


/**
 * 
 * @param server 
 * @returns
 */
export const createSocketServer = async (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET" , "POST"],
        },
    })
    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });

        // Add more event listeners as needed
    });
    return io;
}
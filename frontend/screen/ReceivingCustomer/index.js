"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const infoUser = {
  name: "Ivan Almendra",
  email: "almendra@gmail.com",
  alias: "vanc",
  my_channel: "almendra_channel_t752",
};

export default function ReceivingCustomerScreen() {
  const [responseReceiving, setResponseReceiving] = useState(null);

  useEffect(() => {
    socket.emit("join_room", infoUser.my_channel);

    socket.on("receive_notification", (data) => {
      console.log("Data received in Receiving:", data);
      if (data.alias === infoUser.alias) {
        setResponseReceiving(data);
      }
    });

    return () => {
      socket.off("receive_notification");
    };
  }, []);

  console.log("responseReceiving ----->", responseReceiving);

  return (
    <div className="container mx-auto">
      <h2>Receiving</h2>
      <div className="my-8 text-white font-bold">
        {responseReceiving && (
          <div>
            <h3>Nombre de item: {responseReceiving.nameTienda}</h3>
            <h3>Monto: {responseReceiving.monto}</h3>
            <h3>Alias: {responseReceiving.alias}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

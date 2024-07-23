"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useForm from "components/hooks/useForm";

const socket = io("http://localhost:3001");

export default function SendingCustomerScreen() {
  const [form, handleChange, resetForm] = useForm({
    nameTienda: "",
    monto: "",
    alias: "",
  });

  const [roomId, setRoomId] = useState("");
  const [responseReceiving, setResponseReceiving] = useState(null);

  const handleJoin = (e) => {
    e.preventDefault();
    if (roomId !== "") {
      socket.emit("join_room", roomId);
    } else {
      alert("Please fill in Room Id");
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    if (roomId !== "") {
      await socket.emit("send_msg", { ...form, roomId });
      resetForm();
    } else {
      alert("Please join a room first");
    }
  };

  useEffect(() => {
    socket.on("receive_msg", (data) => {
      console.log("receive_msg -->", data);
      setResponseReceiving(data);
    });

    // Cleanup on unmount
    return () => {
      socket.off("receive_msg");
    };
  }, []);

  return (
    <div className="container mx-auto">
      <div className="my-8 text-white font-bold">
        {responseReceiving && (
          <div>
            <h3>Nombre de item: {responseReceiving.nameTienda}</h3>
            <h3>Monto: {responseReceiving.monto}</h3>
            <h3>Alias: {responseReceiving.alias}</h3>
            <h3>Room ID: {responseReceiving.roomId}</h3>
          </div>
        )}
      </div>
      <div className="flex flex-col my-12">
        <div>
          <h3>ROOM</h3>
          <input
            className="text-black rounded-md mt-4"
            type="text"
            placeholder="room id"
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
        <div className="my-4">
          <button
            onClick={handleJoin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Unirse al canal
          </button>
        </div>
      </div>
      <div>
        <form onSubmit={sendData} className="flex flex-col">
          <div className="flex flex-col my-8">
            <label htmlFor="name">Nombre de item</label>
            <input
              type="text"
              name="nameTienda"
              onChange={handleChange}
              className="text-black rounded-md"
            />
          </div>
          <div className="flex flex-col my-8">
            <label htmlFor="monto">Monto</label>
            <input
              type="text"
              name="monto"
              onChange={handleChange}
              className="text-black rounded-md"
            />
          </div>
          <div className="mb-24 w-full text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

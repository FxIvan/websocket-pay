"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useForm from "components/hooks/useForm";

const socket = io("http://localhost:3001");

const tiendasOnline = [
  {
    id: 1,
    name: "Tienda Nike",
    channelSocketIO: [
      {
        user: "nguyen",
        alias: "nike_channel_t952",
        channel: "nike_channel_client_t952",
      },
      {
        user: "vanc",
        alias: "nike_channel_t952",
        channel: "nike_channel_client_t952",
      },
    ],
  },
  {
    id: 2,
    name: "Tienda Adidas",
    channelSocketIO: [
      {
        user: "almendra",
        alias: "almendra_alias",
        channel: "almendra_channel_t752",
      },
      {
        user: "nguyen",
        alias: "adidas_channel_t852",
        channel: "adidas_channel_client_t852",
      },
    ],
  },
  {
    id: 3,
    name: "Tienda Puma",
    channelSocketIO: [
      {
        user: "vanc",
        alias: "puma_channel_t752",
        channel: "puma_channel_client_t752",
      },
      {
        user: "nguyen",
        alias: "puma_channel_t752",
        channel: "puma_channel_client_t752",
      },
    ],
  },
];

export default function SendingCustomerScreen() {
  const [form, handleChange, resetForm] = useForm({
    nameTienda: "",
    monto: "",
    alias: "", // Este es el alias del cliente
  });

  const [selectUser, setSelectUser] = useState(null);
  const [responseReceiving, setResponseReceiving] = useState(null);

  const sendData = async (e) => {
    e.preventDefault();
    console.log("Data sending:", form);
    console.log("Select user:", selectUser);
    await socket.emit("join_room", selectUser);

    const dataForm = {
      ...form,
      alias: selectUser,
    };

    await socket.emit("send_notification", { dataForm });
    resetForm();
  };

  useEffect(() => {
    socket.on("receive_notification", (data) => {
      console.log("Data received in Sending:", data);
      setResponseReceiving(data);
    });

    return () => {
      socket.off("receive_notification");
    };
  }, []);

  console.log("responseReceiving ----->", responseReceiving);
  return (
    <div className="container mx-auto">
      <h2>Sending</h2>
      <div className="my-8 text-white font-bold"></div>
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
          <div className="flex flex-col my-8">
            <label htmlFor="alias">Alias</label>
            <select
              onChange={(e) => setSelectUser(e.target.value)}
              className="text-black rounded-md"
            >
              <option value="">Seleccionar usuario</option>
              {tiendasOnline.map((tienda) =>
                tienda.channelSocketIO.map((channelSocket) => (
                  <option
                    key={channelSocket.channel}
                    value={channelSocket.channel}
                    className="text-black rounded-md"
                  >
                    {channelSocket.user}
                  </option>
                ))
              )}
            </select>
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

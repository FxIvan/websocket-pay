"use client";
import { useEffect } from "react";

export const DashboardScreen = ({}) => {
  const listUser = [
    {
      id: 1,
      name: "Nguyen Van A",
      email: "nguyen@gmail.com",
      alias: "nguyen",
      room: "room1",
    },
    {
      id: 2,
      name: "Nguyen Van B",
      email: "vanb@gmail.com",
      alias: "vanb",
      room: "room2",
    },
    {
      id: 3,
      name: "Nguyen Van C",
      email: "vanc@gmail.com",
      alias: "vanc",
      room: "room3",
    },
  ];

  const infoUser = {
    name: "Ivan Almendra",
    email: "almendra@gmail.com",
    alias: "almendra",
    room: "room4",
  };
  const [form, handleChange, resetForm] = useForm({
    alias: "",
    monto: "",
  });

  const [responseReceiving, setResponseReceiving] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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
    <div>
      <div></div>
    </div>
  );
};

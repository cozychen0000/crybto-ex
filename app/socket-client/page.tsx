"use client";

import { useEffect, useState } from "react";
import { socket } from "../../socket";

export default function Home() {
  const [text, setText] = useState(""); //打字的值
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [curRoom, setCurRoom] = useState("");
  const [roomInputVal, setRoomInputVal] = useState("");

  useEffect(() => {
    if (socket.connected) {
      onConnect();

      socket.on("update-input", (msg) => {
        console.log(msg)
        setText(msg);
      });
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  function handleChange(val: string) {
    setText(val);
    console.log(curRoom,val)
    socket.emit("input-change", curRoom, val);
  }

  function handleJoinRoom() {
    setCurRoom(roomInputVal);
    socket.emit("joinRoom", roomInputVal);
  }

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <p>Room ID: {curRoom}</p>
      <div className="flex gap-2 py-2">
        <input
          className="text-black p-1"
          value={roomInputVal}
          type="text"
          onChange={(e) => setRoomInputVal(e.target.value)}
        />
        <button className="p-1 bg-red-500" onClick={handleJoinRoom}>
          change room
        </button>
      </div>
      <input
        className="text-black p-1"
        value={text}
        type="text"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

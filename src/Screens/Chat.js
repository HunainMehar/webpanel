import React, { useContext, useEffect } from "react";
// RCE CSS
import "react-chat-elements/dist/main.css";
import axios from "axios";
import moment from "moment";
import useState from "react-usestateref";
import { SocketContext } from "../services/webSockets";
import genericService from "../services/genericServices";
// MessageBox component
import { ChatList } from "react-chat-elements";
function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Chat() {
  const [rooms, setRooms] = React.useState([]);
  const [messages, setMessages, messagesRef] = useState([]);
  const [selectedRoom, setSelectedRoom] = React.useState({});
  const [message, setMessage] = React.useState("");
  const scroll = React.useRef(null);
  const socket = useContext(SocketContext);

  const getRooms = async () => {
    await axios
      .get("http://backend-fashionhub.herokuapp.com/designer/getrooms", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setRooms(response.data.rooms);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    getRooms();
  }, []);

  const getMessages = async () => {
    await axios
      .get(
        "http://backend-fashionhub.herokuapp.com/designer/getmessages/" +
          selectedRoom.id,
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        //sort array by date createdAt
        let sortedMessages = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        console.log(sortedMessages);

        setMessages(sortedMessages.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // useInterval(async () => {
  //   await getMessages();
  // }, 10000);
  React.useEffect(() => {
    if (selectedRoom) {
      getMessages();
    }
  }, [selectedRoom]);

  React.useEffect(() => {
    console.log(selectedRoom.id);
    socket.on("receivemsg", (data) => {
      console.log(data);
      if (data.roomID === selectedRoom?.id) {
        setMessages([...messagesRef.current, data.msg]);
      }
    });
  }, [socket, selectedRoom]);

  const sendMessage = async () => {
    const id = genericService.getUserInfo();
    const msg = {
      receiverID: selectedRoom.loggedUser,
      roomID: selectedRoom.id,
      senderID: id._id,
      msg: {
        _id: Math.round(Math.random() * 1000000),
        text: message,
        createdAt: new Date(),
        user: {
          _id: selectedRoom.loggedUser,
          name: selectedRoom.name,
          avatar: selectedRoom.avatar,
        },
      },
    };
    socket.emit("sendmsg", msg);
    setMessages([...messagesRef.current, msg.msg]);
    setMessage("");
    await axios
      .post(
        "http://backend-fashionhub.herokuapp.com/designer/sendmessage",
        {
          roomId: selectedRoom.id,
          message: message,
        },
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <div className="container mx-auto">
        <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
          <div className="border-r border-gray-300 lg:col-span-1">
            <div className="mx-3 my-3">
              <div className="relative text-gray-600">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-gray-300"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="search"
                  className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                  name="search"
                  placeholder="Search"
                  required
                />
              </div>
            </div>
            <ul className="overflow-auto h-[38rem]">
              <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
              <li>{rooms.map((room) => roomCard(room, setSelectedRoom))}</li>
            </ul>
          </div>
          <div className="hidden lg:col-span-2 lg:block">
            {selectedRoom && (
              <div className="w-full">
                <div className="relative flex items-center p-3 border-b border-gray-300">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={
                      selectedRoom.avatar
                        ? selectedRoom.avatar
                        : "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                    }
                    alt="username"
                  />
                  <span className="block ml-2 font-bold text-gray-600">
                    {selectedRoom.name}
                  </span>
                </div>
                <div className="relative w-full p-6 overflow-y-auto h-[34rem]">
                  <ul className="space-y-2">
                    {messages.map((message) => (
                      <li
                        className={
                          selectedRoom.loggedUser !== message.user._id
                            ? "flex justify-start"
                            : "flex justify-end"
                        }
                        ref={scroll}
                      >
                        <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                          <span className="block">{message.text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                  <input
                    type="text"
                    placeholder="Message"
                    className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                    name="message"
                    required
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={async (e) => {
                      if (e.key === "Enter") {
                        await sendMessage();
                      }
                    }}
                    value={message}
                  />

                  <button type="submit" onClick={sendMessage}>
                    <svg
                      className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
function roomCard(room, setSelectedRoom) {
  return (
    <a
      key={room.roomId}
      className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
      onClick={() => {
        setSelectedRoom({
          id: room.roomId,
          name: room.recieverName,
          loggedUser: room.loggedUser,
          avatar: room.recieverImage,
        });
      }}
    >
      <img
        className="object-cover w-10 h-10 rounded-full"
        src={
          room.recieverImage
            ? room.recieverImage
            : "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
        }
        alt="username"
      />
      <div className="w-full pb-2">
        <div className="flex justify-between">
          <span className="block ml-2 font-semibold text-gray-600">
            {room.recieverName}
          </span>
          <span className="block ml-2 text-sm text-gray-600">
            {moment(room.lastUpdated).fromNow()}
          </span>
        </div>
      </div>
    </a>
  );
}

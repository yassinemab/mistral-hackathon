import { useEffect, useState } from "react";
import "./App.css";
import { fetchPosts, selectPosts } from "./reducers/postsReducer";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./utils/api/axiosInstance";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts() as any);
  });

  const posts = useSelector(selectPosts);

  const [postForm, setPostForm] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });
  const [socket, setSocket] = useState<W3CWebSocket | null>(null);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const insertPost = () => {
    axiosInstance.post("/api/v1/post/", postForm);
    setIsGenerating(true);
  };

  // Handle actions from sockets: receive chat messages, receives diagrams, receive questions
  useEffect(() => {
    if (socket) {
      socket.onclose = () => {
        console.log("CLOSING SOCKET");
        setSocketClosed(true);
      };

      socket.onopen = () => {
        console.log("OPENING SOCKET");
      };

      socket.onmessage = (data: any) => {
        const dataFromServer = JSON.parse(data.data);

        // Flow for when the system receives a message
        if (dataFromServer.type === "chat_message") {
          const message = dataFromServer.message;

          if (isGenerating) {
            setIsGenerating(false);
            console.log("RECEIVED POST", message);
            // setPost((prevResponse) => prevResponse + message);
          }
        }
      };
    }
  }, []);

  const [socketClosed, setSocketClosed] = useState<boolean>(false);

  useEffect(() => {
    const newSocket = new W3CWebSocket("ws://localhost:8000/ws/");
    setSocket(newSocket);
    setSocketClosed(false);
  }, [socketClosed]);

  return (
    <div className="bg-neutral-200 text-[#222222] flex items-center justify-center h-screen w-full">
      <div className="max-w-[980px] w-[95vw]">
        <h1 className="text-3xl">Your posts</h1>
        {posts.map((post) => {
          return (
            <div
              key={post.id}
              className="p-8 shadow-md bg-white rounded-xl mt-8 w-full "
            >
              <h2 className="text-2xl">{post.title}</h2>
              <h2 className="text-lg">{post.description}</h2>
            </div>
          );
        })}
        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            insertPost();
          }}
        >
          <input
            placeholder="Title"
            onChange={(e) => {
              setPostForm({ ...postForm, title: e.target.value });
            }}
          />
          <textarea
            placeholder="Post description"
            onChange={(e) => {
              setPostForm({ ...postForm, description: e.target.value });
            }}
          ></textarea>
          <button type="submit">Submit post</button>
        </form>
      </div>
    </div>
  );
}

export default App;

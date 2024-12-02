// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
// import { useAuth } from "../context/AuthContext";
// import red from "@mui/material/colors/red";
// import ChatItem from "../components/chat/ChatItem";
// import { IoMdSend } from "react-icons/io";
// import { IoEllipsisHorizontalCircle } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import {
//   deleteUserChats,
//   getUserChats,
//   sendChatRequest,
// } from "../helpers/api-communicator";
// import toast from "react-hot-toast";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// const Chat = () => {
//   const navigate = useNavigate();
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const auth = useAuth();
//   const [chatMessages, setChatMessages] = useState<Message[]>([]);
//   // const handleSubmit = async () => {
//   //   const content = inputRef.current?.value as string;
//   //   if (inputRef && inputRef.current) {
//   //     inputRef.current.value = "";
//   //   }
//   //   const newMessage: Message = { role: "user", content };
//   //   setChatMessages((prev) => [...prev, newMessage]);
//   //   const chatData = await sendChatRequest(content);
//   //   setChatMessages([...chatData.chats]);
//   // };
//   const handleSubmit = async () => {
//     const content = inputRef.current?.value as string;
//     if (inputRef && inputRef.current) {
//       inputRef.current.value = "";
//     }

//     const newMessage: Message = { role: "user", content };
//     setChatMessages((prev) => [...prev, newMessage]);

//     try {
//       const chatData = await sendChatRequest(content);
//       setChatMessages([...chatData.chats]);
//     } catch (error) {
//       // Если произошла ошибка, то выводим ее через toast
//       toast.error(
//         "Ваш вопрос должен быть только по математике. Попробуйте задать вопрос по математике."
//       );
//     }
//   };

//   const handleDeleteChats = async () => {
//     try {
//       toast.loading("Deleting Chats", { id: "deletechats" });
//       await deleteUserChats();
//       setChatMessages([]);
//       toast.success("Deleted Chats Successfully", { id: "deletechats" });
//     } catch (error) {
//       console.log(error);
//       toast.error("Deleting chats failed", { id: "deletechats" });
//     }
//   };

//   useLayoutEffect(() => {
//     if (auth?.isLoggedIn && auth.user) {
//       toast.loading("Loading Chats", { id: "loadchats" });
//       getUserChats()
//         .then((data) => {
//           setChatMessages([...data.chats]);
//           toast.success("Successfully loaded chats", { id: "loadchats" });
//         })
//         .catch((err) => {
//           console.log(err);
//           toast.error("Loading Failed", { id: "loadchats" });
//         });
//     }
//   }, [auth]);

//   useEffect(() => {
//     if (!auth?.user) {
//       return navigate("/login");
//     }
//   }, [auth]);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flex: 1,
//         width: "100%",
//         height: "100%",
//         mt: 3,
//         gap: 3,
//       }}
//     >
//       <Box
//         sx={{
//           display: { md: "flex", xs: "none", sm: "none" },
//           flex: 0.2,
//           flexDirection: "column",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             width: "100%",
//             height: "60vh",
//             bgcolor: "rgb(17,29,39)",
//             borderRadius: 5,
//             flexDirection: "column",
//             mx: 3,
//           }}
//         >
//           <Avatar
//             sx={{
//               mx: "auto",
//               my: 2,
//               bgcolor: "white",
//               color: "black",
//               fontWeight: 700,
//             }}
//           >
//             {auth?.user?.name[0]}
//             {auth?.user?.name.split(" ")[1][0]}
//           </Avatar>
//           <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
//             You are talking to a ChatBot
//           </Typography>
//           <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
//             You can ask some questions related to Knowledge, Business, Advices,
//             Education, etc. But avoid sharing personal information
//           </Typography>
//           <Button
//             onClick={handleDeleteChats}
//             sx={{
//               width: "200px",
//               my: "auto",
//               color: "white",
//               fontWeight: "700",
//               borderRadius: 3,
//               mx: "auto",
//               bgcolor: red[300],
//               ":hover": {
//                 bgcolor: red.A400,
//               },
//             }}
//           >
//             Clear Conversation
//           </Button>
//         </Box>
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flex: { md: 0.8, xs: 1, sm: 1 },
//           flexDirection: "column",
//           px: 3,
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: "40px",
//             color: "white",
//             mb: 2,
//             mx: "auto",
//             fontWeight: "600",
//           }}
//         >
//           Model - GPT 4o Mini
//         </Typography>
//         <Box
//           sx={{
//             width: "100%",
//             height: "60vh",
//             borderRadius: 3,
//             mx: "auto",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "scroll",
//             overflowX: "hidden",
//             overflowY: "auto",
//             scrollBehavior: "smooth",
//           }}
//         >
//           {chatMessages.map((chat, index) => (
//             //@ts-ignore
//             <ChatItem content={chat.content} role={chat.role} key={index} />
//           ))}
//         </Box>
//         <div
//           style={{
//             width: "100%",
//             borderRadius: 8,
//             backgroundColor: "rgb(17, 27, 39)",
//             display: "flex",
//             margin: "auto",
//           }}
//         >
//           {" "}
//           <input
//             ref={inputRef}
//             type="text"
//             style={{
//               width: "100%",
//               backgroundColor: "transparent",
//               padding: "30px",
//               border: "none",
//               outline: "none",
//               color: "white",
//               fontSize: "20px",
//             }}
//           />
//           <IconButton>
//             <IoEllipsisHorizontalCircle />
//           </IconButton>
//           <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
//             <IoMdSend />
//           </IconButton>
//         </div>
//       </Box>
//     </Box>
//   );
// };

// export default Chat;

// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import {
//   Box,
//   Avatar,
//   Typography,
//   Button,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { useAuth } from "../context/AuthContext";
// import red from "@mui/material/colors/red";
// import ChatItem from "../components/chat/ChatItem";
// import { IoMdSend } from "react-icons/io";
// import { HiOutlineMicrophone } from "react-icons/hi2";
// import { GoPaperclip } from "react-icons/go";
// import { useNavigate } from "react-router-dom";
// import {
//   deleteUserChats,
//   getUserChats,
//   sendChatRequest,
// } from "../helpers/api-communicator";
// import toast from "react-hot-toast";
// import AudioRecorder from "./VoiceCommand";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// const Chat = () => {
//   const navigate = useNavigate();
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const auth = useAuth();
//   const [chatMessages, setChatMessages] = useState<Message[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна

//   // Функция для обработки завершения транскрипции
//   const handleTranscriptionComplete = (transcribedText: string) => {
//     if (!transcribedText) {
//       toast.error("Ошибка при расшифровке аудио.");
//       return;
//     }
//     const newMessage: Message = { role: "user", content: transcribedText };
//     if (inputRef) {
//       // @ts-ignore
//       inputRef.current.value = newMessage.content;
//     }
//   };

//   const handleModalOpen = () => setIsModalOpen(true);
//   const handleModalClose = () => setIsModalOpen(false);

//   const handleSubmit = async () => {
//     const content = inputRef.current?.value as string;
//     if (inputRef && inputRef.current) {
//       inputRef.current.value = "";
//     }

//     const newMessage: Message = { role: "user", content };
//     setChatMessages((prev) => [...prev, newMessage]);

//     try {
//       const chatData = await sendChatRequest(content);
//       setChatMessages([...chatData.chats]);
//     } catch (error) {
//       toast.error(
//         "Ваш вопрос должен быть только по математике. Попробуйте задать вопрос по математике."
//       );
//     }
//   };

//   const handleDeleteChats = async () => {
//     try {
//       toast.loading("Deleting Chats", { id: "deletechats" });
//       await deleteUserChats();
//       setChatMessages([]);
//       toast.success("Deleted Chats Successfully", { id: "deletechats" });
//     } catch (error) {
//       console.log(error);
//       toast.error("Deleting chats failed", { id: "deletechats" });
//     }
//   };

//   useLayoutEffect(() => {
//     if (auth?.isLoggedIn && auth.user) {
//       toast.loading("Loading Chats", { id: "loadchats" });
//       getUserChats()
//         .then((data) => {
//           setChatMessages([...data.chats]);
//           toast.success("Successfully loaded chats", { id: "loadchats" });
//         })
//         .catch((err) => {
//           console.log(err);
//           toast.error("Loading Failed", { id: "loadchats" });
//         });
//     }
//   }, [auth]);

//   useEffect(() => {
//     if (!auth?.user) {
//       return navigate("/login");
//     }
//   }, [auth]);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flex: 1,
//         width: "100%",
//         height: "100%",
//         mt: 3,
//         gap: 3,
//       }}
//     >
//       <Box
//         sx={{
//           display: { md: "flex", xs: "none", sm: "none" },
//           flex: 0.2,
//           flexDirection: "column",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             width: "100%",
//             height: "60vh",
//             bgcolor: "rgb(17,29,39)",
//             borderRadius: 5,
//             flexDirection: "column",
//             mx: 3,
//           }}
//         >
//           <Avatar
//             sx={{
//               mx: "auto",
//               my: 2,
//               bgcolor: "white",
//               color: "black",
//               fontWeight: 700,
//             }}
//           >
//             {auth?.user?.name[0]}
//             {auth?.user?.name.split(" ")[1][0]}
//           </Avatar>
//           <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
//             You are talking to a ChatBot
//           </Typography>
//           <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
//             You can ask some questions related to Knowledge, Business, Advices,
//             Education, etc. But avoid sharing personal information
//           </Typography>
//           <Button
//             onClick={handleDeleteChats}
//             sx={{
//               width: "200px",
//               my: "auto",
//               color: "white",
//               fontWeight: "700",
//               borderRadius: 3,
//               mx: "auto",
//               bgcolor: red[300],
//               ":hover": {
//                 bgcolor: red.A400,
//               },
//             }}
//           >
//             Clear Conversation
//           </Button>
//         </Box>
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flex: { md: 0.8, xs: 1, sm: 1 },
//           flexDirection: "column",
//           px: 3,
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: "40px",
//             color: "white",
//             mb: 2,
//             mx: "auto",
//             fontWeight: "600",
//           }}
//         >
//           Model - GPT 4o Mini
//         </Typography>
//         <Box
//           sx={{
//             width: "100%",
//             height: "60vh",
//             borderRadius: 3,
//             mx: "auto",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "scroll",
//             overflowX: "hidden",
//             overflowY: "auto",
//             scrollBehavior: "smooth",
//           }}
//         >
//           {chatMessages.map((chat, index) => (
//             //@ts-ignore
//             <ChatItem content={chat.content} role={chat.role} key={index} />
//           ))}
//         </Box>
//         <div
//           style={{
//             width: "100%",
//             borderRadius: 8,
//             backgroundColor: "rgb(17, 27, 39)",
//             display: "flex",
//             margin: "auto",
//           }}
//         >
//           {" "}
//           <input
//             ref={inputRef}
//             type="text"
//             style={{
//               width: "100%",
//               backgroundColor: "transparent",
//               padding: "30px",
//               border: "none",
//               outline: "none",
//               color: "white",
//               fontSize: "20px",
//             }}
//           />
//           <IconButton
//             onClick={() => setIsModalOpen(true)}
//             sx={{ color: "white", mx: 1 }}
//           >
//             <GoPaperclip />
//           </IconButton>
//           <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
//             <IoMdSend />
//           </IconButton>
//           <IconButton
//             onClick={() => setIsModalOpen(true)}
//             sx={{ color: "white", mx: 1 }}
//           >
//             <HiOutlineMicrophone />
//           </IconButton>
//           <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
//             <IoMdSend />
//           </IconButton>
//         </div>
//       </Box>

//       {/* Модальное окно */}
//       <Dialog
//         open={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         PaperProps={{
//           sx: {
//             bgcolor: "rgb(17,29,39)", // Темный фон
//             color: "white", // Белый текст
//           },
//         }}
//       >
//         <DialogTitle sx={{ color: "white" }}>Запись аудио</DialogTitle>
//         <DialogContent>
//           <Typography sx={{ mb: 2 }}>
//             Нажмите "Start", чтобы начать запись, и "Stop", чтобы завершить.
//           </Typography>
//           {/* Вставляем компонент AudioRecorder */}
//           <AudioRecorder
//             onTranscriptionComplete={handleTranscriptionComplete}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setIsModalOpen(false)}
//             sx={{
//               color: "white", // Белый текст на кнопке
//             }}
//           >
//             Закрыть
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Chat;

// Chat.tsx
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  Suspense,
} from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import red from "@mui/material/colors/red";
const ChatItem = React.lazy(() => import("../components/chat/ChatItem"));
import { IoMdSend } from "react-icons/io";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { GoPaperclip } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import AudioRecorder from "./VoiceCommand";
import ImageUploader from "./ImageUploader";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для обработки завершения транскрипции
  const handleTranscriptionComplete = (transcribedText: string) => {
    if (!transcribedText) {
      toast.error("Ошибка при расшифровке аудио.");
      return;
    }
    const newMessage: Message = { role: "user", content: transcribedText };
    if (inputRef) {
      // @ts-ignore
      inputRef.current.value = newMessage.content;
    }
  };

  const handleModalOpen = () => setIsModalOpen(true); // Открытие модалки
  const handleModalClose = () => setIsModalOpen(false); // Закрытие модалки

  const handleFileModalOpen = () => setIsFileModalOpen(true); // Открытие модалки
  const handleFileModalClose = () => setIsFileModalOpen(false); // Закрытие модалки

  const handleFileChange = (transcribedText: string) => {
    if (!transcribedText) {
      toast.error("Ошибка при парсинге файла");
      return;
    }
    if (inputRef) {
      // @ts-ignore
      inputRef.current.value = transcribedText.transcription;
      console.log(transcribedText);
    }
  };

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      setIsLoading(true); // Устанавливаем загрузку в true
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
    } catch (error) {
      toast.error("Ошибка при отправке сообщения");
    } finally {
      setIsLoading(false); // После завершения запроса сбрасываем загрузку
    }

    try {
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
    } catch (error) {
      toast.error(
        "Ваш вопрос должен быть только по математике. Попробуйте задать вопрос по математике."
      );
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 4o Mini
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {isLoading && (
            <Typography sx={{ color: "white", textAlign: "center" }}>
              Loading...
            </Typography>
          )}
          <Suspense
            fallback={
              <Typography sx={{ color: "white", textAlign: "center" }}>
                Loading messages...
              </Typography>
            }
          >
            {chatMessages.map((chat, index) => (
              //@ts-ignore
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))}
          </Suspense>
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17, 27, 39)",
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton
            onClick={handleFileModalOpen} // Используем handleModalOpen для открытия модалки
            sx={{ color: "white", mx: 1 }}
          >
            <GoPaperclip />
          </IconButton>
          <IconButton
            onClick={() => setIsModalOpen(true)}
            sx={{ color: "white", mx: 1 }}
          >
            <HiOutlineMicrophone />
          </IconButton>
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>

      {/* Модальное окно */}
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose} // Закрытие модалки
        PaperProps={{
          sx: {
            bgcolor: "rgb(17,29,39)", // Темный фон
            color: "white", // Белый текст
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>Запись аудио</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Нажмите "Start", чтобы начать запись, и "Stop", чтобы завершить.
          </Typography>
          <AudioRecorder
            onTranscriptionComplete={handleTranscriptionComplete}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} sx={{ color: "white" }}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>

      {/* Модальное окно */}
      <Dialog
        open={isFileModalOpen}
        onClose={handleFileModalClose} // Закрытие модалки
        PaperProps={{
          sx: {
            bgcolor: "rgb(17,29,39)", // Темный фон
            color: "white", // Белый текст
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>Парсинг изображения</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>Загрузите файл</Typography>
          <ImageUploader onImageParsed={handleFileChange} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleFileModalClose} sx={{ color: "white" }}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Chat;

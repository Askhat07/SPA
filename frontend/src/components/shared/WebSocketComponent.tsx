// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// interface Data {
//   newValue: number;
// }

// const WebSocketComponent = () => {
//   const [data, setData] = useState<Data | null>(null); // Тип данных

//   useEffect(() => {
//     const socket = io("http://localhost:5173");

//     socket.on("data-update", (newData: Data) => {
//       setData(newData); // Устанавливаем данные с типом Data
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Real-time Data</h1>
//       {data ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// };

// export default WebSocketComponent;

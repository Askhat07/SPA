// Support.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSupportMessage, setSupportStatus } from "../redux/supportActions";
import { Box, TextField, Button, Typography } from "@mui/material";

const Support = () => {
  const dispatch = useDispatch();
  const { message, status } = useSelector((state: any) => state.support);

  console.log(message, status);

  const [inputMessage, setInputMessage] = useState(message);

  const handleSubmit = async () => {
    if (inputMessage.trim() === "") return;

    dispatch(setSupportStatus("loading"));

    try {
      setTimeout(() => {
        dispatch(setSupportMessage(inputMessage));
        dispatch(setSupportStatus("success"));
      }, 2000);
    } catch (error) {
      dispatch(setSupportStatus("error"));
      console.error(error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Support
      </Typography>
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        sx={{
          "& .MuiInputBase-input": { color: "white" },
          "& .MuiInputLabel-root": { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "#00fffc" },
            "&.Mui-focused fieldset": { borderColor: "#00fffc" },
          },
        }}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>
      </Box>

      {status === "success" && (
        <Typography color="green" mt={2}>
          Message sent successfully!
        </Typography>
      )}
      {status === "error" && (
        <Typography color="red" mt={2}>
          Failed to send message. Please try again.
        </Typography>
      )}
    </Box>
  );
};

export default Support;

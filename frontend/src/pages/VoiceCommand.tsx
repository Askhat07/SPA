// VoiceCommand.tsx
import React, { useState, useEffect } from "react";
// @ts-ignore
import AudioAnalyser from "react-audio-analyser";
import axios from "axios";
import toast from "react-hot-toast";

interface AudioRecorderProps {
  onTranscriptionComplete: (transcription: string) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onTranscriptionComplete,
}) => {
  const [status, setStatus] = useState<"inactive" | "recording" | "paused">(
    "inactive"
  );
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const handleControlAudio = (
    newStatus: "inactive" | "recording" | "paused"
  ) => {
    setStatus(newStatus);
  };

  const handleSendAudio = async () => {
    if (!audioBlob) {
      toast.error("Запись аудио отсутствует.");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const transcription = response.data?.transcription;
      if (transcription) {
        onTranscriptionComplete(transcription);
        toast.success("Аудио успешно обработано.");
      } else {
        throw new Error("Транскрипция не получена.");
      }
    } catch (error) {
      console.error("Ошибка при загрузке аудио:", error);
      toast.error("Не удалось расшифровать аудио.");
    } finally {
      setLoading(false);
    }
  };

  const audioProps = {
    audioType: "audio/wav",
    status,
    audioSrc,
    timeslice: 1000,
    startCallback: () => console.log("Начало записи"),
    pauseCallback: () => console.log("Запись приостановлена"),
    stopCallback: (blob: Blob) => {
      setAudioBlob(blob);
      setAudioSrc(window.URL.createObjectURL(blob));
      console.log("Остановка записи");
    },
    errorCallback: (err: Error) => console.error("Ошибка записи:", err),
  };

  return (
    <div>
      <AudioAnalyser {...audioProps}>
        <div className="btn-box">
          <button
            className="btn"
            onClick={() => handleControlAudio("recording")}
          >
            Начать запись
          </button>
          <button className="btn" onClick={() => handleControlAudio("paused")}>
            Пауза
          </button>
          <button
            className="btn"
            onClick={() => handleControlAudio("inactive")}
          >
            Остановить
          </button>
          <button className="btn" onClick={handleSendAudio} disabled={loading}>
            {loading ? "Загрузка..." : "Отправить аудио"}
          </button>
        </div>
      </AudioAnalyser>
    </div>
  );
};

export default AudioRecorder;

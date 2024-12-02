// ImageUploader.tsx
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  onImageParsed: (data: any) => void; // Функция для обработки полученных данных изображения
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageParsed }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSendImage = async () => {
    if (!imageFile) {
      toast.error("Пожалуйста, выберите изображение.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/extract_text", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      const parsedData = response.data; // В зависимости от того, что возвращает сервер, например, обработанные данные изображения
      onImageParsed(parsedData);
      toast.success("Изображение успешно загружено.");
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
      toast.error("Не удалось загрузить изображение.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="file-upload">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleSendImage} disabled={loading}>
          {loading ? "Загрузка..." : "Отправить изображение"}
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;

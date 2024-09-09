"use client";
import { useState, useEffect } from "react";
interface AttachmentViewerProps {
  onFilesChange: (files: File[]) => void;
}
const AttachmentViewer: React.FC<AttachmentViewerProps> = ({
  onFilesChange,
}) => {
  const [files, setFiles] = useState([]);
  const [attachments, setAttachments] = useState<
    { name: string; url: string }[]
  >([]);

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      const files = e.target.files; //When Click on attachments
      setFiles(files);
      if (files) {
        onFilesChange(files);
        try {
          Array.from(files).forEach((file: any) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target && typeof event.target.result === "string") {
                setAttachments((prev) => [
                  ...prev,
                  { name: file.name, url: URL.createObjectURL(file) },
                ]);
              }
            };
            reader.readAsDataURL(file);
          });
        } catch (e: any) {
          console.log("Error in Updating Files", e);
        }
      }
    }
  };
  return (
    <>
      {" "}
      <div className="w-full flex justify-between items-center">
        <label>Attachments:</label>
        <input
          type="file"
          name="filename"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="input w-full"
        />
      </div>
      <div className="w-full flex flex-col space-y-2">
        {attachments.map((file, index) => (
          <div
            key={index}
            className="card p-2 border rounded flex items-center space-x-2"
          >
            <img src={file.url} alt={file.name} className="w-12 h-12" />
            <span>{file.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};
export default AttachmentViewer;

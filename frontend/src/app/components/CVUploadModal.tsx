"use client";

import { useRef, useState } from "react";
import { getToken } from "../utils/auth";
import api from "../utils/api";

interface CVUploadModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CVUploadModal({ open, onClose, onSuccess }: CVUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError("");
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB.");
      return;
    }
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setError("");
    try {
      const formData = new FormData();
      formData.append("resume", file);
      await api.post("/api/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          if (progressEvent.total) {
            setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
          }
        },
      } as any);
      setUploading(false);
      onSuccess();
      onClose();
    } catch (err: any) {
      setUploading(false);
      setError(err?.response?.data?.message || err.message || "Upload failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white/80 dark:bg-[#181c2b]/90 border border-white/30 dark:border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
        <button
          className="absolute top-3 right-3 text-2xl text-foreground/60 hover:text-foreground/90 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-indigo-900 dark:text-white mb-4">Upload Your CV</h2>
        <div
          className="w-full flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-xl bg-white/60 dark:bg-white/10 p-6 mb-4 cursor-pointer hover:bg-white/80 transition"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={e => {
              if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
            }}
          />
          <span className="text-indigo-700 dark:text-indigo-200 font-semibold mb-2">Drag & drop your PDF here, or click to select</span>
          {file && <span className="mt-2 text-indigo-900 dark:text-white">{file.name}</span>}
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {uploading ? (
          <div className="w-full mt-2">
            <div className="h-3 bg-indigo-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center text-indigo-700 mt-2">Uploading... {progress}%</div>
          </div>
        ) : (
          <button
            className="mt-4 rounded-xl py-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow transition text-lg disabled:opacity-50"
            disabled={!file}
            onClick={handleUpload}
          >
            Upload CV
          </button>
        )}
      </div>
    </div>
  );
} 
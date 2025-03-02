"use client";
import { useState } from "react";

interface VideoInfo {
  title: string;
  duration: number;
  url: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setVideoInfo(null);

    try {
      const response = await fetch("/api/youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Có lỗi xảy ra");
      }

      setVideoInfo(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Có lỗi xảy ra");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!videoInfo) return;

    try {
      window.open(videoInfo.url, "_blank");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Lỗi khi tải xuống file");
      } else {
        setError("Lỗi khi tải xuống file");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">YouTube MP3 Downloader</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Nhập URL video YouTube"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "Đang xử lý..." : "Tải xuống"}
            </button>
          </form>

          {error && <div className="mt-4 text-red-500 bg-red-50 p-4 rounded-md">{error}</div>}

          {videoInfo && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">{videoInfo.title}</h2>
              <p className="text-gray-600 mb-4">
                Thời lượng: {Math.floor(videoInfo.duration / 60)}:{videoInfo.duration % 60}
              </p>
              <button
                onClick={handleDownload}
                className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
              >
                Tải MP3
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

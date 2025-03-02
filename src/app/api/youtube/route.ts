import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    // Validate URL
    if (!ytdl.validateURL(url)) {
      return NextResponse.json({ error: "URL YouTube không hợp lệ" }, { status: 400 });
    }

    // Get video info
    const info = await ytdl.getInfo(url);
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, "");

    // Get audio format
    const audioFormats = info.formats.filter((format) => format.mimeType?.includes("audio/mp4"));
    const bestAudioFormat = audioFormats.reduce((prev, current) => {
      return (prev.audioBitrate || 0) > (current.audioBitrate || 0) ? prev : current;
    });

    return NextResponse.json({
      title: videoTitle,
      url: bestAudioFormat.url,
      duration: parseInt(info.videoDetails.lengthSeconds),
      contentLength: bestAudioFormat.contentLength,
      audioBitrate: bestAudioFormat.audioBitrate,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra khi xử lý video" }, { status: 500 });
  }
}

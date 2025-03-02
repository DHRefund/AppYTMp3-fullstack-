import { NextResponse } from "next/server";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

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

    // Get audio only format
    const audioFormat = ytdl.chooseFormat(info.formats, {
      quality: "highestaudio",
      filter: "audioonly",
    });

    return NextResponse.json({
      title: videoTitle,
      format: audioFormat,
      url: audioFormat.url,
      duration: info.videoDetails.lengthSeconds,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra khi xử lý video" }, { status: 500 });
  }
}

/ Sora 视频收集器 - Shadowrocket 端
const GOOGLE_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzPbejGh3bAqAAneDmNXnJcCYA1t_JevvUQKQsITBWx2joJmp8PumJXoG3II2Yf_xrA/exec";
const HOOK_SECRET = "@#$%^&*11"; // 如果有 SECRET_KEY，请填相同值

const requestUrl = $request && $request.url;
if (!requestUrl) { $done({}); }

const VIDEO_EXT = [".mp4",".mov",".mkv",".webm",".flv",".m4v"];
function isVideo(url){
  const u = url.toLowerCase();
  return VIDEO_EXT.some(e=>u.includes(e)) || u.includes("/videos/");
}

if (requestUrl.includes("videos.openai.com") && isVideo(requestUrl)) {
  const idMatch = requestUrl.match(/task_([a-z0-9]+)/i);
  const name = idMatch ? `Sora_${idMatch[1]}` : "Sora视频";

  const payload = {
    name,
    url: requestUrl,
    timestamp: new Date().toISOString(),
    source: "ChatGPT-Sora",
    _secret: HOOK_SECRET
  };

  $httpClient.post({
    url: GOOGLE_WEBHOOK_URL,
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  }, (err, resp, data)=>{
    if (err) console.log("❌ 上传失败", err);
    else console.log("✅ 已保存", resp.status);
  });
}
$done({});
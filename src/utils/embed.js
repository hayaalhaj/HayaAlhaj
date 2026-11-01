/* Turns a YouTube or Google Drive link into an address that can be shown inside the page.
   Returns null for anything else (for example a video file path like /videos/intro.mp4). */
export const getEmbedUrl = (url) => {
  const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;

  const drive = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;

  return null;
};

/* Reads the embed code copied from Behance (Share -> Copy Embed). You can paste the whole <iframe ...> code,
   or only the address inside src="...". Returns { src, ratio } or null if it is not a Behance address. */
export const parseEmbed = (input) => {
  const src = input.match(/src=["']([^"']+)["']/)?.[1] ?? input.trim();
  if (!src.startsWith("https://www.behance.net/")) return null;

  const width = Number(input.match(/width=["']?(\d+)/)?.[1]);
  const height = Number(input.match(/height=["']?(\d+)/)?.[1]);
  return { src, ratio: width && height ? width / height : 4 / 3 };
};
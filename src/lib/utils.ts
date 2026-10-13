/**
 * Utility functions for Kinetix platform
 */

export function getYouTubeEmbedUrl(url: string | undefined | null): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Handle youtu.be/<id>
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  // Handle youtube.com/watch?v=<id>
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  // Handle existing embed URL
  if (trimmed.includes('youtube.com/embed/')) {
    return trimmed;
  }

  return trimmed;
}

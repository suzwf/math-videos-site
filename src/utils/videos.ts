import videos from '../data/videos.json';

export type Video = (typeof videos)[number];

export function getAllVideos() {
  return [...videos].sort((a, b) => a.sort_order - b.sort_order);
}

export function getPublishedVideos() {
  return getAllVideos().filter((video) => video.publish_status === 'published');
}

export function getVideoBySlug(slug: string) {
  return getPublishedVideos().find((video) => video.slug === slug);
}

export function getVideosByChapter(chapterId: string) {
  return getPublishedVideos().filter((video) => video.chapter_id === chapterId);
}

export function getRelatedVideos(video: Video, limit = 4) {
  return getPublishedVideos()
    .filter((item) => item.id !== video.id && item.chapter_id === video.chapter_id)
    .slice(0, limit);
}

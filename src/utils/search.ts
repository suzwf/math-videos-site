import searchConfig from '../data/search-config.json';
import { getPublishedVideos, type Video } from './videos';

function fieldText(video: Video, field: string) {
  const value = video[field as keyof Video];
  return Array.isArray(value) ? value.join(' ') : String(value ?? '');
}

export function searchVideos(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return getPublishedVideos().slice(0, searchConfig.defaultLimit);
  }

  return getPublishedVideos()
    .map((video) => {
      const score = searchConfig.fields.reduce((total, field) => {
        const text = fieldText(video, field.name).toLowerCase();
        return text.includes(normalizedQuery) ? total + field.weight : total;
      }, 0);

      return { video, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.video.sort_order - b.video.sort_order)
    .slice(0, searchConfig.defaultLimit)
    .map((result) => result.video);
}

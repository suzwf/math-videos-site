import chapters from '../data/chapters.json';

export type Chapter = (typeof chapters)[number]['chapters'][number] & {
  stageId: string;
  stageName: string;
};

export function getStages() {
  return chapters;
}

export function getAllChapters(): Chapter[] {
  return chapters.flatMap((stage) =>
    stage.chapters.map((chapter) => ({
      ...chapter,
      stageId: stage.id,
      stageName: stage.name
    }))
  );
}

export function getChapterById(chapterId: string) {
  return getAllChapters().find((chapter) => chapter.id === chapterId);
}

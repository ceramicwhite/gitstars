import { defineStore } from 'pinia';
import { TAG_TYPE, TAG_SORT_TYPE, TAG_SRC } from '@/constants';
import { useRepositoryStore } from './repository';

/**
 * Analyze topics to get all topics and their corresponding repositories
 */
function analyzeTopics() {
  const topicMap = {};
  const repositoryStore = useRepositoryStore();

  repositoryStore.all.forEach((repository) => {
    repository.topics.forEach((topic) => {
      if (topicMap[topic]) {
        topicMap[topic].push(repository.id);
      } else {
        topicMap[topic] = [repository.id];
      }
    });
  });
  return topicMap;
}

/**
 * Analyze languages to get all languages and their corresponding repositories
 */
function analyzeLanguages() {
  const languageMap = {};
  const repositoryStore = useRepositoryStore();

  repositoryStore.all.forEach((repository) => {
    if (!repository.language) return;

    if (languageMap[repository.language]) {
      languageMap[repository.language].push(repository.id);
    } else {
      languageMap[repository.language] = [repository.id];
    }
  });
  return languageMap;
}

export const useTagStore = defineStore('tag', {
  state: () => ({
    /**
     * Tag source
     *  1. Starred repositories
     *  2. Github rankings
     */
    tagSrc: TAG_SRC.self,
    /**
     * Currently selected tag
     * either topic or language
     */
    selectedTag: '',
    /**
     * Currently selected tag type
     * topic and language tags may have the same name
     * this flag is used to determine the type of the selected tag
     */
    selectedTagType: '',
    /**
     * Currently selected tag category
     * used for highlighting Topics and Languages in the sidebar
     */
    selectedTagTypeNav: TAG_TYPE.topic,
    /**
     * Tag search content
     */
    filterText: '',
    /**
     * Tag sorting
     */
    sortType: TAG_SORT_TYPE.amountDown.value,
    /**
     * Topics
     */
    topicMap: {},
    /**
     * Languages
     */
    languageMap: {},
  }),

  actions: {
    /**
     * Analyze topics and languages
     */
    analyze() {
      this.topicMap = analyzeTopics();
      this.languageMap = analyzeLanguages();
    },
  },
});

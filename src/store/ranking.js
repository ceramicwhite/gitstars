import { defineStore } from 'pinia';
import {
  getGithubRankingLanguageList,
  getGithubRankingLanguageMap,
} from '@/server/github';

export const useRankingStore = defineStore('ranking', {
  state: () => ({
    /**
     * Language tag list
     */
    languageList: [],
    /**
     * Language tag: Repository list
     */
    languageMap: {},
    /**
     * Currently selected language tag
     */
    selectedLanguage: '',
    /**
     * Language tag filter
     */
    filterText: '',
  }),

  getters: {
    repositories: (state) =>
      Object.values(state.languageMap)
        .flat()
        .filter(
          (repo, index, self) =>
            self.findIndex(({ id }) => id === repo.id) === index,
        ),
  },

  actions: {
    /**
     * Fetch language list
     */
    async resolveLanguageList() {
      this.languageList = await getGithubRankingLanguageList();
    },
    /**
     * Fetch language: Repository list
     */
    async resolveLanguageMap() {
      this.languageMap = await getGithubRankingLanguageMap();
    },
  },
});

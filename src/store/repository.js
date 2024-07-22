import { defineStore } from 'pinia';
import { getStarredRepositories } from '@/server/github';
import { STARRED_REPOS, REPO_SORT_TYPE, TAG_TYPE, TAG_SRC } from '@/constants';
import { useTagStore } from '@/store/tag';
import { useRankingStore } from '@/store/ranking';

/**
 * Fetch repositories via HTTP and update the store
 * Github API uses HTTP2, so there's no concurrency limit
 *
 * @param {Array} storeRepositories - Repositories in the store
 * @returns {Promise<void>}
 */
async function handlerRsolveRepositories(storeRepositories) {
  const PAGE_SIZE = 100;
  const PARALLEL_NUM = 10;
  const STEP_SIZE = PAGE_SIZE * PARALLEL_NUM;
  let parallelRequests = [];
  let page = 1;
  let repositoryIndex = 0;

  do {
    parallelRequests.push(
      getStarredRepositories({ page, per_page: PAGE_SIZE }),
    );

    if (page % PARALLEL_NUM === 0) {
      const httpRepositories = (await Promise.all(parallelRequests)).flat();
      parallelRequests = [];

      for (let i = 0; i < httpRepositories.length; i += 1) {
        const httpRepo = httpRepositories[i];
        const storeRepo = storeRepositories[repositoryIndex];

        if (storeRepo) {
          if (storeRepo.id !== httpRepo.id) {
            const storeRepoIndex = storeRepositories.findIndex(
              ({ id }) => id === httpRepo.id,
            );
            if (storeRepoIndex >= 0) {
              storeRepositories.splice(storeRepoIndex, 1);
            }
            storeRepositories.splice(repositoryIndex, 0, httpRepo);
          }
        } else {
          storeRepositories.splice(repositoryIndex, 0, httpRepo);
        }
        repositoryIndex += 1;
      }
      if (httpRepositories.length < STEP_SIZE) {
        storeRepositories.splice(repositoryIndex);
        break;
      }
    }
    page += 1;
  } while (true);
}

export const useRepositoryStore = defineStore('repository', {
  state: () => ({
    /**
     * All repositories
     */
    all: [],
    /**
     * Selected repository ID
     */
    selectedId: null,
    /**
     * Filter text for repositories
     */
    filterText: '',
    /**
     * Whether repositories are being fetched via HTTP
     */
    loading: true,
    /**
     * Sorting type for repositories
     * either by time or star count
     */
    sortType: REPO_SORT_TYPE.time.value,
  }),

  getters: {
    /**
     * Repositories filtered by current conditions
     */
    filteredRepositories: (state) => {
      let repositoriesTmp = [];
      const tagStore = useTagStore();
      const rankingStore = useRankingStore();

      if (tagStore.tagSrc === TAG_SRC.self) {
        if (!tagStore.selectedTag) {
          repositoriesTmp = [...state.all];
        } else if (tagStore.selectedTagType === TAG_TYPE.topic) {
          const repositoryIds = tagStore.topicMap[tagStore.selectedTag];
          if (repositoryIds) {
            repositoriesTmp = state.all.filter((repository) =>
              repositoryIds.includes(repository.id),
            );
          }
        } else if (tagStore.selectedTagType === TAG_TYPE.language) {
          const repositoryIds = tagStore.languageMap[tagStore.selectedTag];
          if (repositoryIds) {
            repositoriesTmp = state.all.filter((repository) =>
              repositoryIds.includes(repository.id),
            );
          }
        }
      } else if (tagStore.tagSrc === TAG_SRC.github) {
        if (rankingStore.selectedLanguage) {
          repositoriesTmp = [
            ...(rankingStore.languageMap[rankingStore.selectedLanguage] ?? []),
          ];
        } else {
          repositoriesTmp = [...(rankingStore.languageMap.all ?? [])];
        }
      }

      if (state.filterText) {
        const filterText = state.filterText.toLowerCase();
        repositoriesTmp = repositoriesTmp.filter(
          (repository) =>
            repository.owner.login.toLowerCase().includes(filterText) ||
            repository.name.toLowerCase().includes(filterText) ||
            repository.description?.toLowerCase().includes(filterText),
        );
      }

      if (
        tagStore.tagSrc === TAG_SRC.self &&
        repositoriesTmp.length > 0 &&
        state.sortType === REPO_SORT_TYPE.star.value
      ) {
        repositoriesTmp.sort((a, b) => b.stargazers_count - a.stargazers_count);
      }

      return repositoriesTmp;
    },

    /**
     * Currently selected repository
     */
    selectedRepository: (state) => {
      const rankingStore = useRankingStore();
      return (
        state.all.find((item) => item.id === state.selectedId) ||
        rankingStore.repositories.find((item) => item.id === state.selectedId)
      );
    },
  },

  actions: {
    /**
     * Fetch repositories from LocalStorage or HTTP
     */
    async resolveRepositories() {
      this.loading = true;
      let localRepositories = localStorage.getItem(STARRED_REPOS);

      if (localRepositories) {
        localRepositories = JSON.parse(localRepositories);
        this.all = localRepositories;
      }

      if (!import.meta.env.DEV) {
        await handlerRsolveRepositories(this.all);
        localStorage.setItem(STARRED_REPOS, JSON.stringify(this.all));
      }
      this.loading = false;
    },
  },
});

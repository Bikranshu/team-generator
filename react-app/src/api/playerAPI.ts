import { emptySplitApi as api } from '../store/emptySplitApi';
export const addTagTypes = ['players'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      storePlayer: build.mutation<StorePlayerApiResponse, StorePlayerApiArg>({
        query: (queryArg) => ({ url: `/players`, method: 'POST', body: queryArg.playerPayload }),
        invalidatesTags: ['players'],
      }),
      findAllPlayer: build.query<FindAllPlayerApiResponse, FindAllPlayerApiArg>({
        query: () => ({ url: `/players/search` }),
        providesTags: ['players'],
      }),
      findPlayerById: build.query<FindPlayerByIdApiResponse, FindPlayerByIdApiArg>({
        query: (queryArg) => ({ url: `/players/${queryArg.id}` }),
        providesTags: ['players'],
      }),
      destoryPlayerById: build.mutation<DestoryPlayerByIdApiResponse, DestoryPlayerByIdApiArg>({
        query: (queryArg) => ({ url: `/players/${queryArg.id}`, method: 'DELETE' }),
        invalidatesTags: ['players'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as teamGeneratorApi };
export type StorePlayerApiResponse = /** status 201 OK */ {
  success?: boolean;
  data?: Player;
};
export type StorePlayerApiArg = {
  playerPayload: PlayerPayload;
};
export type FindAllPlayerApiResponse = /** status 201 OK */ {
  success?: boolean;
  data?: {
    data?: Player[];
  };
};
export type FindAllPlayerApiArg = void;
export type FindPlayerByIdApiResponse = /** status 200 OK */ {
  success?: boolean;
  data?: Player[];
};
export type FindPlayerByIdApiArg = {
  /** id of player data that needs to be fetched */
  id: any;
};
export type DestoryPlayerByIdApiResponse = /** status 200 OK */ {
  success?: boolean;
  data?: TeamDetailPayload;
};
export type DestoryPlayerByIdApiArg = {
  /** id of player */
  id: any;
};
export type Player = {
  /** Unique Identifier */
  id?: number;
  /** Name */
  name?: string;
  /** Skill */
  skill?: string;
};
export type UnAuthorizedError = {
  message?: string;
  code?: string;
};
export type NotFoundError = {
  message?: string;
  code?: string;
};
export type PlayerPayload = {
  /** Unique Identifier */
  id?: number;
  /** Name */
  name?: string;
  /** Skill */
  skill?: string;
}[];
export type TeamDetailPayload = {
  /** Record Id */
  id?: number;
  /** Title */
  title?: string;
};
export const {
  useStorePlayerMutation,
  useFindAllPlayerQuery,
  useLazyFindAllPlayerQuery,
  useFindPlayerByIdQuery,
  useLazyFindPlayerByIdQuery,
  useDestoryPlayerByIdMutation,
} = injectedRtkApi;

import { emptySplitApi as api } from '../store/emptySplitApi';
export const addTagTypes = ['teams'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      storeTeam: build.mutation<StoreTeamApiResponse, StoreTeamApiArg>({
        query: (queryArg) => ({ url: `/teams`, method: 'POST', body: queryArg.teamPayload }),
        invalidatesTags: ['teams'],
      }),
      findAllTeam: build.query<FindAllTeamApiResponse, FindAllTeamApiArg>({
        query: () => ({ url: `/teams/search` }),
        providesTags: ['teams'],
      }),
      findTeamById: build.query<FindTeamByIdApiResponse, FindTeamByIdApiArg>({
        query: (queryArg) => ({ url: `/teams/${queryArg.id}` }),
        providesTags: ['teams'],
      }),
      destoryTeamById: build.mutation<DestoryTeamByIdApiResponse, DestoryTeamByIdApiArg>({
        query: (queryArg) => ({ url: `/teams/${queryArg.id}`, method: 'DELETE' }),
        invalidatesTags: ['teams'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as teamGeneratorApi };
export type StoreTeamApiResponse = /** status 201 OK */ {
  success?: boolean;
  data?: Team[];
};
export type StoreTeamApiArg = {
  teamPayload: TeamPayload;
};
export type FindAllTeamApiResponse = /** status 201 OK */ {
  success?: boolean;
  data?: {
    data?: Team[];
  };
};
export type FindAllTeamApiArg = void;
export type FindTeamByIdApiResponse = /** status 200 OK */ {
  success?: boolean;
  data?: TeamDetailPayload;
};
export type FindTeamByIdApiArg = {
  /** id of team that needs to be fetched */
  id: any;
};
export type DestoryTeamByIdApiResponse = /** status 200 OK */ {
  success?: boolean;
  data?: TeamDetailPayload;
};
export type DestoryTeamByIdApiArg = {
  /** id of team */
  id: any;
};
export type Team = {
  /** Unique Identifier */
  id?: number;
  /** Title */
  title?: string;
};
export type UnAuthorizedError = {
  message?: string;
  code?: string;
};
export type NotFoundError = {
  message?: string;
  code?: string;
};
export type TeamPayload = {
  /** Unique Identifier */
  id?: number;
  /** Title */
  title?: string;
}[];
export type TeamDetailPayload = {
  /** Record Id */
  id?: number;
  /** Title */
  title?: string;
};
export const {
  useStoreTeamMutation,
  useFindAllTeamQuery,
  useLazyFindAllTeamQuery,
  useFindTeamByIdQuery,
  useLazyFindTeamByIdQuery,
  useDestoryTeamByIdMutation,
} = injectedRtkApi;

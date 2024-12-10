import { emptySplitApi as api } from '../store/emptySplitApi';
export const addTagTypes = ['events'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      storeEvent: build.mutation<StoreEventApiResponse, StoreEventApiArg>({
        query: (queryArg) => ({ url: `/events`, method: 'POST', body: queryArg.eventPayload }),
        invalidatesTags: ['events'],
      }),
      findEventById: build.query<FindEventByIdApiResponse, FindEventByIdApiArg>({
        query: (queryArg) => ({ url: `/events/${queryArg.id}` }),
        providesTags: ['events'],
      }),
      findEventByUuid: build.query<FindEventByUuidApiResponse, FindEventByUuidApiArg>({
        query: (queryArg) => ({ url: `/events/detail/${queryArg.publicLink}` }),
        providesTags: ['events'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as teamGeneratorApi };
export type StoreEventApiResponse = /** status 201 OK */ {
  success?: boolean;
  data?: Event;
};
export type StoreEventApiArg = {
  eventPayload: EventPayload;
};
export type FindEventByIdApiResponse = /** status 200 OK */ {
  success?: boolean;
  data?: EventDetailPayload;
};
export type FindEventByIdApiArg = {
  /** id of event that needs to be fetched */
  id: any;
};
export type FindEventByUuidApiResponse = /** status 200 OK */ {
  success?: boolean;
  data?: EventDetailPayload;
};
export type FindEventByUuidApiArg = {
  /** public link of event that needs to be fetched */
  publicLink: any;
};
export type Event = {
  /** Unique identifier */
  eventId?: number;
  /** Title */
  eventTitle?: string;
  /** Public Link */
  publicLink?: string;
  players?: {
    /** Unique Identifier */
    id?: number;
    /** Name */
    name?: string;
    /** Skill */
    skill?: number;
  }[];
  teams?: {
    /** Unique Identifier */
    id?: number;
    /** Title */
    title?: string;
  }[];
};
export type UnAuthorizedError = {
  message?: string;
  code?: string;
};
export type NotFoundError = {
  message?: string;
  code?: string;
};
export type EventPayload = {
  /** Title */
  title?: string;
};
export type EventDetailPayload = {
  /** Unique Identifier */
  eventId?: string;
  /** Title */
  eventTitle?: string;
  /** Public Link */
  publicLink?: string;
  teams?: {
    /** Title */
    name?: string;
    players?: {
      /** Serial Number */
      serial?: string;
      /** Name */
      name?: string;
      /** Skill */
      skill?: string;
    }[];
  }[];
};
export const {
  useStoreEventMutation,
  useFindEventByIdQuery,
  useLazyFindEventByIdQuery,
  useFindEventByUuidQuery,
  useLazyFindEventByUuidQuery,
} = injectedRtkApi;

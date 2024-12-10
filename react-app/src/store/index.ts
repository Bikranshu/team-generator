import {configureStore} from '@reduxjs/toolkit';

import {emptySplitApi} from "./emptySplitApi";

const middlewares = [emptySplitApi.middleware];

const store = configureStore({
    reducer: {
        [emptySplitApi.reducerPath]: emptySplitApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(middlewares),
    devTools: true,
})

export default store

import type {ConfigFile} from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
    schemaFile: 'team-generator-1.0.0.yaml',
    apiFile: "./src/store/emptySplitApi.ts",
    apiImport: "emptySplitApi",
    exportName: "teamGeneratorApi",
    outputFiles: {
        "./src/api/playerAPI.ts": {
            filterEndpoints: ['storePlayer', 'findPlayerById', 'findAllPlayer', 'destoryPlayerById'],
        },
        "./src/api/teamAPI.ts": {
            filterEndpoints: ['storeTeam', 'findTeamById', 'findAllTeam', 'destoryTeamById'],
        },
        "./src/api/eventAPI.ts": {
            filterEndpoints: ['storeEvent', 'findEventById', 'findEventByUuid'],
        }
    },
    hooks: {queries: true, lazyQueries: true, mutations: true},
    tag: true,
};

export default config

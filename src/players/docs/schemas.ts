export default {
  playerSchema: {
    type: 'object',
    properties: {
      player: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'Unique Identifier',
            example: 1,
          },
          name: { type: 'string', description: 'Name', example: 'Krishna Timilsina' },
          skill: { type: 'string', description: 'Skill', example: '4' },
        },
      },
      playerPayload: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Unique Identifier', example: 1 , required: false },
            name: { type: 'string', description: 'Name', example: 'Krishna Timilsina' },
            skill: { type: 'string', description: 'Skill', example: '4' },
          },
        },
      },
      searchDetailPayload: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'Record Id', example: 1 },
        },
      },
    },
  },
};

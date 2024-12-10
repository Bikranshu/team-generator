export default {
  teamSchema: {
    type: 'object',
    properties: {
      team: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'Unique Identifier', example: 1 },
          title: { type: 'string', description: 'Title', example: 'Yellow Team' },
        },
      },
      teamPayload: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Unique Identifier', example: 1 , required: false },
            title: { type: 'string', description: 'Title', example: 'Team1' },
          },
        },
      },
      teamDetailPayload: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'Record Id',
            example: 1,
          },
          title: { type: 'string', description: 'Title', example: 'Green Team' },
        },
      },
    },
  },
};

export default {
  eventSchema: {
    type: 'object',
    properties: {
      event: {
        type: 'object',
        properties: {
          eventId: { type: 'number', description: 'Unique identifier', example: 1 },
          eventTitle: { type: 'string', description: 'Title', example: 'Friday Futsal' },
          publicLink: { type: 'string', description: 'Public Link', example: 'http://localhost:3000/5e32b467-d1e9-4a57-a799-ffc547c2725d' },
          players: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', description: 'Unique Identifier', example: 1 },
                name: {type: 'string', description: 'Name', example: 'Krishna'},
                skill: {type: 'number', description: 'Skill', example: 1},
              },
            },
          },
          teams: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', description: 'Unique Identifier', example: 1 },
                title: {type: 'string', description: 'Title', example: 'Team 1'},
              },
            },
          },
        },
      },
      eventPayload: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Title', example: 'Friday Fustal' },
        },
      },
      eventDetailPayload: {
        type: 'object',
        properties: {
          eventId: { type: 'string', description: 'Unique Identifier', example: '1' },
          eventTitle: { type: 'string', description: 'Title', example: 'Friday Futsal' },
          publicLink: { type: 'string', description: 'Public Link', example: 'http://localhost:3000/5e32b467-d1e9-4a57-a799-ffc547c2725d' },
          teams: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {type: 'string', description: 'Title', example: 'Team 1'},
                players: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      serial: { type: 'string', description: 'Serial Number', example: 1 },
                      name: {type: 'string', description: 'Name', example: 'Krishna'},
                      skill: {type: 'string', description: 'Skill', example: '1'},
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

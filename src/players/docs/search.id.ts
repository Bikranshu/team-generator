export default {
  get: {
    tags: ['players'],
    summary: 'Find the player data by ID',
    description: 'Find the player data by ID',
    operationId: 'findPlayerById',
    // security: [
    //   {
    //     ApiKeyAuth: [],
    //   },
    // ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'id of player data that needs to be fetched',
        required: true,
        type: 'string',
        example: '1',
      },
    ],

    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: 'true',
                },
                data: {
                  type: 'array',
                  items: {
                    type: 'object',
                    $ref: '#/components/schemas/playerSchema/properties/player',
                  },
                },
              },
            },
          },
        },
      },
      404: {
        description: 'Not Found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorSchema/properties/notFoundError',
            },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorSchema/properties/unAuthorizedError',
            },
          },
        },
      },
    },
  },
};

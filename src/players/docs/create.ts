export default {
  post: {
    tags: ['players'],
    summary: 'Create a new player and update old data',
    description: 'Create a new player and update old data',
    operationId: 'storePlayer',
    // security: [
    //   {
    //     ApiKeyAuth: [],
    //   },
    // ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/playerSchema/properties/playerPayload',
          },
        },
      },
    },
    responses: {
      201: {
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
                  $ref: '#/components/schemas/playerSchema/properties/player',
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

export default {
  get: {
    tags: ['teams'],
    summary: 'List all team data',
    description: 'List all team data',
    operationId: 'findAllTeam',
    // security: [
    //   {
    //     ApiKeyAuth: [],
    //   },
    // ],
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
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        $ref: '#/components/schemas/teamSchema/properties/team',
                      },
                    },
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

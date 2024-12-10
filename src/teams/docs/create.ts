export default {
  post: {
    tags: ['teams'],
    summary: 'Create a new team',
    description: 'Create a new team',
    operationId: 'storeTeam',
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
            $ref: '#/components/schemas/teamSchema/properties/teamPayload',
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
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/teamSchema/properties/team',
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

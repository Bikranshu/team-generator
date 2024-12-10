export default {
  post: {
    tags: ['events'],
    summary: 'Create a new events with team members',
    description: 'Create a new events with team members',
    operationId: 'storeEvent',
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
            $ref: '#/components/schemas/eventSchema/properties/eventPayload',
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
                    $ref: '#/components/schemas/eventSchema/properties/event',
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

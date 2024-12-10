export default {
  get: {
    tags: ['events'],
    summary: 'Find the event data by ID',
    description: 'Find the event data by ID',
    operationId: 'findEventById',
    // security: [
    //   {
    //     ApiKeyAuth: [],
    //   },
    // ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'id of event that needs to be fetched',
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
                  $ref: '#/components/schemas/eventSchema/properties/eventDetailPayload',
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

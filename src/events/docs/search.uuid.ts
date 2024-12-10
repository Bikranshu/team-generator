export default {
  get: {
    tags: ['events'],
    summary: 'Find the event data by uuid',
    description: 'Find the event data by uuid',
    operationId: 'findEventByUuid',
    // security: [
    //   {
    //     ApiKeyAuth: [],
    //   },
    // ],
    parameters: [
      {
        name: 'public_link',
        in: 'path',
        description: 'public link of event that needs to be fetched',
        required: true,
        type: 'string',
        example: 'http://localhost:3000/ce8ff0f5-bdf3-469c-919f-5fa3adc4ec83',
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

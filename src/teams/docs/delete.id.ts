export default {
  delete: {
    tags: ['teams'],
    summary: 'Update an existing team by ID',
    description: 'Update an existing team by ID',
    operationId: 'destoryTeamById',
    // security: [
    //   {
    //     ApiKeyAuth: [],
    //   },
    // ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'id of team',
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
                  $ref: '#/components/schemas/teamSchema/properties/teamDetailPayload',
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

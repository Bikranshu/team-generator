import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from './basicInfo';
// Options for the swagger docs
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['../../../routes/v1/*.ts'], // Adjust this path to your API files
};
// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;

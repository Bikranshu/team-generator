import path from 'node:path';
import swaggerUI from 'swagger-ui-express';
import yaml from 'yamljs';

import app from './platforms/config/express';
import routes from './routes/v1';

import docs from './platforms/config/swagger';

import jsonHandler from './platforms/middlewares/json.handler';
import requestLogger from './platforms/middlewares/request.logger';

import swaggerSpec from './platforms/config/swagger';

import { notFound, methodNotAllowed, genericErrorHandler } from './platforms/middlewares/error.handler';

// convert the swagger spec to YAML format
const swaggerYaml = yaml.stringify(swaggerSpec, 10);

if (process?.env?.NODE_ENV?.toUpperCase() === 'DEVELOPMENT') {
  app.use('/swagger/index.html', swaggerUI.serve, swaggerUI.setup(docs));
  // serve the Swagger YAML dynamically
  app.get('/swagger/team-generator-1.0.0.yaml', (req, res) => {
    res.setHeader('Content-Type', 'application/x-yaml');
    //res.setHeader('Content-Type', 'text/yaml');
    res.send(swaggerYaml);
  });
  console.log(`Swagger YAML file running at http://${app.get('host')}:${app.get('port')}/swagger/team-generator-1.0.0.yaml`);
}

// JSON body validation
app.use(jsonHandler);

// Request logger
app.use(requestLogger);

// Router
app.use('/v1', routes);

// Landing page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-app/dist/index.html'));
});
app.get('/teams', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-app/dist/index.html'));
});
app.get('/players', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-app/dist/index.html'));
});
app.get('/team-generator', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-app/dist/index.html'));
});
app.get('/:uuid([0-9a-fA-F-]{36})', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-app/dist/index.html'));
});

// Error handler middleware
app.use([genericErrorHandler, notFound, methodNotAllowed]);

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
});

export default app;

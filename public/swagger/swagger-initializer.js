window.onload = function() {
  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
    // url: `${window.location.origin}/swagger.json`,
    url: `${window.location.origin}/swagger/team-generator-1.0.0.yaml`,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });
  // End Swagger UI call region

  window.ui = ui
};

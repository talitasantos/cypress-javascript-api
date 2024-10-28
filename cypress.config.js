const { defineConfig } = require("Cypress");

module.exports = defineConfig({
    e2e: {
      setupNodeEvents(on, config) {
        // Adicione event listeners ou comandos personalizados, se necessário
      },
      baseUrl: "https://api.trello.com/1",
      token: "ATTAbc1213b99c79e5dff297be5e41d8f0825b7fbb7548781f6d8de80108359d7909079CF103",
      apiKey: "7085f6851a2fab9dc40545959882364c",
      specPattern: "cypress/integration/api/*.spec.js",  // Padrão para localizar os testes
      supportFile: false,  // Desativa o arquivo de suporte, pois ele não é necessário para testes de API
    },
    viewportWidth: 100,  // Configurações de viewport mínimas, já que não há interface gráfica
    viewportHeight: 100,
    video: false,  // Desativa vídeos, pois não são necessários para testes de API
    screenshotOnRunFailure: false,  // Desativa capturas de tela para testes de API
  });
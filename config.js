/* =====================================================================
   CONFIGURAÇÃO CENTRAL — DIAGNÓSTICO MÁQUINA DE LUCROS (4blue)
   ---------------------------------------------------------------------
   Preencha os valores abaixo. NÃO coloque chaves secretas aqui
   (ActiveCampaign / Firebase service account ficam no Apps Script).
   Este arquivo é público (vai pro GitHub Pages).
   ===================================================================== */

window.APP_CONFIG = {
  // URL do Web App do Google Apps Script (termina em /exec)
  // Ex: https://script.google.com/macros/s/AKfycb..../exec
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxpdcY7tGVNX7qSyPvsY9lg0hm7L_XWgxD5Ij4hKSbBsHcXh6unmk1Nk8yKQK9y4aqe/exec",

  // ID do Pixel da Meta (somente números). Deixe "" para desativar.
  META_PIXEL_ID: "COLE_AQUI_O_ID_DO_PIXEL",

  // Tempo máximo (ms) de espera ao enviar os dados antes de liberar o resultado
  SUBMIT_TIMEOUT_MS: 20000,
};

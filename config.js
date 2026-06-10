/* =====================================================================
   CONFIGURAÇÃO CENTRAL — DIAGNÓSTICO MÁQUINA DE LUCROS (4blue)
   ---------------------------------------------------------------------
   Preencha os valores abaixo. NÃO coloque chaves secretas aqui
   (ActiveCampaign / Firebase service account ficam no Apps Script).
   Este arquivo é público (vai pro GitHub Pages).
   ===================================================================== */

window.APP_CONFIG = {
  // URL do Web App do Google Apps Script (termina em /exec)
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxpdcY7tGVNX7qSyPvsY9lg0hm7L_XWgxD5Ij4hKSbBsHcXh6unmk1Nk8yKQK9y4aqe/exec",

  // Google Tag Manager (recomendado pelo gestor de tráfego). O Pixel da Meta
  // é configurado DENTRO do GTM. ID no formato GTM-XXXXXXX.
  GTM_ID: "GTM-P36RMJ3",

  // (Opcional) Pixel da Meta direto, caso queira além do GTM. "" = desativado.
  META_PIXEL_ID: "",

  // Link do WhatsApp do comercial (telas ILU/MDL e diagnóstico final)
  WHATSAPP_URL: "https://wa.me/554135424074?text=Ol%C3%A1%2C%20acabei%20de%20fazer%20o%20diagn%C3%B3stico%20da%204blue%20e%20quero%20conhecer%20as%20solu%C3%A7%C3%B5es%20de%20voc%C3%AAs",

  // Link do combo de cursos (leads abaixo de 60k)
  COMBO_URL: "https://cont.4blue.com.br/supercombovitalicio/",

  // Cargos considerados "liderança" (passam pelas telas ILU/MDL se faturarem +60k)
  LEADERSHIP_ROLES: ["Dono / Sócio", "Gerente / Coordenador / Supervisor"],

  // Faixas de faturamento consideradas ABAIXO de 60k (vão direto ao diagnóstico)
  BELOW_60K_RANGES: ["Até 30mil/mês", "30 a 60mil/mês", "Nada / Não tenho empresa"],

  SUBMIT_TIMEOUT_MS: 20000,
};

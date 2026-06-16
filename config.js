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

  // Google Tag Manager (o Pixel da Meta é configurado DENTRO do GTM).
  GTM_ID: "GTM-P36RMJ3",

  // (Opcional) Pixel da Meta direto, além do GTM. "" = desativado.
  META_PIXEL_ID: "",

  // Link do WhatsApp do comercial (telas ILU/MDL e diagnóstico final)
  WHATSAPP_URL: "https://wa.me/554135424074?text=Ol%C3%A1%2C%20acabei%20de%20fazer%20o%20diagn%C3%B3stico%20da%204blue%20e%20quero%20conhecer%20as%20solu%C3%A7%C3%B5es%20de%20voc%C3%AAs",

  // Link do combo de cursos (oferta para quem fatura abaixo de 30k)
  COMBO_URL: "https://cont.4blue.com.br/supercombovitalicio/",

  // Cargos considerados "liderança" (necessário para ver ILU/MDL)
  LEADERSHIP_ROLES: ["Dono / Sócio", "Gerente / Coordenador / Supervisor"],

  // MQL por faturamento:
  //   abaixo de ILU_MIN_REVENUE  -> oferta combo
  //   ILU_MIN_REVENUE a MDL_MIN  -> ILU
  //   MDL_MIN_REVENUE ou mais    -> ILU ou MDL (decidido pelo diagnóstico)
  ILU_MIN_REVENUE: 30000,
  MDL_MIN_REVENUE: 50000,

  // Roteamento ILU x MDL (apenas para 50k+):
  // ILU só quando o restante vai bem (média dos outros pilares >= ILU_OTHER_MIN)
  // e o Financeiro é o ponto fraco isolado (pelo menos ILU_FINANCE_GAP pontos abaixo).
  // Caso contrário (problemas espalhados) -> MDL.
  ILU_OTHER_MIN: 55,
  ILU_FINANCE_GAP: 20,

  SUBMIT_TIMEOUT_MS: 20000,
};

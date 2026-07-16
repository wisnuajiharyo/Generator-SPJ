/**
 * Fungsi utama yang dipanggil saat web app diakses melalui URL
 */
function doGet(e) {
  // Merender file Index.html
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle(CONFIG.APP_NAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Menghubungkan file HTML lain agar bisa di-include ke dalam Index
 * (Untuk memisahkan CSS dan JS di frontend)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Endpoint untuk Frontend
 */
function ctrlGetAppStatus() {
  return serviceCheckAppStatus();
}

function ctrlGetDropdowns() {
  return serviceGetDropdownData();
}

function ctrlSaveKamus(data) {
  return repoSaveKamus(data);
}
/**
 * Mendapatkan koneksi ke Spreadsheet pengguna
 */
function getDbConnection() {
  const dbId = initDatabase();
  return SpreadsheetApp.openById(dbId);
}

/**
 * Mengambil semua Kamus Data
 */
function repoGetKamus() {
  const ss = getDbConnection();
  const sheet = ss.getSheetByName(CONFIG.SHEET_KAMUS);
  const data = sheet.getDataRange().getValues();
  return data.length > 1 ? data.slice(1) : []; // Kembalikan tanpa header
}

/**
 * Menyimpan data inisiasi Kamus Data (Array 2D)
 */
function repoSaveKamus(dataArray) {
  const ss = getDbConnection();
  const sheet = ss.getSheetByName(CONFIG.SHEET_KAMUS);
  
  // Hapus data lama jika ada (reset) lalu simpan yang baru
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
  }
  
  if (dataArray.length > 0) {
    sheet.getRange(2, 1, dataArray.length, dataArray[0].length).setValues(dataArray);
  }
  return true;
}

/**
 * Menyimpan transaksi histori SPJ baru
 */
function repoSaveHistori(rowData) {
  const ss = getDbConnection();
  const sheet = ss.getSheetByName(CONFIG.SHEET_HISTORI);
  sheet.appendRow(rowData);
  return true;
}
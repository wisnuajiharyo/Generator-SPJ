const CONFIG = {
  APP_NAME: "Generator SPJ Web App",
  SHEET_KAMUS: "Kamus_Data",
  SHEET_HISTORI: "Histori_SPJ"
};

/**
 * Mengecek dan membuat database (Spreadsheet) di Drive pengguna
 * jika belum ada, lalu menyimpan ID-nya di User Properties.
 */
function initDatabase() {
  const userProps = PropertiesService.getUserProperties();
  let dbId = userProps.getProperty('DATABASE_ID');

  // Jika DB belum ada, buat baru
  if (!dbId) {
    const ss = SpreadsheetApp.create(`Database_${CONFIG.APP_NAME}`);
    dbId = ss.getId();
    userProps.setProperty('DATABASE_ID', dbId);

    // Setup Sheet Kamus Data (Sheet Pertama)
    const sheetKamus = ss.getSheets()[0];
    sheetKamus.setName(CONFIG.SHEET_KAMUS);
    sheetKamus.appendRow(["Nama Sub Kegiatan", "Nomor Rekening DPA", "Nama Rekening DPA"]);
    sheetKamus.setFrozenRows(1);

    // Setup Sheet Histori (Sheet Kedua)
    const sheetHistori = ss.insertSheet(CONFIG.SHEET_HISTORI);
    sheetHistori.appendRow(["ID", "Waktu Generate", "Sub Kegiatan", "Rekening DPA", "Rincian Pekerjaan", "Nominal", "Info Vendor", "URL PDF"]);
    sheetHistori.setFrozenRows(1);
  }
  
  return dbId;
}
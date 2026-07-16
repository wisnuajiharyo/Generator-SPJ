/**
 * Mengecek apakah user sudah mengisi Kamus Data atau belum.
 * Digunakan untuk menentukan tampilan UI (Mode Inisiasi vs Mode Operasional).
 */
function serviceCheckAppStatus() {
  const kamus = repoGetKamus();
  return {
    isSetupComplete: kamus.length > 0,
    kamusData: kamus
  };
}

/**
 * Mengolah data kamus menjadi format hierarki untuk Dropdown Cascading
 */
function serviceGetDropdownData() {
  const rawData = repoGetKamus();
  const dropdownTree = {};

  rawData.forEach(row => {
    let subKeg = row[0];
    let noRek = row[1];
    let namaRek = row[2];

    if (!dropdownTree[subKeg]) {
      dropdownTree[subKeg] = [];
    }
    dropdownTree[subKeg].push({
      nomor: noRek,
      nama: namaRek
    });
  });

  return dropdownTree;
}
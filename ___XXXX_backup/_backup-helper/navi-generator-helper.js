import * as UtilHelper from './util-helper';

/**

select n.NAVI_ORDER,n.NAVI_LABEL, n.* from JPNCFG.dbo.EJPN_NAVIGATION  n
ORDER BY n.NAVI_ORDER, n.NAVI_ID

select MAX(NAVI_VER), COUNT(*) from JPNCFG.dbo.EJPN_NAVIGATION

*/
export function generateUpdateAuth() {
  let str = `403050	00100000
  403060	00100000
  385010	11000000
  385012	11000000
  382050	11000000
  382060	00100000
  382070	11000000
  381050	11100000
  381060	00100000
  381250	11100000
  383250	11000000
  383260	00100000
  383270	11100000
  383150	11100000
  383160	11100000
  383170	11100000
  384050	11000000
  384060	00100000
  384850	11000000
  387050	11100000
  386550	11100000
  386650	11100000
  386850	11100000
  384350	11100000
  384550	00100000
  386250	00100000
  386050	00100000
  386150	00100000
  385150	11000000
  385042	11100000
  382150	11100000
  382160	00100000
  385046	11100000
  382350	11100000
  382360	00100000
  382370	11100000
  385036	11100000
  384150	11100000
  384156	11100000
  384250	11100000
  382000	01000000
  382008	01000000
  381200	11100000
  381208	11100000
  383000	01000000
  383008	01000000
  383100	11100000
  383108	11100000
  383300	11100000
  383308	11100000
  384000	01000000
  384008	01000000
  384100	11100000
  384108	11100000
  385014	11000000
  385016	11000000
  385018	11000000
  385020	11000000
  385022	11000000
  385024	11000000
  385026	11000000
  385028	11000000
  385030	11000000
  385032	11000000
  385034	11000000
  385038	11000000
  385040	11000000
  385044	11000000
  385048	11000000
  385050	11000000
  385052	11000000
  382100	01000000
  382108	01000000
  382170	11100000`;

  str = `383160	00100000
  384250	00100000
  381200	01000000
  381208	01000000
  383100	01000000
  383108	01000000
  383300	01000000
  383308	01000000
  384100	01000000
  384108	01000000`;

  let arr = str.split("\n");
  const VER = "20190516092400";
  let toPrint = "";
  for (var i in arr) {
    let r = arr[i]
    let _temp = r.split("\t");

    let code = _temp[0].trim();
    let auth = _temp[1].trim();
    toPrint += `UPDATE JPNCFG.dbo.EJPN_NAVIGATION SET NAVI_AUTH='${auth}', NAVI_VER='${VER}' WHERE NAVI_CODE='${code}' `;
    toPrint += "; \n";
  }

  console.log(toPrint);
}

export function MainSkc2() {
  const _VER = "20190426120500";
  const _AUTH_LEVEL = 4;

  // let NEW_PARENT = [
  //   // "KEMASUKAN MAKLUMAT PERKAHWINAN",
  //   // "CABUTAN DAN CARIAN",
  //   // "SURAT PENGESAHAN TARAF PERKAHWINAN",
  //   // "PENOLONG PENDAFTAR/AHLI TRIBUNAL/PENDAFTAR KEDUTAAN",
  //   "PEMBETULAN KESILAPAN DAFTAR",
  //   "TRIBUNAL DAN PERCERAIAN",
  //   "AFIS"
  // ];


  // var sqlParent = "";
  // let parentParent = "perkahwinan-dan-penceraian-ejpn";
  // var currentParentIndex = 7;
  // for (var i in NEW_PARENT) {
  //   let row = NEW_PARENT[i];
  //   let _LABEL = row.capitalize();
  //   let _NAME = parentParent + "-" + getNameFromLabel(_LABEL)
  //   let _PARENT = parentParent;
  //   let _CODE = "";
  //   let _ORDER = `2-SKC_${currentParentIndex}`;
  //   let _AUTH = "";
  //   let _URL = "TEXT_MENU"
  //   let _IS_TXN = false;

  //   currentParentIndex++

  //   sqlParent += generateEpjnNavigation({
  //     names: _NAME,
  //     labels: _LABEL,
  //     codes: _CODE,
  //     urls: _URL,
  //     isTxn: _IS_TXN,
  //     parent: _PARENT,
  //     ver: _VER,
  //     auth: _AUTH,
  //     order: _ORDER,
  //     auth_level: _AUTH_LEVEL
  //   })
  // }

  // console.log(sqlParent);
  // return;

  const str = `341050	Permohonan Perkahwinan	11000000
341060	Pengesahan Permohonan Perkahwinan	11000000
341100	Bayaran Permohonan Perkahwinan	01000000
341108	Pembatalan Bayaran Permohonan Perkahwinan	01000000
341450	Perakuan Perkahwinan	11000000
341400	Bayaran Perakuan Perkahwinan	01000000
341408	Pembatalan Bayaran Perakuan Perkahwinan	01000000
341550	Pendaftaran Perkahwinan	11000000
341500	Bayaran Pendaftaran Perkahwinan	01000000
341508	Pembatalan Pembayaran Perkahwinan	01000000
341560	Pengesahan Pendaftaran Perkahwinan	11100000
341650	Pertukaran Tempat Dan Tarikh Perkahwinan	11000000
342550	Pembatalan Permohonan Perkahwinan	11000000
342050	Permohonan Bantahan Perkahwinan	11000000
342000	Bayaran Permohonan Bantahan Perkahwinan	01000000
342008	Pembatalan Bayaran Permohonan Bantahan Perkahwinan	01000000
342150	Kemaskini Keputusan Bantahan Perkahwinan	00110000
343150	Kemasukan Maklumat Perkahwinan  Dari Gereja/Kuil/Persatuan dan Kedutaan Malaysia Luar Negara	11000001
343100	Bayaran Permohonan Perkahwinan Di Gereja/Kuil/Persatuan	01000000
343108	Pembatalan Bayaran Permohonan Perkahwinan Di Gereja/Kuil/Persatuan	01000000
343160	Pengesahan Kemasukan Maklumat Perkahwinan  Dari Gereja/Kuil/Persatuan dan Kedutaan Malaysia Luar Negara 	11000001
343350	Pendaftaran Perkahwinan Luar Negara, Adat/Agama/Kelaziman dan Ordinan Pendaftaran Perkahwinan 1952	11000000
343300	Bayaran Pendaftaran Perkahwinan Luar Negara, Adat/Agama/Kelaziman dan Ordinan Pendaftaran Perkahwinan 1952	01000000
343308	Pembatalan Bayaran Pendaftaran Perkahwinan Luar Negara, Adat/Agama/Kelaziman dan Ordinan Pendaftaran Perkahwinan 1952	01000000
343360	Pengesahan Pendaftaran Perkahwinan Luar Negara, Adat/Agama/Kelaziman dan Ordinan Pendaftaran Perkahwinan 1952	11100000
343650	Pendaftaran Semula Perkahwinan Seksyen 46B	00000001
343660	Pengesahan Pendaftaran Semula Perkahwinan Seksyen 46B	00000001
343950	Kemaskini Rekod Tangguh 	11100000
349550	Pengesahan Rekod Perkahwinan	00110000
345350	Pengujudan Rekod Perkahwinan	11100000
345360	Pengesahan Pengujudan Rekod Perkahwinan	11100000
344050	Permohonan Pembetulan Kesilapan Daftar Perkahwinan (Fakta)	11000000
344000	Bayaran Permohonan Pembetulan Kesilapan Daftar Perkahwinan (Fakta)	01000000
344008	Pembatalan Bayaran Permohonan Pembetulan Kesilapan Daftar Perkahwinan (Fakta)	01000000
344150	Kelulusan Permohonan Pembetulan Kesilapan Daftar Perkahwinan (Fakta)	00000001
344200	Bayaran Kelulusan Permohonan Pembetulan Kesilapan Daftar Perkahwinan (Fakta)	01000000
344208	Pembatalan Bayaran Kelulusan Permohonan Pembetulan Kesilapan Daftar Perkahwinan (Fakta)	01000000
344250	Cetakan Maklumat Pembetulan Pada Daftar Asal Perkahwinan	11000000
344350	Permohonan Pembetulan Kesilapan Daftar Perkahwinan (Perkeranian)	11000000
344300	Bayaran Permohonan Pembetulan Kesilapan Daftar Perkahwinan (Perkeranian)	01000000
344308	Pembatalan Bayaran Permohonan Pembetulan Kesilapan Daftar Perkahwinan (Perkeranian)	01000000
344360	Pengesahan Permohonan Pembetulan Kesilapan Daftar Perkahwinan (Perkeranian)	11000000
345050	Permohonan Cabutan Daftar Perkahwinan	11000000
345000	Bayaran Permohonan Cabutan Daftar Perkahwinan	01000000
345008	Pembatalan Bayaran Permohonan Cabutan Daftar Perkahwinan	01000000
345060	Pengesahan Permohonan Cabutan Daftar Perkahwinan	00100000
345150	Permohonan Carian Daftar Perkahwinan	11000000
345100	Bayaran Permohonan Carian Daftar Perkahwinan	01000000
345108	Pembatalan Bayaran Permohonan Carian Daftar Perkahwinan	01000000
345250	Kemaskini Keputusan Carian Daftar Perkahwinan	00100000
345650	Permohonan Pengesahan Taraf Perkahwinan	00000001
345600	Bayaran Permohonan Pengesahan Taraf Perkahwinan	01000000
345608	Pembatalan Bayaran Permohonan Pengesahan Taraf Perkahwinan	01000000
345660	Kemaskini Permohonan Pengesahan Taraf Perkahwinan	00000001
345750	Serahan Surat Pengesahan Taraf Perkahwinan	00000001
346150	Permohonan Tribunal Perkahwinan	11000000
346100	Bayaran Permohonan Tribunal Perkahwinan	01000000
346108	Pembatalan Bayaran Permohonan Tribunal Perkahwinan	01000000
346250	Cetakan Surat Panggilan Kaunseling	11000000
346350	Kemaskini Kehadiran Kaunseling	11000000
346450	Kemaskini Keputusan Tribunal	11000000
346400	Bayaran Kemaskini Keputusan Tribunal	01000000
346408	Pembatalan Bayaran Kemaskini Keputusan Tribunal	01000000
346550	Pendaftaran Perceraian/Pembatalan/Perintah	00000001
346560	Pengesahan Pendaftaran Perceraian/Pembatalan/Perintah	00000001
346650	Pendaftaran Perceraian (Perkahwinan Sebelum 1/3/1982)	00000001
347050	Pembatalan  Daftar dan Cetakan Semula Sijil Perkahwinan	00100000
347150	Cetakan Semula Sijil Perlantikan Pendaftar JPN/Penolong Pendaftar Ahli Tribunal/Badan Pendamai	00000001
347350	Cetakan Semula Surat Temujanji	11000000
347450	Cetakan Semula Perakuan Perkahwinan	11000000
347500	Bayaran Cetakan Semula Surat Pengesahan Perceraian/Pembatalan Perkahwinan (JPN.KC32) 	01000000
347508	Pembatalan Bayaran Cetakan Semula Surat Pengesahan Perceraian/Pembatalan Perkahwinan (JPN.KC32) 	01000000
347550	Cetakan Semula Surat Pengesahan Perceraian/Pembatalan Perkahwinan (JPN.KC32) 	00000001
347650	Cetakan Surat Akuan Terima/Kuiri/Keputusan	11000000
347750	Cetakan Semula Validasi Borang Permohonan	11000000
347850	Cetakan Semula Semakan Daftar Perkahwinan	11000000
347950	Permohonan Salinan Perakuan Tribunal	11000000
347900	Bayaran Permohonan Salinan Perakuan Tribunal	01000000
347908	Pembatalan Bayaran Permohonan Salinan Perakuan Tribunal	01000000
349010	Cetakan Semula Resit Bayaran  01000000
348050	Pendaftaran Organisasi Penolong Pendaftar	00000001
348150	Permohonan Perlantikan Penolong Pendaftar	00000001
348160	Pengesahan Permohonan Perlantikan Penolong Pendaftar	00000001
348250	Perlantikan Pendaftar JPN/Penolong Pendaftar 	00000001
348350	Perlantikan Ahli Tribunal/Badan Pendamai/Pendaftar Kedutaan	00000001
348750	Pertanyaan Maklumat Pemohon	11100000
348850	Pertanyaan Imej Dari AFIS	11100000
348950	Keputusan Pertanyaan Imej Dari AFIS	11100000
349050	Pelupusan Rekod Perkahwinan	00111001
349150	Selenggara Data Perkahwinan	00010000
349250	Selenggara Taraf/Status Perkahwinan	00110011
349350	Selenggara Maklumat Tribunal	11100000
415034	Senarai Urusniaga Kemasukkan Maklumat Perkahwinan	11100000
349850	Penyelenggaraan No. Daftar dan No. Siri Sijil	00110000`;

  let modulesStr = `2-SKC_03	perkahwinan-dan-penceraian-ejpn-kemasukan-maklumat-perkahwinan	343150	KEMASUKAN MAKLUMAT PERKAHWINAN
  2-SKC_03	perkahwinan-dan-penceraian-ejpn-kemasukan-maklumat-perkahwinan	343160	KEMASUKAN MAKLUMAT PERKAHWINAN
  2-SKC_03	perkahwinan-dan-penceraian-ejpn-kemasukan-maklumat-perkahwinan	343100	KEMASUKAN MAKLUMAT PERKAHWINAN
  2-SKC_03	perkahwinan-dan-penceraian-ejpn-kemasukan-maklumat-perkahwinan	343108	KEMASUKAN MAKLUMAT PERKAHWINAN
  2-SKC_03	perkahwinan-dan-penceraian-ejpn-kemasukan-maklumat-perkahwinan	343350	KEMASUKAN MAKLUMAT PERKAHWINAN
  2-SKC_03	perkahwinan-dan-penceraian-ejpn-kemasukan-maklumat-perkahwinan	343360	KEMASUKAN MAKLUMAT PERKAHWINAN
  2-SKC_03	perkahwinan-dan-penceraian-ejpn-kemasukan-maklumat-perkahwinan	343300	KEMASUKAN MAKLUMAT PERKAHWINAN
  2-SKC_03	perkahwinan-dan-penceraian-ejpn-kemasukan-maklumat-perkahwinan	343308	KEMASUKAN MAKLUMAT PERKAHWINAN
  2-SKC_03	perkahwinan-dan-penceraian-ejpn-kemasukan-maklumat-perkahwinan	343650	KEMASUKAN MAKLUMAT PERKAHWINAN
  2-SKC_03	perkahwinan-dan-penceraian-ejpn-kemasukan-maklumat-perkahwinan	343660	KEMASUKAN MAKLUMAT PERKAHWINAN
  2-SKC_04	perkahwinan-dan-penceraian-ejpn-pengujudan-rekod-dan-kemaskini-rekod-tangguh	349550	PENGUJUDAN REKOD DAN KEMASKINI REKOD TANGGUH
  2-SKC_04	perkahwinan-dan-penceraian-ejpn-pengujudan-rekod-dan-kemaskini-rekod-tangguh	345350	PENGUJUDAN REKOD DAN KEMASKINI REKOD TANGGUH
  2-SKC_04	perkahwinan-dan-penceraian-ejpn-pengujudan-rekod-dan-kemaskini-rekod-tangguh	345360	PENGUJUDAN REKOD DAN KEMASKINI REKOD TANGGUH
  2-SKC_06	perkahwinan-dan-penceraian-ejpn-cabutan-dan-carian	345050	CABUTAN DAN CARIAN
  2-SKC_06	perkahwinan-dan-penceraian-ejpn-cabutan-dan-carian	345000	CABUTAN DAN CARIAN
  2-SKC_06	perkahwinan-dan-penceraian-ejpn-cabutan-dan-carian	345008	CABUTAN DAN CARIAN
  2-SKC_06	perkahwinan-dan-penceraian-ejpn-cabutan-dan-carian	345060	CABUTAN DAN CARIAN
  2-SKC_06	perkahwinan-dan-penceraian-ejpn-cabutan-dan-carian	345150	CABUTAN DAN CARIAN
  2-SKC_06	perkahwinan-dan-penceraian-ejpn-cabutan-dan-carian	345100	CABUTAN DAN CARIAN
  2-SKC_06	perkahwinan-dan-penceraian-ejpn-cabutan-dan-carian	345108	CABUTAN DAN CARIAN
  2-SKC_06	perkahwinan-dan-penceraian-ejpn-cabutan-dan-carian	345250	CABUTAN DAN CARIAN
  2-SKC_07	perkahwinan-dan-penceraian-ejpn-surat-pengesahan-taraf-perkahwinan	345650	SURAT PENGESAHAN TARAF PERKAHWINAN
  2-SKC_07	perkahwinan-dan-penceraian-ejpn-surat-pengesahan-taraf-perkahwinan	345600	SURAT PENGESAHAN TARAF PERKAHWINAN
  2-SKC_07	perkahwinan-dan-penceraian-ejpn-surat-pengesahan-taraf-perkahwinan	345608	SURAT PENGESAHAN TARAF PERKAHWINAN
  2-SKC_07	perkahwinan-dan-penceraian-ejpn-surat-pengesahan-taraf-perkahwinan	345660	SURAT PENGESAHAN TARAF PERKAHWINAN
  2-SKC_07	perkahwinan-dan-penceraian-ejpn-surat-pengesahan-taraf-perkahwinan	345750	SURAT PENGESAHAN TARAF PERKAHWINAN
  2-SKC_09	perkahwinan-dan-penceraian-ejpn-cetakan	347150	CETAKAN
  2-SKC_09	perkahwinan-dan-penceraian-ejpn-cetakan	347650	CETAKAN
  2-SKC_10	perkahwinan-dan-penceraian-ejpn-penolong-pendaftar-ahli-tribunal-pendaftar-kedutaan	348050	PENOLONG PENDAFTAR/AHLI TRIBUNAL/PENDAFTAR KEDUTAAN
  2-SKC_10	perkahwinan-dan-penceraian-ejpn-penolong-pendaftar-ahli-tribunal-pendaftar-kedutaan	348150	PENOLONG PENDAFTAR/AHLI TRIBUNAL/PENDAFTAR KEDUTAAN
  2-SKC_10	perkahwinan-dan-penceraian-ejpn-penolong-pendaftar-ahli-tribunal-pendaftar-kedutaan	348160	PENOLONG PENDAFTAR/AHLI TRIBUNAL/PENDAFTAR KEDUTAAN
  2-SKC_10	perkahwinan-dan-penceraian-ejpn-penolong-pendaftar-ahli-tribunal-pendaftar-kedutaan	348250	PENOLONG PENDAFTAR/AHLI TRIBUNAL/PENDAFTAR KEDUTAAN
  2-SKC_10	perkahwinan-dan-penceraian-ejpn-penolong-pendaftar-ahli-tribunal-pendaftar-kedutaan	348350	PENOLONG PENDAFTAR/AHLI TRIBUNAL/PENDAFTAR KEDUTAAN
  2-SKC_13	perkahwinan-dan-penceraian-ejpn-laporan	415034	SPC`;

  let MODS = {}
  let TXNS = {};

  let modules = modulesStr.split("\n");
  for (var i in modules) {
    let r = modules[i];
    let arr = r.split("\t");
    let parentOrder = arr[0]
    parentOrder = parentOrder.split("_");
    let order = `3-SKC_${parentOrder[1]}_CH`;
    let parent = arr[1]
    let txnCode = arr[2]

    // console.log("order", order);
    // console.log("parent", parent);
    // console.log("txnCode", txnCode);
    MODS["T" + txnCode] = {
      code: txnCode,
      parent: parent,
      order: order
    };
  }

  let txnsArr = str.split("\n");
  for (var i in txnsArr) {
    let r = txnsArr[i];
    let arr = r.split("\t");
    let txnCode = arr[0]
    let label = arr[1]
    let auth = arr[2]
    TXNS[txnCode] = {
      label: label,
      auth: auth
    };
  }
  console.log("MODS", MODS);
  console.log("TXNS", TXNS);

  let sql = "";
  for (var key in MODS) {
    let obj1 = MODS[key];
    let txnCode = obj1.code;
    let txnObj = TXNS[txnCode];
    let _CODE = txnCode;
    let _LABEL = txnCode + " - " + txnObj.label;
    let _PARENT = obj1.parent;
    let _NAME = getNameFromLabel(txnObj.label) + "-" + _CODE;
    let _IS_TXN = true;
    let _ORDER = obj1.order;
    let _AUTH = txnObj.auth
    let _URL = undefined;

    sql += generateEpjnNavigation({
      names: _NAME,
      labels: _LABEL,
      codes: _CODE,
      urls: _URL,
      isTxn: _IS_TXN,
      parent: _PARENT,
      ver: _VER,
      auth: _AUTH,
      order: _ORDER,
      auth_level: _AUTH_LEVEL
    })
  }

  console.log(sql);
  return;
}


export function Main() {
  const str =
    `PENERIMAAN PERMOHONAN	
	  L	1	Penerimaan Permohonan Pengangkatan	385010
		L	1	Penerimaan Permohonan Pindaan Maklumat Pengangkatan	385012
  PENDAFTARAN PENGANGKATAN MAHKAMAH	
	  L	2	Pendaftaran Pengangkatan Mahkamah	382050
	  L	3	Pengesahan Pendaftaran Pengangkatan Mahkamah	382060
	  L	4	Cetakan Sijil Pendaftaran Pengangkatan Mahkamah	382070
  PENDAFTARAN PENGANGKATAN DE FACTO	
	  B	2	Permohonan Pengangkatan De Facto	381050
	  B	3	Pengesahan dan Kemaskini Keputusan Prosiding 	381060
	  B	6	Pendaftaran Pengangkatan De Facto 	381250
  PINDAAN MAKLUMAT PENGANGKATAN MAHKAMAH	
	  L	2	Permohonan Pindaan Maklumat Pengangkatan Mahkamah (Kesilapan Fakta)	383250
	  L	3	Pengesahan Pindaan Maklumat Pengangkatan Semula Mahkamah (Kesilapan Fakta)	383260
	  L	4	Cetakan Sijil Pindaan Maklumat Pengangkatan Mahkamah	383270
  PINDAAN MAKLUMAT PENGANGKATAN DE FACTO	
	  B	4	Permohonan Pindaan Maklumat Pengangkatan De Facto	383150
	  B	5	Pengesahan Pindaan Maklumat Pengangkatan De Facto	383160
	  B	6	Cetakan Sijil Pindaan Maklumat Pengangkatan De Facto	383170
  CABUTAN	
	  L	1	Permohonan Cabutan Sijil Pengangkatan	384050
	  L	2	Pengesahan Cabutan Sijil Pengangkatan	384060
  SERAHAN	
	  B	1	Serahan Daftar Individu/MyKid	384850
  MyKid	
	  B	1	Pengeluaran MyKid Kali Pertama 	387050
	  B	2	Pembatalan Permohonan  Mykid 	386550
	  B	3	Gantian MyKid 	386650
	  B	4	Pertanyaan Dan Cetakan Maklumat Cip Mykid	386850
  PENGUJUDAN DAN KEMASKINI REKOD
	  B	2	Pengujudan Rekod 	384350
	  B	3	Kemaskini Pengujudan Rekod 	384550
  PEMBATALAN DAN PELUPUSAN 	
	  B	1	Pembatalan Pengangkatan	386250
	  B	2	Pelupusan Rekod 	386050
  PENYELENGGARAAN DAN PEMBATALAN	
	  L	1	Selenggara Nombor Siri Sijil Pengangkatan	386150
	  L	2	Pembatalan Daftar dan Cetakan Semula Sijil Pengangkatan	385150
  PENUKARAN DE FACTO KEPADA MAHKAMAH	
	  B	1	Penerimaan Permohonan Penukaran Pengangkatan De Facto Kepada Pengangkatan Mahkamah	385042
	  B	2	Penukaran Pengangkatan De Facto kepada Pengangkatan Mahkamah 	382150
	  B	3	Pengesahan Penukaran Pengangkatan De Facto kepada Pengangkatan Mahkamah	382160
  PENDAFTARAN PENGANGKATAN SEMULA	
	  B	1	Penerimaan Pengangkatan Semula Melalui Perintah Mahkamah	385046
	  B	2	Pendaftaran Pengangkatan Semula Melalui Perintah Mahkamah 	382350
	  B	3	Pengesahan Pendaftaran Pengangkatan Semula Mahkamah 	382360
	  B	4	Cetakan Semula Sijil Pengangkatan Semula	382370
  CARIAN	
	  B	1	Penerimaan Permohonan Carian	385036
	  B	2	Permohonan Carian	384150
	  B	3	Pembetulan Permohonan Carian	384156
	  B	4	Kemaskini Keputusan  Carian	384250
  BAYARAN	
	  B	1	Bayaran Pendaftaran Pengangkatan Mahkamah	382000
	  B	2	Pembatalan Bayaran Pendaftaran Mahkamah 	382008
	  B	3	Bayaran Pendaftaran Pengangkatan De Facto 	381200
	  B	4	Pembatalan Bayaran Pendaftaran De Facto 	381208
	  B	5	Bayaran Permohonan Pindaan Maklumat Pengangkatan Mahkamah	383000
	  B	6	Pembatalan Bayaran  Permohonan Pindaan Maklumat Pengangkatan Mahkamah	383008
	  B	7	Bayaran Permohonan Pindaan Maklumat Pengangkatan De Facto	383100
	  B	8	Pembatalan Bayaran  Permohonan Pindaan Maklumat Pengangkatan De Facto	383108
	  B	9	Bayaran Cetakan Sijil Pindaan Maklumat Pengangkatan  De Facto	383300
	  B	10	Pembatalan Bayaran Cetakan Sijil Pindaan Maklumat Pengangkatan  De Facto	383308
	  B	11	Bayaran Cabutan	384000
	  B	12	Pembatalan Bayaran Cabutan	384008
	  B	13	Bayaran Permohonan Carian 	384100
	  B	14	Pembatalan Bayaran Permohonan Carian	384108
  CETAKAN SEMULA	
	  L	1	Cetakan Semula Notis Perakuan Penerimaan Permohonan Pengangkatan	385014
	  L	2	Cetakan Semula Notis Perakuan Penerimaan Pindaan Maklumat Pengangkatan	385016
	  L	3	Cetakan Semula Surat Makluman Kepada Mahkamah	385018
	  L	4	Cetakan Semula Surat Kepada Sesiapa Berkenaan	385020
	  L	5	Cetakan Semula Notis Bayaran Belum Diterima	385022
	  L	6	Cetakan Semula Notis Kutipan MyKid	385024
	  L	7	Cetakan Salinan Sah Daftar	385026
	  L	8	Cetakan Semula Validasi Borang	385028
	  L	9	Cetakan Semula Resit Bayaran	385030
	  B	10	Cetakan Semula Notis Keputusan Prosiding 	385032
	  B	11	Cetakan Semula Notis Keputusan Pindaan	385034
	  B	12	Cetakan Semula Notis Perakuan Penerimaan Permohonan Carian	385038
	  B	13	Cetakan Semula Notis Keputusan Pendaftaran Semula Rekod Hilang	385040
	  B	14	Cetakan Semula Notis Perakuan Penerimaan Pengangkatan De Facto Kepada Pengangkatan Mahkamah	385044
	  B	15	Cetakan Semula Notis  Penerimaan Pengangkatan Semula Perintah Mahkamah	385048
	  B	16	Cetakan Semula Semakan Carian	385050
	  B	17	Cetakan Semula Notis Keputusan Carian	385052`;

  let currentAuth = getCurrentAuth();

  let rows = str.split("\n");
  console.log(rows);
  let AllParents = {};
  let currentParent = "";
  let currentParentIndex = 0;
  var defaultAuth = "11100000"
  var parentParent = "pengangkatan-ejpn"

  let namesCheck = {};

  var _LABEL = "";
  var _NAME = "";
  var _CODE = "";
  var _PARENT = "";
  var _AUTH = "";
  var _ORDER = "";
  var _IS_TXN = null;
  var _URL = "";

  var _AUTH_LEVEL = "8";
  var _VER = "20190305161616"

  var indexParent = 0;
  let chSql = "";
  let parentSql = "";

  for (var i in rows) {
    let row = rows[i];
    let isParent = row.indexOf("\t") > 0 || row.indexOf("\t") <= -1;
    let sql = "";

    if (isParent) {
      indexParent++;
      currentParentIndex = indexParent < 10 ? "0" + indexParent : indexParent;

      row = row.replaceAll("\t", "");
      row = row.trim();

      _LABEL = row.capitalize();
      _NAME = parentParent + "-" + getNameFromLabel(_LABEL)
      _PARENT = parentParent;
      _CODE = "";
      _ORDER = `2-SAA_${currentParentIndex}`;
      _AUTH = "";
      _URL = "TEXT_MENU"
      _IS_TXN = false;

      AllParents[_NAME] = _LABEL;
      currentParent = _NAME;

      sql = generateEpjnNavigation({
        names: _NAME,
        labels: _LABEL,
        codes: _CODE,
        urls: _URL,
        isTxn: _IS_TXN,
        parent: _PARENT,
        ver: _VER,
        auth: _AUTH,
        order: _ORDER,
        auth_level: _AUTH_LEVEL
      })

    } else {
      let tempArr = row.split("\t");
      _CODE = tempArr[tempArr.length - 1];
      _LABEL = tempArr[tempArr.length - 2];
      _PARENT = currentParent;
      _NAME = getNameFromLabel(_LABEL) + "-" + _CODE;
      _IS_TXN = true;
      _ORDER = `3-SAA_${currentParentIndex}_CH`;
      _AUTH = typeof currentAuth[_CODE] === "undefined" ?
        defaultAuth :
        currentAuth[_CODE]

      sql = generateEpjnNavigation({
        names: _NAME,
        labels: _LABEL,
        codes: _CODE,
        urls: _URL,
        isTxn: _IS_TXN,
        parent: _PARENT,
        ver: _VER,
        auth: _AUTH,
        order: _ORDER,
        auth_level: _AUTH_LEVEL
      })
    }

    if (isParent) {
      parentSql += sql;
    } else {
      chSql += sql;
    }

    // if (_NAME == "bayaran-pendaftaran-pengangkatan-de-facto-") {
    //   console.log(sql)
    // }

    if (typeof namesCheck[_NAME] === "undefined") {
      namesCheck[_NAME] = 0;
    }
    namesCheck[_NAME]++;
  }


  let nameCheckMoreThanOne = {};
  for (var k in namesCheck) {
    if (namesCheck[k] > 1) {
      nameCheckMoreThanOne[k] = namesCheck[k];
    }
  }
  console.log("nameCheckMoreThanOne", nameCheckMoreThanOne)
  console.log("AllParents", AllParents)
  console.log(parentSql + chSql)
  // end Main
}


export function getCurrentAuth() {

  let str = `	385010	11000000
	382050	11000000
	382060	00100000
	382070	11000000
	382000	01000000
	382008	01000000
	384850	11000000
	385012	11000000
	383250	11000000
	383260	00100000
	383270	00100000
	383000	01000000
	383008	01000000
	384050	11000000
	384060	00100000
	384000	01000000
	384008	01000000
	386150	00100000
	385150	11000000
	385014	11000000
	385016	11000000
	385018	11000000
	385020	11000000
	385022	11000000
	385024	11000000
	385026	11000000
	385028	11000000
	385030	11000000
	385032	11000000
	385034	11000000
	385038	11000000
	385040	11000000
	385044	11000000
	385048	11000000
	385050	11000000
	385052	11000000 `;

  let toRet = {};
  let arr = str.split("\n");
  for (var i in arr) {
    let row = arr[i];
    let rowArr = row.split("\t");
    let code = rowArr[rowArr.length - 2];
    let auth = rowArr[rowArr.length - 1];
    auth = auth.trim();
    toRet[code] = auth;
  }
  console.log(toRet);
  return toRet;
}

export function getNameFromLabel(label) {
  label = label.replaceAll("/", "-");
  label = label.toLowerCase();
  let arr = label.split(" ");
  let toRet = "";
  for (var i in arr) {
    if (arr[i] == "") {
      continue;
    }
    if (i > 0) {
      toRet += "-";
    }
    toRet += arr[i]
  }

  return toRet;
}


export function generateEpjnNavigation({
  names,
  labels,
  codes,
  urls,
  isTxn,
  parent,
  ver,
  auth,
  order,
  auth_level,
}) {

  if (!Array.isArray(names)) {
    names = [names];
  }
  if (!Array.isArray(codes)) {
    codes = [codes];
  }
  if (!Array.isArray(labels)) {
    labels = [labels];
  }
  if (!Array.isArray(urls)) {
    urls = [urls];
  }
  //   let labels = [
  //     `Cetakan Semula Notis Keputusan Prosiding`,
  //     `Cetakan Semula Notis Keputusan Pindaan`,
  //     `Cetakan Semula Notis Perakuan Penerimaan Permohonan Carian`,
  //     `Cetakan Semula Notis Keputusan Pendaftaran Semula Rekod Hilang`,
  //     `Cetakan Semula Notis Perakuan Penerimaan Pengangkatan De Facto Kepada Pengangkatan Mahkamah`,
  //     `Cetakan Semula Notis Penerimaan Pengangkatan Semula Perintah Mahkamah`,
  //     `Cetakan Semula Semakan Carian`,
  //     `Cetakan Semula Notis Keputusan Carian`,
  //   ]

  //   let codes = [
  //     385032,
  //     385034,
  //     385038,
  //     385040,
  //     385044,
  //     385048,
  //     385050,
  //     385052,
  //   ]

  //   let isTxn = true; // akan generate /transaction/T<code>
  //   let parent = "pengangkatan-ejpn-cetakan";
  //   let ver = "20190305161615"
  //   let auth = "11000000";
  //   let order = '3-SAA_5_CH'
  //   let auth_level = '8'

  let sql = "";
  for (var i in labels) {
    let label = labels[i]
    //let name = getNameFromLabel(label); //cetakan-semula-resit-bayaran
    let name = names[i]
    let code = codes[i];
    let url = isTxn ? `/transaction/T${code}` : urls[i];
    sql += `
		INSERT INTO JPNCFG.dbo.EJPN_NAVIGATION (   
			NAVI_NAME, 
			NAVI_LABEL, 
			NAVI_CODE, 
			NAVI_AUTH, 
			NAVI_URL, 
			NAVI_PARENT_NAME, 
			NAVI_VER, 
			NAVI_AUTH_LEVEL, 
			NAVI_ORDER
		)
		VALUES(
		  '${name}', 
		  '${label}', 
		  '${code}', 
		  '${auth}', 
		  '${url}', 
		  '${parent}', 
		  '${ver}', 
		  '${auth_level}', 
		  '${order}'
		); \n`;

  }
  return sql;
}

/**

const str =
    `PENDAFTARAN PENGANGKATAN MAHKAMAH	
	  L	1	Penerimaan Permohonan Pengangkatan	385010
	  L	2	Pendaftaran Pengangkatan Mahkamah	382050
	  L	3	Pengesahan Pendaftaran Pengangkatan Mahkamah	382060
	  L	4	Cetakan Sijil Pendaftaran Pengangkatan Mahkamah	382070
	  L	5	Bayaran Pendaftaran Pengangkatan Mahkamah	382000
	  L	6	Pembatalan Bayaran Pendaftaran Pengangkatan Mahkamah	382008
  PENDAFTARAN PENGANGKATAN DE FACTO	
	  B	1	Penerimaan Permohonan Pengangkatan	385010
	  B	2	Permohonan Pengangkatan De Facto	381050
	  B	3	Pengesahan dan Kemaskini Keputusan Prosiding 	381060
	  B	4	Bayaran Pendaftaran Pengangkatan De Facto 	381200
	  B	5	Pembatalan Bayaran Pendaftaran De Facto 	381208
	  B	6	Pendaftaran Pengangkatan De Facto 	381250
  PINDAAN MAKLUMAT PENGANGKATAN MAHKAMAH	
	  L	1	Penerimaan Permohonan Pindaan Maklumat Pengangkatan	385012
	  L	2	Permohonan Pindaan Maklumat Pengangkatan Mahkamah (Kesilapan Fakta)	383250
	  L	3	Pengesahan Pindaan Maklumat Pengangkatan Semula Mahkamah (Kesilapan Fakta)	383260
	  L	4	Cetakan Sijil Pindaan Maklumat Pengangkatan Mahkamah	383270
	  L	5	Bayaran Pindaan Maklumat Pengangkatan Mahkamah	383000
	  L	6	Pembatalan Bayaran Pindaan Maklumat Pengangkatan Mahkamah	383008
  PINDAAN MAKLUMAT PENGANGKATAN DE FACTO	
	  B	1	Penerimaan Permohonan Pindaan Maklumat Pengangkatan	385012
	  B	2	Bayaran Permohonan Pindaan Maklumat Pengangkatan De Facto	383100
	  B	3	Pembatalan Bayaran  Permohonan Pindaan Maklumat Pengangkatan De Facto	383108
	  B	4	Permohonan Pindaan Maklumat Pengangkatan De Facto	383150
	  B	5	Pengesahan Pindaan Maklumat Pengangkatan De Facto	383160
	  B	6	Cetakan Sijil Pindaan Maklumat Pengangkatan De Facto	383170
	  B	7	Bayaran Cetakan Sijil Pindaan Maklumat Pengangkatan De Facto	383300
	  B	8	Pembatalan Bayaran Cetakan Sijil Pindaan Maklumat Pengangkatan  De Facto	383308
  CABUTAN	
	  L	1	Permohonan Cabutan Sijil Pengangkatan	384050
	  L	2	Pengesahan Cabutan Sijil Pengangkatan	384060
	  L	3	Bayaran Permohonan Cabutan	384000
	  L	4	Pembatalan Bayaran Permohonan Cabutan	384008
  SERAHAN	
	  B	1	Serahan Daftar Individu/MyKid	384850
  MyKid	
	  B	1	Pengeluaran MyKid Kali Pertama 	387050
	  B	2	Pembatalan Permohonan  Mykid 	386550
	  B	3	Gantian MyKid 	386650
	  B	4	Pertanyaan Dan Cetakan Maklumat Cip Mykid	386850
  PENGUJUDAN DAN KEMASKINI REKOD
	  B	1	Penerimaan Permohonan Pengangkatan (Pengujudan Rekod)	385010
	  B	2	Pengujudan Rekod 	384350
	  B	3	Kemaskini Pengujudan Rekod 	384550
  PEMBATALAN DAN PELUPUSAN 	
	  B	1	Pembatalan Pengangkatan	386250
	  B	2	Pelupusan Rekod 	386050
  PENYELENGGARAAN DAN PEMBATALAN	
	  L	1	Selenggara Nombor Siri Sijil Pengangkatan	386150
	  L	2	Pembatalan Daftar dan Cetakan Semula Sijil Pengangkatan	385150
  PENUKARAN DE FACTO KEPADA MAHKAMAH	
	  B	1	Penerimaan Permohonan Penukaran Pengangkatan De Facto Kepada Pengangkatan Mahkamah	385042
	  B	2	Penukaran Pengangkatan De Facto kepada Pengangkatan Mahkamah 	382150
	  B	3	Pengesahan Penukaran Pengangkatan De Facto kepada Pengangkatan Mahkamah	382160
  PENDAFTARAN PENGANGKATAN SEMULA	
	  B	1	Penerimaan Pengangkatan Semula Melalui Perintah Mahkamah	385046
	  B	2	Pendaftaran Pengangkatan Semula Melalui Perintah Mahkamah 	382350
	  B	3	Pengesahan Pendaftaran Pengangkatan Semula Mahkamah 	382360
	  B	4	Cetakan Semula Sijil Pengangkatan Semula	382370
  CARIAN	
	  B	1	Penerimaan Permohonan Carian	385036
	  B	2	Permohonan Carian	384150
	  B	3	Pembetulan Permohonan Carian	384156
	  B	4	Kemaskini Keputusan  Carian	384250
	  B	5	Bayaran Permohonan Carian 	384100
	  B	6	Pembatalan Bayaran Permohonan Carian	384108
  BAYARAN	
	  B	1	Bayaran Pendaftaran Pengangkatan Mahkamah	382000
	  B	2	Pembatalan Bayaran Pendaftaran Mahkamah 	382008
	  B	3	Bayaran Pendaftaran Pengangkatan De Facto 	381200
	  B	4	Pembatalan Bayaran Pendaftaran De Facto 	381208
	  B	5	Bayaran Permohonan Pindaan Maklumat Pengangkatan Mahkamah	383000
	  B	6	Pembatalan Bayaran  Permohonan Pindaan Maklumat Pengangkatan Mahkamah	383008
	  B	7	Bayaran Permohonan Pindaan Maklumat Pengangkatan De Facto	383100
	  B	8	Pembatalan Bayaran  Permohonan Pindaan Maklumat Pengangkatan De Facto	383108
	  B	9	Bayaran Cetakan Sijil Pindaan Maklumat Pengangkatan  De Facto	383300
	  B	10	Pembatalan Bayaran Cetakan Sijil Pindaan Maklumat Pengangkatan  De Facto	383308
	  B	11	Bayaran Cabutan	384000
	  B	12	Pembatalan Bayaran Cabutan	384008
	  B	13	Bayaran Permohonan Carian 	384100
	  B	14	Pembatalan Bayaran Permohonan Carian	384108
  CETAKAN SEMULA	
	  L	1	Cetakan Semula Notis Perakuan Penerimaan Permohonan Pengangkatan	385014
	  L	2	Cetakan Semula Notis Perakuan Penerimaan Pindaan Maklumat Pengangkatan	385016
	  L	3	Cetakan Semula Surat Makluman Kepada Mahkamah	385018
	  L	4	Cetakan Semula Surat Kepada Sesiapa Berkenaan	385020
	  L	5	Cetakan Semula Notis Bayaran Belum Diterima	385022
	  L	6	Cetakan Semula Notis Kutipan MyKid	385024
	  L	7	Cetakan Salinan Sah Daftar	385026
	  L	8	Cetakan Semula Validasi Borang	385028
	  L	9	Cetakan Semula Resit Bayaran	385030
	  B	10	Cetakan Semula Notis Keputusan Prosiding 	385032
	  B	11	Cetakan Semula Notis Keputusan Pindaan	385034
	  B	12	Cetakan Semula Notis Perakuan Penerimaan Permohonan Carian	385038
	  B	13	Cetakan Semula Notis Keputusan Pendaftaran Semula Rekod Hilang	385040
	  B	14	Cetakan Semula Notis Perakuan Penerimaan Pengangkatan De Facto Kepada Pengangkatan Mahkamah	385044
	  B	15	Cetakan Semula Notis  Penerimaan Pengangkatan Semula Perintah Mahkamah	385048
	  B	16	Cetakan Semula Semakan Carian	385050
	  B	17	Cetakan Semula Notis Keputusan Carian	385052`;

 */

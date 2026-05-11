// Wa-modern design tokens
const W = {
  // light
  paper: '#F4EEE2',          // washi
  paper2: '#EBE3D2',
  ink: '#1A1410',
  ink2: '#3D2F23',
  inkMute: '#6B5A48',
  hairline: 'rgba(26,20,16,0.10)',

  // dark
  sumi: '#13100E',           // 墨
  sumi2: '#1E1915',
  sumi3: '#2A231D',
  bone: '#F0E6D2',           // text on dark
  boneMute: 'rgba(240,230,210,0.55)',
  hairlineD: 'rgba(240,230,210,0.10)',

  // brand
  crimson: '#7A1B26',        // 深紅
  crimsonD: '#5A1019',
  crimsonL: '#A52A38',
  gold: '#C9A14B',           // 金
  goldL: '#E6C77A',
  pine: '#1F3A2E',           // 深緑
  ind: '#2C4257',            // 藍墨

  // stores (4)
  gochi: '#C9A14B',          // 金 (ごち)
  dosu:  '#A52A38',          // 朱 (どす)
  goro:  '#2C5F4B',          // 緑青 (ごろ)
  uo:    '#3A5275',          // 藍 (うお)
};

// store list (shared)
const STORES = [
  { id: 'gochi', name: 'ごち',  kana: 'GO-CHI', color: W.gochi },
  { id: 'dosu',  name: 'どす',  kana: 'DO-SU',  color: W.dosu  },
  { id: 'goro',  name: 'ごろ',  kana: 'GO-RO',  color: W.goro  },
  { id: 'uo',    name: 'うお',  kana: 'U-O',    color: W.uo    },
];

const STAFF = [
  { id: 's01', name: '結城 蓮',   nick: 'れん',  avatar: '蓮' },
  { id: 's02', name: '橘 颯真',   nick: 'そうま', avatar: '颯' },
  { id: 's03', name: '神楽 樹',   nick: 'いつき', avatar: '樹' },
  { id: 's04', name: '霧島 律',   nick: 'りつ',  avatar: '律' },
  { id: 's05', name: '時雨 葵',   nick: 'あおい', avatar: '葵' },
  { id: 's06', name: '宵宮 朔',   nick: 'さく',  avatar: '朔' },
  { id: 's07', name: '夜霧 玲',   nick: 'れい',  avatar: '玲' },
  { id: 's08', name: '緋村 蒼介', nick: 'そう',  avatar: '蒼' },
];

const yen = (n) => '¥' + Math.round(n).toLocaleString('ja-JP');
const yenK = (n) => {
  if (n >= 10000) return (n/10000).toFixed(n>=100000?0:1) + '万';
  return '¥' + Math.round(n).toLocaleString();
};

// inline fonts
const FSERIF = '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif';
const FSANS  = '"Noto Sans JP", -apple-system, system-ui, sans-serif';
const FMONO  = '"JetBrains Mono", ui-monospace, "SF Mono", monospace';

Object.assign(window, { W, STORES, STAFF, yen, yenK, FSERIF, FSANS, FMONO });

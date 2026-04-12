import { kalamboliCollege } from './colleges/kalamboli.js';
import { kamotheCollege } from './colleges/kamothe.js';
import { nerulCollege } from './colleges/nerul.js';
import { sambhajinagarCollege } from './colleges/sambhajinagar.js';
import { vashiCollege } from './colleges/vashi.js';
import { dyPatilPuneCollege } from './colleges/dyPatilPune.js';
import { dyPatilNerulCollege } from './colleges/dyPatilNerul.js';
import { ternaNerulCollege } from './colleges/ternaNerul.js';
import { collegeThemePresets } from './colleges/themePresets.js';

export { collegeThemePresets };

export const collegePreviewData = {
  "kalamboli": { ...kalamboliCollege, theme: collegeThemePresets[kalamboliCollege.themeKey] },
  "kamothe": { ...kamotheCollege, theme: collegeThemePresets[kamotheCollege.themeKey] },
  "nerul": { ...nerulCollege, theme: collegeThemePresets[nerulCollege.themeKey] },
  "sambhajinagar": { ...sambhajinagarCollege, theme: collegeThemePresets[sambhajinagarCollege.themeKey] },
  "vashi": { ...vashiCollege, theme: collegeThemePresets[vashiCollege.themeKey] },
  "dy-patil-pune": { ...dyPatilPuneCollege, theme: collegeThemePresets[dyPatilPuneCollege.themeKey] },
  "dy-patil-nerul": { ...dyPatilNerulCollege, theme: collegeThemePresets[dyPatilNerulCollege.themeKey] },
  "terna-nerul": { ...ternaNerulCollege, theme: collegeThemePresets[ternaNerulCollege.themeKey] }
};

import pkg from '../package.json';

/** Installed version of @mbsmart/ui */
export const version = pkg.version;

// Announce the loaded library version once (ES modules evaluate a single time,
// so importing this from multiple entry barrels still logs only once).
console.log('@mbsmart/ui version:', version);

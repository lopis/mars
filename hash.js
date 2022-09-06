/**
 * Returns a hash code from a string
 * @param  {String} str The string to hash.
 * @return {Number}    A 32bit integer
 * @see https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 */
function hashCode(str) {
  return Array.from(str)
  .reduce((hash, char) => 0 | (31 * hash + char.charCodeAt(0)), 0);
}

const pwd = process.argv.slice(2)[0]
if (!pwd) {
  console.error('Missing password as a parameter.\nUsage: hash.js correctHorseBatteryStaple');
  return 1
}

console.log(hashCode(pwd));
return 0
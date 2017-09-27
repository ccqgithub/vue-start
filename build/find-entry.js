const path = require('path');
const fs = require('fs');

/**
 * [findEntry description]
 * @param  Object conf: contextPath, entryPath, group(fn)
 * @return Object
 * {
 *   entries: [],
 *   entryGroups: {
 *     react: [],
 *     vue: [],
 *     main: [],
 *   }
 * }
 */
module.exports = function findEntry(conf) {
  let contextPath = conf.contextPath;
  let entryPath = conf.entryPath;
  let group = conf.group;
  let files = [];

  // find all entry files fo `files`
  walk(entryPath, files);

  let entryGroups = {};

  files.forEach(file => {
    let groupName = group(file) || 'main';

    if (!entryGroups[groupName]) entryGroups[groupName] = [];

    entryGroups[groupName].push(file);
  });

  // 遍历文件夹搜寻 entry 文件
  function walk(p, files = []) {
    let dirList = fs.readdirSync(p);

    dirList.forEach((item) => {
      let sPath = path.join(p, item);
      let stat = fs.lstatSync(sPath);

      if (stat.isDirectory()) {
        walk(sPath, files);
      } else if (stat.isFile()) {
        files.push(path.relative(contextPath, sPath));
      }
    });
  }

  return {entries: files, entryGroups: entryGroups};
}

import _ from 'lodash';

const createColorKey = (mappings) => {
  const colorMap = {};
  Object.keys(mappings).forEach(pathStr => {
    try {
      colorMap[pathStr] = mappings[pathStr].color;
      colorMap[mappings[pathStr].path]= mappings[pathStr].color;
    } catch (e) {
      console.log(e.message);
    }
  });
  return colorMap;
}

export default createColorKey;

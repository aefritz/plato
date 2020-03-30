import _ from 'lodash';

const removeOrigin = (path) => {
  return path.replace(/^(source|output)\./, '');
}

const processObject = (obj, mappings) => {
  const container = {};
  Object.keys(mappings).forEach(mapping => {
      const preppedPath = removeOrigin(mapping);
      const preppedTargetPath = removeOrigin(mappings[mapping].path);
      _.set(container, preppedTargetPath, _.get(obj, preppedPath));
    });

  return container;
}

export default processObject;

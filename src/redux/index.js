import randomColor from 'randomcolor';
import _ from 'lodash';
import createColorKey from '../helpers/createColorKey';

const initialState = {
  source: '',
  output: '',
  selectedPath: '',
  mappings: {},
  errorMsg: '',
  colorKey: {}
}

export default function reducer (state = initialState, action) {
  console.log(state);
  switch (action.type) {
    case "input":
      return {
        ...state,
        [action.payload.target]: action.payload.value
      };
    case "select":

      const newSelectedPathArray = action.payload.split('.');
      const selectedPathArray = state.selectedPath ? state.selectedPath.split('.') : '';

      try {
        const sourceJSON = JSON.parse(state.source);
        const outputJSON = JSON.parse(state.output);
        if (sourceJSON && outputJSON) {
          if ((newSelectedPathArray[0] !== selectedPathArray[0]) && state.selectedPath) {
            const switchSourceOutput = selectedPathArray[0] === 'source';
            const sourcePath = switchSourceOutput ? state.selectedPath : action.payload;
            const cleanedSourcePath = sourcePath.replace(/^(source|output)\./, '');
            const outputPath = switchSourceOutput ? action.payload : state.selectedPath;
            const cleanedOutputPath = outputPath.replace(/^(source|output)\./, '');
            if (typeof _.get(sourceJSON, cleanedSourcePath) === typeof _.get(outputJSON, cleanedOutputPath)) {
              const mappingCopy = Object.assign({}, state.mappings);
              mappingCopy[sourcePath] = {path: outputPath, color: randomColor()};
              const colorkey = createColorKey(mappingCopy);
              return {
                ...state,
                selectedPath: '',
                mappings: mappingCopy,
                colorKey: colorkey
              }
            }
          }
          return {
            ...state,
            selectedPath: action.payload
          }
        }
      } catch (e) {
        return {
          ...state,
          selectedPath: action.payload,
        }
      }
    default:
      return state;
  }
}

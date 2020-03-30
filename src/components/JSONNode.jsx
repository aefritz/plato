import React, {Component} from 'react';
import { connect } from 'react-redux';
import Leaf from './JSONLeaf';

class Node extends Component {

  constructor(props) {
    super(props);
  }

  selectPath (ev) {
    const {dispatch, path} = this.props;
    ev.stopPropagation();
    dispatch({type: "select", payload: path});
  }


  mapObjectToNodes (obj) {
    const makePath = (key) => this.props.path ? this.props.path + '.' + key : key;
    const childrenDivs = Object.keys(obj).map(key => {
      if (typeof obj[key] === 'object') {
        return <Node
        childNodes={obj[key]}
        keyName={key}
        colorKey={this.props.colorKey}
        path={makePath(key)}
        dispatch={this.props.dispatch}
        selectedPath={this.props.selectedPath}
        />
      } else {
        return <Leaf
          keyName={key}
          value={obj[key]}
          selectPath={this.selectPath}
          path={makePath(key)}
        />
      }
    });
    return childrenDivs;
  }

  render() {
    const { path, selectedPath, colorKey, keyName } = this.props;
    return (
      <div
        className={path === selectedPath ? 'node selected' : 'node'}
        onClick={this.selectPath.bind(this)}
        style={colorKey[path] ? {backgroundColor: colorKey[path]} : {}}
        >
        {this.props.keyName}
        <br/>
        {this.props.children || this.mapObjectToNodes(this.props.childNodes || JSON.parse(this.props[this.props.editor]))}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    ...state
  };

}

export default connect(mapStateToProps)(Node);

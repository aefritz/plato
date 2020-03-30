import React, {Component} from 'react';
import { connect } from 'react-redux';

class JSONLeaf extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { path, selectedPath, keyName, colorKey } = this.props;
    return (
      <div
      className={path === selectedPath ? 'leaf selected' : 'leaf'}
      onClick={this.props.selectPath.bind(this)}
      style={colorKey[path] ? {backgroundColor: colorKey[path]} : {}}
      >
        <span>Key: <i>{this.props.keyName}</i></span>
        <br/>
        <span>Type: <i>{typeof(this.props.value)}</i></span>
        <br/>
        <span>Value: <i>{String(this.props.value)}</i></span>
        <br/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(JSONLeaf);

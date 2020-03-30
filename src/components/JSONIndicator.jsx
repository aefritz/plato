import React, {Component} from 'react';
import { connect } from 'react-redux';
import convertErrorToBool from '../helpers/convertErrorToBool';

class JSONIndicator extends Component {

  constructor(props) {
    super(props);
    this.selectIndicatorClass = this.selectIndicatorClass.bind(this);
  };


  selectIndicatorClass (value) {
    return convertErrorToBool(value) ? 'validJSON' : 'invalidJSON'
  }

  render() {
    return (<div className={
      this.selectIndicatorClass(this.props[this.props.editor])
    }></div>)
  }

}

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(JSONIndicator);

import React, {Component} from 'react';
import { connect } from 'react-redux';
import JSONIndicator from './JSONIndicator';
import Node from './JSONNode';
import convertErrorToBool from '../helpers/convertErrorToBool';

class JSONEditor extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    const { editor, value } = this.props;
    return (
      <div className="editor">
        <div>
          <textarea className="text-field" value={this.props[this.props.editor]} onChange={(ev) => this.props.dispatch({
            type: "input", payload: {
              target: this.props.editor, value: ev.target.value
            }
          })}/>
        </div>
        <JSONIndicator
          editor={this.props.editor}
        />
        {convertErrorToBool(this.props[editor] || value)
          &&
          <Node
            editor={this.props.editor}
            path={this.props.editor}/>
        }
      </div>
    )
  }


}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(JSONEditor);

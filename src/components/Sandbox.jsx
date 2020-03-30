import React, {Component} from 'react';
import { connect } from 'react-redux';
import JSONIndicator from './JSONIndicator';
import convertErrorToBool from '../helpers/convertErrorToBool';
import processObject from '../helpers/processObject';

class Sandbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sample: '',
      mappedJSON: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange (ev) {
    this.setState({
      sample: ev.target.value
    })
  }

  handleClick (ev) {
    const { mappings } = this.props;
    const parsed = JSON.parse(this.state.sample)
    const mapped = processObject(parsed, mappings);
    console.log(mapped);
    this.setState({
      mappedJSON: mapped
    })
  }

  render() {

    return (
      <div>
        <textarea onChange={this.handleChange}/>
        <JSONIndicator value={this.state.sample}/>
        {convertErrorToBool(this.state.sample) &&
          <div>
            <button
              children="Process"
              onClick={this.handleClick}
              />
              <p></p>
          </div>
        }
      </div>
    )
  }
};

const mapStateToProps = ({mappings}) => {
  return {
    mappings
  }
};


export default connect(mapStateToProps)(Sandbox);

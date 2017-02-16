
import React from 'react';
import inject from '../lib/inject';

import '../styles/switch.scss';

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || false
    }
  }

  getProgress() {
    const { progress } = this.props;
    if (progress === Infinity) {
      return 100;
    } else if (progress === -Infinity) {
      return 0;
    }
    return progress;
  }

  render() {
    const {
      className, disabled, label, name, onChange, onClick, progress, success,
    } = this.props;
    const identifier = `install-button-${name}`;
    const hasProgress = progress !== undefined;
    const classList = [
      'Switch',
      className,
      progress === Infinity ? 'Switch--indefinite' : '',
      progress === -Infinity ? 'Switch--indefinite-reverse' : '',
      hasProgress && progress !== Infinity&& progress !== -Infinity ? 'Switch--progress' : '',
      success ? 'Switch--success' : ''
    ];
    const classes = classList.join(' ');

    return (
      <div className={classes} onClick={
          (e) => {
            e.preventDefault();
            this.setState({
              checked: !this.state.checked
            })
          }
        }
        data-progress={hasProgress ? this.getProgress() : 0}>
        <input
          id={identifier}
          className="visually-hidden"
          checked={this.state.checked}
          disabled={disabled}
          onChange={onChange}
          type="checkbox" />
        <label htmlFor={identifier}>
          {hasProgress ? <div className="Switch-progress-bar" /> : null}
          <span className="visually-hidden">{label}</span>
        </label>
      </div>
    );
  }
}

Switch.propTypes = {
  checked: React.PropTypes.bool,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  onClick: React.PropTypes.func,
  progress: React.PropTypes.number,
  success: React.PropTypes.bool,
}

Switch.defaultProps = {
  checked: false,
  disabled: false,
  success: false,
}


function onChange(e) {
  console.log("ONCHANGE", e, e.target);
}

export default inject(<Switch label="label" name="name" onChange={onChange} onClick={onClick} />);

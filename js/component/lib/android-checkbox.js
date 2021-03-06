/* @flow */
'use strict';

import React, {
  Component,
  requireNativeComponent,
  View,
  PropTypes 
} from 'react-native';

const Checkbox = requireNativeComponent('CheckboxAndroid', CheckboxAndroid, {
  nativeOnly: {
    onChange: true,
    on: true,
    enabled: true
  }
});

class CheckboxAndroid extends Component {
  //noinspection JSDuplicatedDeclaration
  props: {
    value: boolean;
    disabled: boolean;
    onChange?: (event: any) => void;
    onValueChange?: (value: boolean) => void;
  };
  _checkbox: any;

  constructor(props) {
    super(props);

    this._checkbox = {};
  }

  render() {
    return (
      <Checkbox
        style={[{width: 32, height: 32}, this.props.style]}
        ref={ref => this._checkbox = ref}
        on={this.props.value}
        enabled={!this.props.disabled}
        onChange={event => this._onChange(event)}
        />
    );
  }

  _onChange(event) {
    if (this.props.value === event.nativeEvent.value || this.props.disabled) {
      return;
    }

    this.props.onChange && this.props.onChange(event);
    this.props.onValueChange && this.props.onValueChange(event.nativeEvent.value);

    this._checkbox.setNativeProps({on: this.props.value});
  }
}

CheckboxAndroid.propTypes = {
  ...View.propTypes,

  value: PropTypes.bool,
  disabled: PropTypes.bool,
  onValueChange: PropTypes.func
};

CheckboxAndroid.defaultProps = {
  value: false,
  disabled: false
};

export {CheckboxAndroid};
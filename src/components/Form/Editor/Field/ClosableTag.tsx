import React from 'react';
import { Tag } from 'antd';

import { Option } from 'components/Form/types';

type ClosableTagProps = {
  tag: Option;
  onClose(tag: Option): void;
};

class ClosableTag extends React.PureComponent<ClosableTagProps> {
  handleClose = () => {
    this.props.onClose(this.props.tag);
  }
  render() {
    return (
      <Tag closable={true} afterClose={this.handleClose}>
        {this.props.children}
      </Tag>
    );
  }
}

export default ClosableTag;

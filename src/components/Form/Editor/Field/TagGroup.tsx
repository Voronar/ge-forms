import React from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';
import { InputProps } from 'antd/lib/input';
import uuid from 'uuid/v1';
import styled from 'styled-components';

import { Option } from 'components/Form/types';
import ClosableTag from 'components/Form/Editor/Field/ClosableTag';

const AddTag = styled(Tag)`
  background: #fff;
  border-style: dashed;
`;

const StyledInput = styled(Input as any as React.ComponentClass<InputProps>)`
  width: 80px;
`;

type TagGroupProps = {
  tags: Option[];
  onChange(options: Option[]): void;
};

type TagGroupState = {
  inputVisible: boolean;
  inputValue: string;
};

class TagGroup extends React.PureComponent<TagGroupProps, TagGroupState> {
  inputNode = React.createRef<Input>();

  state: TagGroupState = {
    inputVisible: false,
    inputValue: '',
  };

  handleClose = (removedTag: Option) => {
    const tags = this.props.tags.filter(tag => tag.label !== removedTag.label);

    this.props.onChange(tags);
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.inputNode.current && this.inputNode.current.focus());
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state;

    this.props.onChange([
      ...this.props.tags,
      ...(inputValue && this.props.tags.every(tag => tag.label !== inputValue))
        ? [{
          value: inputValue,
          label: inputValue,
          id: uuid(),
        }]
        : [],
    ]);

    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  }

  render() {
    const { inputVisible, inputValue } = this.state;

    return (
      <div>
        {this.props.tags.map((tag) => {
          const isLongTag = tag.label.length > 20;
          const tagElem = (
            <ClosableTag key={tag.id} tag={tag} onClose={this.handleClose}>
              {isLongTag ? `${tag.label.slice(0, 20)}...` : tag.label}
            </ClosableTag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag.id}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <StyledInput
            innerRef={this.inputNode}
            type="text"
            size="small"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <AddTag onClick={this.showInput}>
            <Icon type="plus" /> New Tag
          </AddTag>
        )}
      </div>
    );
  }
}

export default TagGroup;

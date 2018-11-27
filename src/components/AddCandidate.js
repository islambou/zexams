import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Tag,
  Tooltip,
  Icon
} from "antd";
import { SAVE_CANDIDATE } from "../sagas/types";
const FormItem = Form.Item;
const Option = Select.Option;

export class AddCandidate extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    tags: []
  };

  //----tags
  handleCloseTag = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInputTag = () => {
    console.log(this.tagInputRef);
    this.setState({ inputVisibleTag: true });
  };

  handleInputChangeTag = e => {
    this.setState({ inputValueTag: e.target.value }, () => this.input.focus());
  };

  handleInputConfirmTag = () => {
    const state = this.state;
    const inputValueTag = state.inputValueTag;
    let tags = state.tags;
    if (inputValueTag && tags.indexOf(inputValueTag) === -1) {
      tags = [...tags, inputValueTag];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisibleTag: false,
      inputValueTag: ""
    });
  };

  //------

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        values.birthDay = values.birthDay.toISOString().substring(0, 10);
        values.techs = this.state.tags;
        values.phoneNumber = "+" + values.prefix + "-" + values.phoneNumber;
        this.props.sendForm(values);
      }
    });
  };
  saveInputRef = input => (this.input = input);
  saveFormRef = form => (this.form = form);

  static getDerivedStateFromProps = (props, state) => {
    if (props.notif.length > 0) {
      props.form.resetFields();
    }
    return state;
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "33"
    })(
      <Select style={{ width: 70 }}>
        <Option value="33">+33</Option>
      </Select>
    );
    const { tags, inputVisibleTag, inputValueTag } = this.state;

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="my-form"
        ref={this.saveFormRef}
      >
        <FormItem {...formItemLayout} label="First name">
          {getFieldDecorator("firstName", {
            rules: [
              {
                required: true,
                message: "Please input your first name"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Last name">
          {getFieldDecorator("lastName", {
            rules: [
              {
                required: true,
                message: "Please input your last name"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Address">
          {getFieldDecorator("address", {
            rules: [
              {
                required: true,
                message: "Please input your address"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Birthday">
          {getFieldDecorator("birthDay", {
            rules: [
              {
                type: "object",
                required: true,
                message: "Please select a date!"
              }
            ]
          })(<DatePicker />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Phone Number">
          {getFieldDecorator("phoneNumber", {
            rules: [
              { required: true, message: "Please input your phone number!" }
            ]
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
        </FormItem>
        <FormItem {...tailFormItemLayout} label="Stack">
          {tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                key={tag}
                closable={true}
                afterClose={() => this.handleCloseTag(tag)}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {inputVisibleTag && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValueTag}
              onChange={this.handleInputChangeTag}
              onBlur={this.handleInputConfirmTag}
              onPressEnter={this.handleInputConfirmTag}
            />
          )}
          {!inputVisibleTag && (
            <Tag
              onClick={this.showInputTag}
              style={{ background: "#fff", borderStyle: "dashed" }}
            >
              <Icon type="plus" /> New Tag
            </Tag>
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  notif: state.candidateNotif
});
const mapDispatchToProps = dispatch => ({
  sendForm: form => dispatch({ type: SAVE_CANDIDATE, payload: form })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AddCandidate));

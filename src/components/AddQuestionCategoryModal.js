import React, { Component } from "react";

import { Button, Modal, Form, Input, Radio } from "antd";
import addQuestion from "./addQuestion";

const FormItem = Form.Item;

const addQuestionCategoryModal = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Add a new category"
          okText="Add"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Test title">
              {getFieldDecorator("category", {
                rules: [
                  {
                    required: true,
                    message: "Please input the title of the test!"
                  }
                ]
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default addQuestionCategoryModal;

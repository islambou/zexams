import React, { Component } from "react";

import { Button, Modal, Form, Input, Radio } from "antd";

const FormItem = Form.Item;

const CreateTest = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Test title">
              {getFieldDecorator("test", {
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

export default CreateTest;

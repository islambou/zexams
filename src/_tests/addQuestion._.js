import React from "react";
import { AddQuestion } from "../components/addQuestion";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("<AddQuestion/>", () => {
  const component = shallow(<AddQuestion />).dive();
  expect(component).toHaveLength(1);
});

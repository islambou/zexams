import react from "react";
import addQuestion from "../src/components/addQuestion";
import { shallow } from "enzyme";

describe("<addQuestion/>", () => {
  const component = shallow(<addQuestion />);
  expect(component).toHaveLength(1);
});

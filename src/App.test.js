import React from "react";
import App from "./App";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe("testing the app component", () => {
  it("renders without crashing", () => {
    const appComponent = shallow(<App />);
    expect(appComponent).toBeTruthy();
  });
});

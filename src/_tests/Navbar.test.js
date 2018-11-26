import React from "react";
import { Navbar } from "../components/Navbar";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("testing the Navbar component", () => {
  it("renders without crashing", () => {
    const navbar = shallow(<Navbar />);
    expect(navbar).toBeTruthy();
  });
});

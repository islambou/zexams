import React from "react";
import { WrappedLoginForm } from "../components/loginform";
import Enzyme, { shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("testing the login form component", () => {
  it("renders without crashing", () => {
    const loginForm = shallow(<WrappedLoginForm />);
    expect(loginForm).toBeTruthy();
  });

  it("Should display login form", () => {
    const loginForm = render(<WrappedLoginForm />);

    expect(loginForm.find("input")).toHaveLength(2);
  });
});

import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Button from "../Button.vue";

describe("Button", () => {
  it("renders properly", () => {
    const wrapper = mount(Button, {
      props: {
        label: "Button Label",
      },
    });
    expect(wrapper.text()).toContain("Button Label");
    expect(wrapper.attributes().title).toBe("Button Label");
  });
});

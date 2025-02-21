import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Bar from "../Bar.vue";

describe("Bar", () => {
  it("renders properly", () => {
    const wrapper = mount(Bar, {
      slots: {
        default: "Content",
      },
    });
    expect(wrapper.text()).toContain("Content");
  });
});

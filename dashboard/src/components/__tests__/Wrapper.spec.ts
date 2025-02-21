import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Wrapper from "../Wrapper.vue";

describe("Wrapper", () => {
  it("renders properly", () => {
    const wrapper = mount(Wrapper, {
      slots: {
        default: "Content",
      },
    });
    expect(wrapper.text()).toContain("Content");
  });
});

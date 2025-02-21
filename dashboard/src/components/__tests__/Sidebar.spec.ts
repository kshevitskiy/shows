import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Sidebar from "../Sidebar.vue";

describe("Sidebar", () => {
  it("renders properly", () => {
    const wrapper = mount(Sidebar, {
      slots: {
        default: "Content",
      },
    });
    expect(wrapper.text()).toContain("Content");
  });
});

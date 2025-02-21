import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Tag from "../Tag.vue";

describe("Tag", () => {
  it("renders properly", () => {
    const wrapper = mount(Tag, {
      props: {
        label: "Content",
      },
    });
    expect(wrapper.text()).toContain("Content");
  });

  it("renders slot properly", () => {
    const wrapper = mount(Tag, {
      props: {
        label: "Content",
      },
      slots: {
        default: "Content",
      },
    });
    expect(wrapper.text()).toContain("Content");
  });
});

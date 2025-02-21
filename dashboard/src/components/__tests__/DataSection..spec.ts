import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import DataSection from "../DataSection.vue";

describe("DataSection", () => {
  it("renders properly", () => {
    const wrapper = mount(DataSection, {
      props: {
        label: "Foo",
      },
      slots: {
        default: "Content",
      },
    });

    expect(wrapper.find("h2").text()).toContain("Foo");
    expect(wrapper.text()).toContain("Content");
  });
});

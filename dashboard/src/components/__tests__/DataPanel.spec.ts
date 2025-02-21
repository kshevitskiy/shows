import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import DataPanel from "../DataPanel.vue";

describe("DataPanel", () => {
  it("renders properly", () => {
    const wrapper = mount(DataPanel, {
      props: {
        label: "Foo",
        value: "Bar",
      },
    });

    expect(wrapper.text()).toContain("Foo");
    expect(wrapper.text()).toContain("Bar");
  });
});

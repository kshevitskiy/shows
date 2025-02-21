import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import DataList from "../DataList.vue";

describe("DataList", () => {
  it("renders properly", () => {
    const mockItems = [
      { id: 1, name: "foo" },
      { id: 2, name: "bar" },
    ];

    const wrapper = mount(DataList, {
      props: {
        items: mockItems,
      },
    });
    expect(wrapper.findAll("li").length).toBe(2);
    mockItems.forEach((item, index) => {
      expect(wrapper.findAll("li")[index].text()).toBe(JSON.stringify(item, null, 2));
    });
  });

  it("renders properly nodata", () => {
    const wrapper = mount(DataList, {
      props: {
        items: [],
      },
      slots: {
        nodata: "Oops...",
      },
    });
    expect(wrapper.text()).toContain("Oops..");
  });
});

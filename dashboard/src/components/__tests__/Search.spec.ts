import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Search from "../Search.vue";

describe("Search", () => {
  it("renders properly", () => {
    const wrapper = mount(Search, {
      props: {
        value: "Search query",
      },
    });

    expect(wrapper.attributes().value).toBe("Search query");
  });
});

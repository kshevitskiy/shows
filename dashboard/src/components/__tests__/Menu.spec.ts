import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Menu from "../Menu.vue";

vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: {
      id: 0,
    },
  }),
  useRouter: () => ({}),
}));

describe("Menu", () => {
  it("renders properly", () => {
    const mockItems = [
      { id: 1, label: "Foo", to: "/foo" },
      { id: 2, label: "Bar", to: "/bar" },
    ];

    const wrapper = mount(Menu, {
      props: {
        items: mockItems,
      },
      global: {
        stubs: ["RouterLink"],
      },
    });

    expect(wrapper.findAll("router-link-stub").length).toBe(2);
  });
});

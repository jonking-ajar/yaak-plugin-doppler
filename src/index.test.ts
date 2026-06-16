import { describe, expect, test } from "vitest";
import { plugin } from "./index";

describe("Doppler Plugin", () => {
  test("Exports plugin object", () => {
    expect(plugin).toBeTypeOf("object");
  });

  test("Registers the doppler.secret template function", () => {
    const fn = plugin.templateFunctions?.find(
      (f) => f.name === "doppler.secret",
    );
    expect(fn).toBeDefined();
    const names = fn?.args.map((a) => ("name" in a ? a.name : undefined));
    expect(names).toEqual(["project", "config", "secret"]);
  });
});

import { describe, it, expect } from "vitest";
import { getDefaultValue, getInitialFields, getInitialErrors } from "./utils";
import type { FormConfig } from "../types/types";

/* eslint-disable  @typescript-eslint/no-explicit-any */

describe("getDefaultValue", () => {
  it("returns the correct default value for text fields", () => {
    expect(getDefaultValue("text")).toBe("");
  });

  it("returns the first option for select fields if options are provided", () => {
    expect(getDefaultValue("select", ["Option1", "Option2"])).toBe("Option1");
  });

  it("returns an empty string for select fields if no options are provided", () => {
    expect(getDefaultValue("select")).toBe("");
  });

  it("returns false for checkbox fields", () => {
    expect(getDefaultValue("checkbox")).toBe(false);
  });

  it("returns the current date for date fields", () => {
    const today = new Date().toISOString().split("T")[0];
    expect(getDefaultValue("date")).toBe(today);
  });

  it("gets default value of an unknown field", () => {
    const fallbackValue = "";
    expect(getDefaultValue("customField" as any)).toBe(fallbackValue);
  });
});

describe("getInitialFields", () => {
  it("initializes fields with the correct default values", () => {
    const config: FormConfig = [
      { id: "name", type: "text", label: "Name" },
      { id: "age", type: "number", label: "Age" },
    ];

    const expected = {
      name: { value: "" },
      age: { value: 0 },
    };

    expect(getInitialFields(config)).toEqual(expected);
  });

  it("handles select fields with no options", () => {
    const config = [
      { id: "mySelect", type: "select", label: "Name"  },
    ];

    const expected = {
      mySelect: { value: "" },
    };

    expect(getInitialFields(config as FormConfig)).toEqual(expected);
  });

  it("handles radio fields with options", () => {
    const config: FormConfig = [
      { id: "choice", type: "radio", label: "Name", options: ["Yes", "No"] },
    ];

    const expected = {
      choice: { value: "Yes" },
    };

    expect(getInitialFields(config)).toEqual(expected);
  });

  it("handles radio fields with no options", () => {
    const config = [
      { id: "choice", type: "radio", label: "Name" },
    ];

    const expected = {
      choice: { value: "" },
    };

    expect(getInitialFields(config as FormConfig)).toEqual(expected);
  });
});


describe("getInitialErrors", () => {
  it("initializes errors with null for all fields", () => {
    const config: FormConfig = [
      { id: "name", type: "text", label: "Name" },
      { id: "age", type: "number", label: "Name" },
    ];

    const expected = {
      name: null,
      age: null,
    };

    expect(getInitialErrors(config)).toEqual(expected);
  });

  it("initializes errors with null for all fields", () => {
    const config:any = undefined;

    const expected = {};

    expect(getInitialErrors(config)).toEqual(expected);
  });
});

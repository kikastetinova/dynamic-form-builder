import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFormBuilder } from "./use-form-builder";
import type { FormConfig } from "../types/types";

describe("useFormBuilder", () => {

  interface FormConfType {
    "name": string,
    "age": number,
    "dob": string
  };

  const config: FormConfig = [
    { id: "name", type: "text", label: 'Label', required: true, minLength: 3, maxLength: 10 },
    { id: "age", type: "number", label: 'Label', required: true, min: 18, max: 60 },
    { id: "dob", type: "date", label: 'Label', required: true, min: "2000-01-01", max: "2025-12-31" },
  ];

  it("initializes form state correctly", () => {
    const { result } = renderHook(() => useFormBuilder<FormConfType>(config));
    const today = new Date().toISOString().split("T")[0];
    expect(result.current.formState.fields).toEqual({
      name: "",
      age: 0,
      dob: today,
    });
    expect(result.current.formState.errors).toEqual({
      name: null,
      age: null,
      dob: null,
    });
    expect(result.current.formState.isValid).toBe(false);
  });

  it("updates field value correctly with setFieldValue", () => {
    const { result } = renderHook(() => useFormBuilder<FormConfType>(config));

    act(() => {
      result.current.setFieldValue("name", "John");
    });

    expect(result.current.formState.fields.name).toBe("John");
  });

  it("validates a required field correctly", () => {
    const { result } = renderHook(() => useFormBuilder<FormConfType>(config));

    const error = result.current.validateField("name");
    expect(error).toBe("This field is required.");
  });

  it("validates text field length constraints", () => {
    const { result } = renderHook(() => useFormBuilder<FormConfType>(config));

    act(() => {
      result.current.setFieldValue("name", "Jo");
    });

    const errorShort = result.current.validateField("name");
    expect(errorShort).toBe("Minimum length is 3.");

    act(() => {
      result.current.setFieldValue("name", "ThisIsTooLong");
    });

    const errorLong = result.current.validateField("name");
    expect(errorLong).toBe("Maximum length is 10.");
  });

  it("validates number field constraints", () => {
    const { result } = renderHook(() => useFormBuilder<FormConfType>(config));

    act(() => {
      result.current.setFieldValue("age", 17);
    });

    const errorLow = result.current.validateField("age");
    expect(errorLow).toBe("Value must be at least 18.");

    act(() => {
      result.current.setFieldValue("age", 61);
    });

    const errorHigh = result.current.validateField("age");
    expect(errorHigh).toBe("Value must not exceed 60.");
  });

  it("validates date field constraints", () => {
    const { result } = renderHook(() => useFormBuilder<FormConfType>(config));

    act(() => {
      result.current.setFieldValue("dob", "1999-12-31");
    });

    const errorEarly = result.current.validateField("dob");
    expect(errorEarly).toBe("Value must be at least 2000-01-01.");

    act(() => {
      result.current.setFieldValue("dob", "2026-01-01");
    });

    const errorLate = result.current.validateField("dob");
    expect(errorLate).toBe("Value must not exceed 2025-12-31.");
  });

  it("validates the entire form and updates errors and isValid state", () => {
    const { result } = renderHook(() => useFormBuilder<FormConfType>(config));

    act(() => {
      result.current.validateForm();
    });

    expect(result.current.formState.errors).toEqual({
      name: "This field is required.",
      age: "Value must be at least 18.", // Default value (0) satisfies `required` for `number`.
      dob: null, // Default value satisfies `date` constraints.
    });

    expect(result.current.formState.isValid).toBe(false);

    act(() => {
      result.current.setFieldValue("name", "John");
      result.current.setFieldValue("age", 25);
    });

    act(() => {
      result.current.validateForm();
    });

    expect(result.current.formState.errors).toEqual({
      name: null,
      age: null,
      dob: null,
    });

    expect(result.current.formState.isValid).toBe(true);
  });
});

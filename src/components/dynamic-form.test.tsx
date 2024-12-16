import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DynamicForm from "./dynamic-form";
import { FormBuilderReturnType, FormConfig } from "../types/types";

/* eslint-disable  @typescript-eslint/no-explicit-any */

describe("DynamicForm", () => {
  const mockValidateForm = vi.fn();
  const mockSetFieldValue = vi.fn();

  const mockForm: FormBuilderReturnType = {
    formState: {
      fields: {
        name: "",
        age: 0,
        dob: "2000-01-01",
      },
      errors: {
        name: null,
        age: null,
        dob: null,
      },
      isValid: false,
    },
    setFieldValue: mockSetFieldValue,
    validateField: vi.fn(),
    validateForm: mockValidateForm,
  };

  const config = [
    { id: "name", type: "text", required: true, label: "Name" },
    { id: "age", type: "number", required: true, min: 18, label: "Age" },
    { id: "dob", type: "date", required: true, label: "Date of Birth" },
  ];

  it("renders form fields correctly", () => {
    render(<DynamicForm config={config as FormConfig} form={mockForm} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit form/i })).toBeInTheDocument();
  });

  it("displays validation errors for invalid data", () => {
    const invalidFormState = {
      ...mockForm.formState,
      errors: {
        name: "This field is required.",
        age: "Value must be at least 18.",
        dob: null,
      },
    };

    const mockInvalidForm = { ...mockForm, formState: invalidFormState };
    render(<DynamicForm config={config as FormConfig} form={mockInvalidForm} />);

    expect(screen.getByText("This field is required.")).toBeInTheDocument();
    expect(screen.getByText("Value must be at least 18.")).toBeInTheDocument();
  });

  it("displays fields with value that was set in invalid format", () => {
    const invalidFormState = {
      ...mockForm.formState,
      fields: {
        name: 5
      },
      errors: {
        
      },
    };

    const mockInvalidForm = { ...mockForm, formState: invalidFormState };
    render(<DynamicForm config={config as FormConfig} form={mockInvalidForm as any} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("5");
  });

  it("updates field values on change", () => {
    render(<DynamicForm config={config as FormConfig} form={mockForm} />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Age"), { target: { value: "25" } });

    expect(mockSetFieldValue).toHaveBeenCalledWith("name", "John");
    expect(mockSetFieldValue).toHaveBeenCalledWith("age", 25);
  });

  it("handles dynamic config changes", () => {
    const { rerender } = render(<DynamicForm config={config as FormConfig} form={mockForm} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();

    const newConfig = [
      { id: "email", type: "text", required: true, label: "Email" },
    ];

    rerender(<DynamicForm config={newConfig as FormConfig} form={mockForm} />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();
  });

  it("logs the state of a valid form", () => {
    const validFormState = {
      ...mockForm.formState,
      isValid: true,
    };

    const mockValidForm = { ...mockForm, formState: validFormState };
    const consoleSpy = vi.spyOn(console, "log");

    render(<DynamicForm config={config as FormConfig} form={mockValidForm} />);

    expect(consoleSpy).toHaveBeenCalledWith("LOGGED STATE OF A VALID FORM: ", validFormState);
    consoleSpy.mockRestore();
  });
});

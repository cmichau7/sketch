// TODO typings for createForm
declare module "svelte-forms-lib" {
  import { Writable, Readable } from "svelte/store";
  import { Schema } from "yup";

  interface Config<T> {
    initialValues: Record<string, unknown>;
    validationSchema?: Schema<T>;
    validate?: (values: unknown) => Record<string, unknown>;
    onSubmit: (event: Event) => void;
  }

  interface CreateForm {
    form: Writable<unknown>;
    errors: Writable<unknown>;
    touched: Writable<unknown>;
    modified: Writable<unknown>;
    isValid: Readable<unknown>;
    isSubmitting: Writable<unknown>;
    isValidating: Writable<unknown>;
    isModified: Writable<unknown>;
    handleChange: (event: Event) => void;
    handleSubmit: (event: Event) => void;
    handleReset: () => void;
    updateField: (field: unknown, value: unknown) => void;
    updateValidateField: (field: unknown, value: unknown) => void;
    updateTouched: (field: unknown, value: unknown) => void;
    validateField: (field: unknown) => boolean;
    updateInitialValues: (value: unknown) => void;
    state: Readable<unknown>;
  }

  function createForm<T>(config: Config<T>): CreateForm;
}

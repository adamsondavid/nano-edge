import { z } from "zod";

export function createValidator<Schema extends z.ZodTypeAny = z.ZodNever>(field: string, schema: Schema) {
  return {
    validate(value: unknown) {
      const res = schema.safeParse(value);
      if (res.error) {
        const { formErrors, fieldErrors } = res.error.flatten();
        const errors = [];
        if (formErrors.length) {
          for (const formError of formErrors) {
            errors.push(`invalid input '${field}': ${formError}`);
          }
        }
        if (Object.keys(fieldErrors)) {
          for (const [key, value] of Object.entries(fieldErrors)) {
            if (value) {
              for (const v of value) {
                errors.push(`invalid input '${field}.${key}': ${v}`);
              }
            } else {
              errors.push(`invalid input '${field}.${key}'`);
            }
          }
        }
        throw new Error(errors.join("\n"));
      }
      return res.data as z.infer<Schema>;
    },
  };
}

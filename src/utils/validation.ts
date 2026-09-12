// Form validation utilities

export interface ValidationError {
  field: string;
  message: string;
}

export class Validator {
  private errors: ValidationError[] = [];

  static isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  static isPhone(value: string): boolean {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    return phoneRegex.test(value) && value.replace(/\D/g, "").length >= 10;
  }

  static isStrongPassword(value: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(value);
  }

  static isURL(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  static isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
  }

  static isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  static isMinLength(value: string, minLength: number): boolean {
    return value.length >= minLength;
  }

  static isMaxLength(value: string, maxLength: number): boolean {
    return value.length <= maxLength;
  }

  static matches(value: string, pattern: RegExp): boolean {
    return pattern.test(value);
  }

  // Validation chain methods
  required(value: string, fieldName: string): this {
    if (!Validator.isNotEmpty(value)) {
      this.errors.push({ field: fieldName, message: `${fieldName} is required` });
    }
    return this;
  }

  email(value: string, fieldName: string): this {
    if (value && !Validator.isEmail(value)) {
      this.errors.push({ field: fieldName, message: `${fieldName} must be a valid email` });
    }
    return this;
  }

  phone(value: string, fieldName: string): this {
    if (value && !Validator.isPhone(value)) {
      this.errors.push({ field: fieldName, message: `${fieldName} must be a valid phone number` });
    }
    return this;
  }

  password(value: string, fieldName: string): this {
    if (value && !Validator.isStrongPassword(value)) {
      this.errors.push({
        field: fieldName,
        message: `${fieldName} must be at least 8 characters with uppercase, lowercase, and number`,
      });
    }
    return this;
  }

  minLength(value: string, minLength: number, fieldName: string): this {
    if (value && !Validator.isMinLength(value, minLength)) {
      this.errors.push({
        field: fieldName,
        message: `${fieldName} must be at least ${minLength} characters`,
      });
    }
    return this;
  }

  maxLength(value: string, maxLength: number, fieldName: string): this {
    if (value && !Validator.isMaxLength(value, maxLength)) {
      this.errors.push({
        field: fieldName,
        message: `${fieldName} must be at most ${maxLength} characters`,
      });
    }
    return this;
  }

  matches(value: string, pattern: RegExp, fieldName: string, message?: string): this {
    if (value && !Validator.matches(value, pattern)) {
      this.errors.push({
        field: fieldName,
        message: message || `${fieldName} format is invalid`,
      });
    }
    return this;
  }

  custom(condition: boolean, fieldName: string, message: string): this {
    if (!condition) {
      this.errors.push({ field: fieldName, message });
    }
    return this;
  }

  getErrors(): ValidationError[] {
    return this.errors;
  }

  isValid(): boolean {
    return this.errors.length === 0;
  }

  getError(fieldName: string): string | undefined {
    return this.errors.find((e) => e.field === fieldName)?.message;
  }

  reset(): void {
    this.errors = [];
  }
}

// Validation schemas
export const validationSchemas = {
  login: (email: string, password: string) => {
    const validator = new Validator();
    validator
      .required(email, 'email')
      .email(email, 'email')
      .required(password, 'password');
    return validator;
  },

  register: (data: { name: string; email: string; password: string; confirmPassword: string }) => {
    const validator = new Validator();
    validator
      .required(data.name, 'name')
      .minLength(data.name, 2, 'name')
      .required(data.email, 'email')
      .email(data.email, 'email')
      .required(data.password, 'password')
      .password(data.password, 'password')
      .required(data.confirmPassword, 'confirmPassword')
      .custom(
        data.password === data.confirmPassword,
        'confirmPassword',
        'Passwords do not match'
      );
    return validator;
  },

  mission: (data: { title: string; outcome: string; budget: number; deadline: string }) => {
    const validator = new Validator();
    validator
      .required(data.title, 'title')
      .minLength(data.title, 10, 'title')
      .required(data.outcome, 'outcome')
      .minLength(data.outcome, 20, 'outcome')
      .custom(data.budget > 0, 'budget', 'Budget must be greater than 0')
      .required(data.deadline, 'deadline');
    return validator;
  },

  task: (data: { title: string; description: string; budget: number }) => {
    const validator = new Validator();
    validator
      .required(data.title, 'title')
      .minLength(data.title, 5, 'title')
      .required(data.description, 'description')
      .minLength(data.description, 20, 'description')
      .custom(data.budget > 0, 'budget', 'Budget must be greater than 0');
    return validator;
  },
};

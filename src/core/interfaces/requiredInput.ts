export interface RequiredInput {
  type: string;
  name: string;
  className: string;
  required: boolean;
  label: string;
  autoComplete?: string;
  min?: string;
  max?: string;
  options?: Array<{ name: string; value: string; flag?: string }>;
}

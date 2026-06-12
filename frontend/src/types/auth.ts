import { z } from 'zod';

export type UserRole = 'admin' | 'traffic_officer' | 'citizen';

export const USER_ROLES: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'traffic_officer', label: 'Traffic Officer' },
  { value: 'citizen', label: 'Citizen User' },
];

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
});

export const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email address'),
    phone: z
      .string()
      .regex(/^\d+$/, 'Only numbers are allowed')
      .min(10, 'Enter a valid phone number'),
    role: z.enum(['admin', 'traffic_officer', 'citizen'], {
      required_error: 'Please select a role',
    }),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms & conditions' }),
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

export interface AuthUser {
  email: string;
  name?: string;
  role: UserRole;
}

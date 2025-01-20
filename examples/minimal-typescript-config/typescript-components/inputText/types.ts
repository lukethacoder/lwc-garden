export const InputTypeValues = ['text', 'number', 'email', 'tel'] as const
export type InputType = (typeof InputTypeValues)[number]

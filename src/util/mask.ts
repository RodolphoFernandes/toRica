import { toPattern } from 'vanilla-masker'

export const unMask = (value: string) => value.replace(/\W/g, '')

const masker = (value: string, pattern: any, options: any) =>
  toPattern(value, { pattern, ...options })

const multimasker = (value: string, patterns: any, options: any) =>
  masker(
    value,
    patterns.reduce(
      (memo: any, pattern: any) => (value.length <= unMask(memo).length ? memo : pattern),
      patterns[0]
    ),
    options
  )

export const Mask = (value: string, pattern: any, options?: any | undefined) =>
  typeof pattern === 'string'
    ? masker(value, pattern || '', options)
    : multimasker(value, pattern, options)

export const formatMask = (value: string, mask: string | string[]) => {
  const origin = value.replace(/\W/g, '');

  return toPattern(origin, {
    pattern: typeof mask === "string" ? mask : mask.reduce((previous, current) => (
      origin.length <= previous.replace(/\W/g, '').length ? previous : current
    ), mask[0])
  });
}
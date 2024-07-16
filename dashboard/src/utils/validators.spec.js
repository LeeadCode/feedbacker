import { validateEmptyAndEmail, validateEmptyAndLength } from "./validators";

describe('Validator empty and min length', () => {
  it('should give an error with empty payload', () => {
    expect(validateEmptyAndLength()()).toBe('* Este campo é obrigatório!')
  })

  it('should give an error with payload < required length', () => {
    expect(validateEmptyAndLength()('a')).toBe('* Este campo precisa de no mínimo 3 Caracteres!')
  })

  it('return empty if valid payload', () => {
    expect(validateEmptyAndLength(3)('test')).toBe('')
  })
})

describe('Validator email', () => {
  it('should give an error with empty payload', () => {
    expect(validateEmptyAndEmail()).toBe('* Este campo é obrigatório!')
  })

  it("should give an error with payload it's not an email", () => {
    expect(validateEmptyAndEmail('abc.com')).toBe('* Este campo precisa ser um e-mail!')
  })

  it('return empty if valid payload', () => {
    expect(validateEmptyAndEmail('teste@teste.com')).toBe('')
  })
})
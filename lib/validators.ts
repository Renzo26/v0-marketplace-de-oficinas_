export function validateCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]/g, "")

  // Verifica se tem 14 dígitos
  if (cnpj.length !== 14) return false

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cnpj)) return false

  // Validação do primeiro dígito verificador
  let soma = 0
  let peso = 2
  for (let i = 11; i >= 0; i--) {
    soma += Number.parseInt(cnpj[i]) * peso
    peso = peso === 9 ? 2 : peso + 1
  }
  const digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

  if (Number.parseInt(cnpj[12]) !== digito1) return false

  // Validação do segundo dígito verificador
  soma = 0
  peso = 2
  for (let i = 12; i >= 0; i--) {
    soma += Number.parseInt(cnpj[i]) * peso
    peso = peso === 9 ? 2 : peso + 1
  }
  const digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

  return Number.parseInt(cnpj[13]) === digito2
}

export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, "")

  if (cpf.length !== 11) return false
  if (/^(\d)\1+$/.test(cpf)) return false

  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += Number.parseInt(cpf[i]) * (10 - i)
  }
  const digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

  if (Number.parseInt(cpf[9]) !== digito1) return false

  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += Number.parseInt(cpf[i]) * (11 - i)
  }
  const digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

  return Number.parseInt(cpf[10]) === digito2
}

export function formatCNPJ(cnpj: string): string {
  cnpj = cnpj.replace(/[^\d]/g, "")
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
}

export function formatCPF(cpf: string): string {
  cpf = cpf.replace(/[^\d]/g, "")
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
}

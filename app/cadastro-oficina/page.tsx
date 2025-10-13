"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Check, Upload, MapPin, Phone, Star, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { validateCNPJ, formatCNPJ } from "@/lib/validators"
import { apiService, type CadastroOficinaData, type HorarioFuncionamento } from "@/lib/api"

const servicosDisponiveis = [
  {
    categoria: "Mecânica Geral",
    servicos: ["Troca de óleo", "Embreagem", "Motor", "Revisão geral"],
  },
  {
    categoria: "Freios & Suspensão",
    servicos: ["Pastilhas de freio", "Discos de freio", "Amortecedores", "Molas"],
  },
  {
    categoria: "Elétrica/Autoelétrica",
    servicos: ["Bateria", "Alternador", "Motor de partida", "Sistema elétrico"],
  },
  {
    categoria: "Funilaria & Pintura",
    servicos: ["Reparo de lataria", "Pintura", "Polimento", "Remoção de riscos"],
  },
  {
    categoria: "Pneus & Alinhamento",
    servicos: ["Troca de pneus", "Alinhamento", "Balanceamento", "Geometria"],
  },
  {
    categoria: "Chaveiro Automotivo",
    servicos: ["Chaves codificadas", "Abertura de veículos", "Reparo de fechaduras"],
  },
]

const diasSemana = [
  { key: "segunda", label: "Segunda-feira" },
  { key: "terca", label: "Terça-feira" },
  { key: "quarta", label: "Quarta-feira" },
  { key: "quinta", label: "Quinta-feira" },
  { key: "sexta", label: "Sexta-feira" },
  { key: "sabado", label: "Sábado" },
  { key: "domingo", label: "Domingo" },
]

export default function CadastroOficina() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    razaoSocial: "",
    cnpj: "",
    telefone: "",
    email: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    login: "",
    senha: "",
    confirmarSenha: "",
    horarioFuncionamento: {
      segunda: { inicio: "08:00", fim: "18:00", ativo: true },
      terca: { inicio: "08:00", fim: "18:00", ativo: true },
      quarta: { inicio: "08:00", fim: "18:00", ativo: true },
      quinta: { inicio: "08:00", fim: "18:00", ativo: true },
      sexta: { inicio: "08:00", fim: "18:00", ativo: true },
      sabado: { inicio: "08:00", fim: "12:00", ativo: false },
      domingo: { inicio: "08:00", fim: "12:00", ativo: false },
    } as HorarioFuncionamento,
    servicosSelecionados: [] as string[],
    outrosServicos: "",
    aceitaTermos: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.razaoSocial.trim()) newErrors.razaoSocial = "Razão Social é obrigatória"
      if (!formData.cnpj.trim()) {
        newErrors.cnpj = "CNPJ é obrigatório"
      } else if (!validateCNPJ(formData.cnpj)) {
        newErrors.cnpj = "CNPJ inválido"
      }
      if (!formData.telefone.trim()) newErrors.telefone = "Telefone é obrigatório"
      if (!formData.email.trim()) newErrors.email = "Email é obrigatório"
      if (!formData.endereco.trim()) newErrors.endereco = "Endereço é obrigatório"
      if (!formData.login.trim()) newErrors.login = "Login é obrigatório"
      if (!formData.senha.trim()) newErrors.senha = "Senha é obrigatória"
      if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = "Senhas não coincidem"
    }

    if (step === 2) {
      if (formData.servicosSelecionados.length === 0) {
        newErrors.servicos = "Selecione pelo menos um serviço"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleServicoToggle = (servico: string) => {
    setFormData((prev) => ({
      ...prev,
      servicosSelecionados: prev.servicosSelecionados.includes(servico)
        ? prev.servicosSelecionados.filter((s) => s !== servico)
        : [...prev.servicosSelecionados, servico],
    }))
  }

  const handleHorarioChange = (
    dia: keyof HorarioFuncionamento,
    field: "inicio" | "fim" | "ativo",
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      horarioFuncionamento: {
        ...prev.horarioFuncionamento,
        [dia]: {
          ...prev.horarioFuncionamento[dia],
          [field]: value,
        },
      },
    }))
  }

  const handleSubmit = async () => {
    console.log("[v0] ========== INICIANDO CADASTRO ==========")
    console.log("[v0] Validando formulário...")

    if (!validateStep(currentStep)) {
      console.log("[v0] ❌ Validação falhou na etapa", currentStep)
      console.log("[v0] Erros encontrados:", errors)
      return
    }

    if (!formData.aceitaTermos) {
      console.log("[v0] ❌ Termos não aceitos")
      return
    }

    console.log("[v0] ✅ Validação passou")
    setIsSubmitting(true)

    try {
      const cadastroData: CadastroOficinaData = {
        razaoSocial: formData.razaoSocial,
        cnpj: formData.cnpj,
        telefone: formData.telefone,
        email: formData.email,
        endereco: `${formData.endereco}, ${formData.numero} - ${formData.bairro}, ${formData.cidade}/${formData.uf}`,
        servicos: formData.servicosSelecionados,
        horarioFuncionamento: formData.horarioFuncionamento,
        login: formData.login,
        senha: formData.senha,
      }

      console.log("[v0] 📦 Dados preparados para envio:")
      console.log("[v0] URL da API:", process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api")
      console.log("[v0] Endpoint:", "/oficinas")
      console.log("[v0] Método:", "POST")
      console.log("[v0] Payload completo:", JSON.stringify(cadastroData, null, 2))
      console.log("[v0] ========================================")

      console.log("[v0] 🚀 Enviando requisição...")
      const response = await apiService.cadastrarOficina(cadastroData)

      console.log("[v0] ========== RESPOSTA RECEBIDA ==========")
      console.log("[v0] ✅ Cadastro realizado com sucesso!")
      console.log("[v0] Status:", response.success ? "SUCESSO" : "FALHA")
      console.log("[v0] Resposta completa:", JSON.stringify(response, null, 2))

      if (response.data) {
        console.log("[v0] 📋 Dados da oficina cadastrada:")
        console.log("[v0] - ID:", response.data.id)
        console.log("[v0] - Razão Social:", response.data.razaoSocial)
        console.log("[v0] - CNPJ:", response.data.cnpj)
        console.log("[v0] - Email:", response.data.email)
      }
      console.log("[v0] ========================================")

      setShowSuccess(true)
    } catch (error) {
      console.log("[v0] ========== ERRO NO CADASTRO ==========")
      console.error("[v0] ❌ Erro ao cadastrar oficina")
      console.error("[v0] Tipo do erro:", error instanceof Error ? "Error" : typeof error)
      console.error("[v0] Mensagem:", error instanceof Error ? error.message : String(error))
      console.error("[v0] Stack trace:", error instanceof Error ? error.stack : "N/A")
      console.log("[v0] ========================================")

      setErrors({
        submit:
          error instanceof Error
            ? `Erro ao cadastrar: ${error.message}`
            : "Erro ao cadastrar oficina. Verifique se o backend está rodando.",
      })
    } finally {
      setIsSubmitting(false)
      console.log("[v0] Processo de cadastro finalizado")
    }
  }

  if (showSuccess) {
    return (
      <div className="marketplace-body min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--marketplace-success)" }}>
            Perfil Publicado!
          </h1>
          <p className="text-lg mb-8" style={{ color: "var(--marketplace-text-secondary)" }}>
            Você já pode aparecer nas buscas dos clientes.
          </p>
          <Link href="/">
            <Button
              size="lg"
              className="font-semibold"
              style={{
                backgroundColor: "var(--marketplace-primary)",
                color: "white",
              }}
            >
              Voltar ao Marketplace
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="marketplace-body min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4" style={{ color: "var(--marketplace-text-secondary)" }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-3xl font-bold" style={{ color: "var(--marketplace-text-primary)" }}>
            Cadastro da Oficina
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: "var(--marketplace-text-secondary)" }}>
              Etapa {currentStep} de 3
            </span>
            <span className="text-sm font-medium" style={{ color: "var(--marketplace-text-secondary)" }}>
              {Math.round((currentStep / 3) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ backgroundColor: "var(--marketplace-card)" }}>
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: "var(--marketplace-primary)",
                width: `${(currentStep / 3) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Step 1: Dados da Oficina */}
        {currentStep === 1 && (
          <Card className="border-0" style={{ backgroundColor: "var(--marketplace-card)" }}>
            <CardHeader>
              <CardTitle style={{ color: "var(--marketplace-text-primary)" }}>Dados da Oficina</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    Razão Social *
                  </label>
                  <Input
                    value={formData.razaoSocial}
                    onChange={(e) => setFormData((prev) => ({ ...prev, razaoSocial: e.target.value }))}
                    placeholder="Ex: Oficina São José Ltda"
                    className="border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                      borderColor: errors.razaoSocial ? "var(--marketplace-error)" : "transparent",
                    }}
                  />
                  {errors.razaoSocial && (
                    <p className="text-sm mt-1" style={{ color: "var(--marketplace-error)" }}>
                      {errors.razaoSocial}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    CNPJ *
                  </label>
                  <Input
                    value={formData.cnpj}
                    onChange={(e) => {
                      const formatted = formatCNPJ(e.target.value)
                      setFormData((prev) => ({ ...prev, cnpj: formatted }))
                    }}
                    placeholder="00.000.000/0000-00"
                    maxLength={18}
                    className="border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                      borderColor: errors.cnpj ? "var(--marketplace-error)" : "transparent",
                    }}
                  />
                  {errors.cnpj && (
                    <p className="text-sm mt-1" style={{ color: "var(--marketplace-error)" }}>
                      {errors.cnpj}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    Telefone/WhatsApp *
                  </label>
                  <Input
                    value={formData.telefone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, telefone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                    className="border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                      borderColor: errors.telefone ? "var(--marketplace-error)" : "transparent",
                    }}
                  />
                  {errors.telefone && (
                    <p className="text-sm mt-1" style={{ color: "var(--marketplace-error)" }}>
                      {errors.telefone}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="contato@oficina.com"
                    className="border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                      borderColor: errors.email ? "var(--marketplace-error)" : "transparent",
                    }}
                  />
                  {errors.email && (
                    <p className="text-sm mt-1" style={{ color: "var(--marketplace-error)" }}>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--marketplace-bg)" }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--marketplace-text-primary)" }}>
                  Credenciais de Acesso
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--marketplace-text-primary)" }}
                    >
                      Login/ CNPJ *
                    </label>
                    <Input
                      value={formData.login}
                      onChange={(e) => setFormData((prev) => ({ ...prev, login: e.target.value }))}
                      placeholder="Seu login de acesso"
                      className="border-0 pr-10"
                      style={{
                        backgroundColor: "var(--marketplace-card)",
                        color: "var(--marketplace-text-primary)",
                        borderColor: errors.login ? "var(--marketplace-error)" : "transparent",
                      }}
                    />
                    {errors.login && (
                      <p className="text-sm mt-1" style={{ color: "var(--marketplace-error)" }}>
                        {errors.login}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--marketplace-text-primary)" }}
                    >
                      Senha *
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.senha}
                        onChange={(e) => setFormData((prev) => ({ ...prev, senha: e.target.value }))}
                        placeholder="Sua senha"
                        className="border-0 pr-10"
                        style={{
                          backgroundColor: "var(--marketplace-card)",
                          color: "var(--marketplace-text-primary)",
                          borderColor: errors.senha ? "var(--marketplace-error)" : "transparent",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        style={{ color: "var(--marketplace-text-secondary)" }}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.senha && (
                      <p className="text-sm mt-1" style={{ color: "var(--marketplace-error)" }}>
                        {errors.senha}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--marketplace-text-primary)" }}
                    >
                      Confirmar Senha *
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmarSenha}
                        onChange={(e) => setFormData((prev) => ({ ...prev, confirmarSenha: e.target.value }))}
                        placeholder="Confirme sua senha"
                        className="border-0 pr-10"
                        style={{
                          backgroundColor: "var(--marketplace-card)",
                          color: "var(--marketplace-text-primary)",
                          borderColor: errors.confirmarSenha ? "var(--marketplace-error)" : "transparent",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        style={{ color: "var(--marketplace-text-secondary)" }}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmarSenha && (
                      <p className="text-sm mt-1" style={{ color: "var(--marketplace-error)" }}>
                        {errors.confirmarSenha}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    Endereço *
                  </label>
                  <Input
                    value={formData.endereco}
                    onChange={(e) => setFormData((prev) => ({ ...prev, endereco: e.target.value }))}
                    placeholder="Rua, Avenida..."
                    className="border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                      borderColor: errors.endereco ? "var(--marketplace-error)" : "transparent",
                    }}
                  />
                  {errors.endereco && (
                    <p className="text-sm mt-1" style={{ color: "var(--marketplace-error)" }}>
                      {errors.endereco}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    Número *
                  </label>
                  <Input
                    value={formData.numero}
                    onChange={(e) => setFormData((prev) => ({ ...prev, numero: e.target.value }))}
                    placeholder="123"
                    className="border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    Bairro *
                  </label>
                  <Input
                    value={formData.bairro}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bairro: e.target.value }))}
                    placeholder="Centro"
                    className="border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    Cidade *
                  </label>
                  <Input
                    value={formData.cidade}
                    onChange={(e) => setFormData((prev) => ({ ...prev, cidade: e.target.value }))}
                    placeholder="São Paulo"
                    className="border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    CEP *
                  </label>
                  <Input
                    value={formData.cep}
                    onChange={(e) => setFormData((prev) => ({ ...prev, cep: e.target.value }))}
                    placeholder="00000-000"
                    className="border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-4" style={{ color: "var(--marketplace-text-primary)" }}>
                  Horário de Funcionamento *
                </label>
                <div className="space-y-3">
                  {diasSemana.map((dia) => (
                    <div
                      key={dia.key}
                      className="flex items-center gap-4 p-3 rounded-lg"
                      style={{ backgroundColor: "var(--marketplace-bg)" }}
                    >
                      <div className="flex items-center space-x-2 min-w-[120px]">
                        <Checkbox
                          checked={formData.horarioFuncionamento[dia.key as keyof HorarioFuncionamento].ativo}
                          onCheckedChange={(checked) =>
                            handleHorarioChange(dia.key as keyof HorarioFuncionamento, "ativo", !!checked)
                          }
                        />
                        <label className="text-sm font-medium" style={{ color: "var(--marketplace-text-primary)" }}>
                          {dia.label}
                        </label>
                      </div>
                      {formData.horarioFuncionamento[dia.key as keyof HorarioFuncionamento].ativo && (
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            value={formData.horarioFuncionamento[dia.key as keyof HorarioFuncionamento].inicio}
                            onChange={(e) =>
                              handleHorarioChange(dia.key as keyof HorarioFuncionamento, "inicio", e.target.value)
                            }
                            className="w-24 border-0"
                            style={{
                              backgroundColor: "var(--marketplace-card)",
                              color: "var(--marketplace-text-primary)",
                            }}
                          />
                          <span style={{ color: "var(--marketplace-text-secondary)" }}>às</span>
                          <Input
                            type="time"
                            value={formData.horarioFuncionamento[dia.key as keyof HorarioFuncionamento].fim}
                            onChange={(e) =>
                              handleHorarioChange(dia.key as keyof HorarioFuncionamento, "fim", e.target.value)
                            }
                            className="w-24 border-0"
                            style={{
                              backgroundColor: "var(--marketplace-card)",
                              color: "var(--marketplace-text-primary)",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
                  Fotos da Oficina
                </label>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:opacity-80"
                  style={{ borderColor: "var(--marketplace-border)" }}
                >
                  <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--marketplace-text-secondary)" }} />
                  <p style={{ color: "var(--marketplace-text-secondary)" }}>
                    Clique para fazer upload ou arraste as fotos aqui
                  </p>
                  <p className="text-sm mt-1" style={{ color: "var(--marketplace-text-secondary)" }}>
                    Mínimo 1 foto (JPG, PNG até 5MB)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Serviços */}
        {currentStep === 2 && (
          <Card className="border-0" style={{ backgroundColor: "var(--marketplace-card)" }}>
            <CardHeader>
              <CardTitle style={{ color: "var(--marketplace-text-primary)" }}>Serviços Oferecidos</CardTitle>
              <p style={{ color: "var(--marketplace-text-secondary)" }}>
                Selecione todos os serviços que sua oficina oferece
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {servicosDisponiveis.map((categoria) => (
                <div key={categoria.categoria}>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--marketplace-text-primary)" }}>
                    {categoria.categoria}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categoria.servicos.map((servico) => (
                      <div key={servico} className="flex items-center space-x-2">
                        <Checkbox
                          id={servico}
                          checked={formData.servicosSelecionados.includes(servico)}
                          onCheckedChange={() => handleServicoToggle(servico)}
                          style={{ borderColor: "var(--marketplace-border)" }}
                        />
                        <label
                          htmlFor={servico}
                          className="text-sm cursor-pointer"
                          style={{ color: "var(--marketplace-text-primary)" }}
                        >
                          {servico}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {errors.servicos && (
                <p className="text-sm" style={{ color: "var(--marketplace-error)" }}>
                  {errors.servicos}
                </p>
              )}

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
                  Outros Serviços
                </label>
                <Input
                  value={formData.outrosServicos}
                  onChange={(e) => setFormData((prev) => ({ ...prev, outrosServicos: e.target.value }))}
                  placeholder="Descreva outros serviços não listados..."
                  className="border-0"
                  style={{
                    backgroundColor: "var(--marketplace-bg)",
                    color: "var(--marketplace-text-primary)",
                  }}
                />
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--marketplace-bg)" }}>
                <p className="text-sm" style={{ color: "var(--marketplace-text-secondary)" }}>
                  💡 <strong>Dica:</strong> Você pode atualizar essa lista quando quiser após a publicação.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Preview */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card className="border-0" style={{ backgroundColor: "var(--marketplace-card)" }}>
              <CardHeader>
                <CardTitle style={{ color: "var(--marketplace-text-primary)" }}>Prévia do seu Perfil</CardTitle>
                <p style={{ color: "var(--marketplace-text-secondary)" }}>Veja como sua oficina aparecerá nas buscas</p>
              </CardHeader>
              <CardContent>
                {/* Preview Card */}
                <div
                  className="p-6 rounded-lg border-2"
                  style={{
                    backgroundColor: "var(--marketplace-bg)",
                    borderColor: "var(--marketplace-primary)",
                  }}
                >
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
                    {formData.razaoSocial || "Razão Social da Oficina"}
                  </h3>
                  <p className="mb-4" style={{ color: "var(--marketplace-text-secondary)" }}>
                    {formData.servicosSelecionados.slice(0, 2).join(", ") || "Serviços selecionados"}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" style={{ color: "var(--marketplace-stars)" }} />
                      <span className="font-medium" style={{ color: "var(--marketplace-text-primary)" }}>
                        Novo
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" style={{ color: "var(--marketplace-primary)" }} />
                      <span className="text-sm" style={{ color: "var(--marketplace-text-secondary)" }}>
                        {formData.bairro || "Localização"}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full font-semibold"
                    style={{
                      backgroundColor: "var(--marketplace-primary)",
                      color: "white",
                    }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Fale Conosco
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Terms */}
            <Card className="border-0" style={{ backgroundColor: "var(--marketplace-card)" }}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.aceitaTermos}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, aceitaTermos: !!checked }))}
                    style={{ borderColor: "var(--marketplace-border)" }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm cursor-pointer"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    Aceito os <span style={{ color: "var(--marketplace-primary)" }}>Termos de Uso</span> e a{" "}
                    <span style={{ color: "var(--marketplace-primary)" }}>Política de Privacidade</span> (LGPD)
                  </label>
                </div>
              </CardContent>
            </Card>

            {errors.submit && (
              <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--marketplace-error)", color: "white" }}>
                {errors.submit}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
            style={{
              backgroundColor: "var(--marketplace-card)",
              borderColor: "var(--marketplace-border)",
              color: "var(--marketplace-text-primary)",
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              style={{
                backgroundColor: "var(--marketplace-primary)",
                color: "white",
              }}
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!formData.aceitaTermos || isSubmitting}
              style={{
                backgroundColor: formData.aceitaTermos
                  ? "var(--marketplace-success)"
                  : "var(--marketplace-text-secondary)",
                color: "white",
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Publicando...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Publicar Perfil
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

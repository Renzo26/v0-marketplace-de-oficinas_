"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Check, Upload, MapPin, Phone, Star } from "lucide-react"
import Link from "next/link"

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

export default function CadastroOficina() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    telefone: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    horario: "",
    servicosSelecionados: [] as string[],
    outrosServicos: "",
    aceitaTermos: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleNext = () => {
    if (currentStep < 3) {
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

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setShowSuccess(true)
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
                    Nome da Oficina *
                  </label>
                  <Input
                    value={formData.nome}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
                    placeholder="Ex: Oficina São José"
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
                    CNPJ/CPF *
                  </label>
                  <Input
                    value={formData.cnpj}
                    onChange={(e) => setFormData((prev) => ({ ...prev, cnpj: e.target.value }))}
                    placeholder="00.000.000/0000-00"
                    className="border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
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
                  }}
                />
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
                    }}
                  />
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
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
                  Horário de Funcionamento *
                </label>
                <select
                  value={formData.horario}
                  onChange={(e) => setFormData((prev) => ({ ...prev, horario: e.target.value }))}
                  className="w-full p-3 rounded-lg border-0"
                  style={{
                    backgroundColor: "var(--marketplace-bg)",
                    color: "var(--marketplace-text-primary)",
                  }}
                >
                  <option value="">Selecione o horário</option>
                  <option value="8h-18h">8h às 18h</option>
                  <option value="7h-17h">7h às 17h</option>
                  <option value="8h-17h">8h às 17h</option>
                  <option value="24h">24 horas</option>
                </select>
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
                    {formData.nome || "Nome da Oficina"}
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

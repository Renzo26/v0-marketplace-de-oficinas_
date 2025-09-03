"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function CadastroClientePage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    cep: "",
    cidade: "",
    estado: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="marketplace-body min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <Card
            className="border-0 text-center"
            style={{
              backgroundColor: "var(--marketplace-card)",
              borderColor: "var(--marketplace-border)",
            }}
          >
            <CardContent className="p-8">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "var(--marketplace-success)" }}
              >
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--marketplace-text-primary)" }}>
                Cadastro Realizado!
              </h2>
              <p className="mb-6" style={{ color: "var(--marketplace-text-secondary)" }}>
                Sua conta foi criada com sucesso. Agora você pode fazer login e começar a buscar oficinas.
              </p>
              <Link href="/login">
                <Button
                  className="w-full font-semibold"
                  style={{
                    backgroundColor: "var(--marketplace-primary)",
                    color: "white",
                  }}
                >
                  Fazer Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="marketplace-body min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Link href="/login">
            <Button
              variant="outline"
              className="bg-transparent"
              style={{
                backgroundColor: "var(--marketplace-card)",
                borderColor: "var(--marketplace-border)",
                color: "var(--marketplace-text-primary)",
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>

        <Card
          className="border-0"
          style={{
            backgroundColor: "var(--marketplace-card)",
            borderColor: "var(--marketplace-border)",
          }}
        >
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <User className="w-12 h-12" style={{ color: "var(--marketplace-primary)" }} />
            </div>
            <CardTitle className="text-2xl" style={{ color: "var(--marketplace-text-primary)" }}>
              Cadastro de Cliente
            </CardTitle>
            <p style={{ color: "var(--marketplace-text-secondary)" }}>
              Crie sua conta para encontrar as melhores oficinas
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full p-3 rounded-lg border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                      borderColor: "var(--marketplace-border)",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full p-3 rounded-lg border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                      borderColor: "var(--marketplace-border)",
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full p-3 rounded-lg border-0"
                  style={{
                    backgroundColor: "var(--marketplace-bg)",
                    color: "var(--marketplace-text-primary)",
                    borderColor: "var(--marketplace-border)",
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    Senha *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 rounded-lg border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                      borderColor: "var(--marketplace-border)",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    Confirmar Senha *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmarSenha}
                    onChange={(e) => handleInputChange("confirmarSenha", e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 rounded-lg border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                      borderColor: "var(--marketplace-border)",
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
                    CEP *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cep}
                    onChange={(e) => handleInputChange("cep", e.target.value)}
                    placeholder="00000-000"
                    className="w-full p-3 rounded-lg border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                      borderColor: "var(--marketplace-border)",
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
                  <input
                    type="text"
                    required
                    value={formData.cidade}
                    onChange={(e) => handleInputChange("cidade", e.target.value)}
                    placeholder="Sua cidade"
                    className="w-full p-3 rounded-lg border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                      borderColor: "var(--marketplace-border)",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--marketplace-text-primary)" }}
                  >
                    Estado *
                  </label>
                  <select
                    required
                    value={formData.estado}
                    onChange={(e) => handleInputChange("estado", e.target.value)}
                    className="w-full p-3 rounded-lg border-0"
                    style={{
                      backgroundColor: "var(--marketplace-bg)",
                      color: "var(--marketplace-text-primary)",
                      borderColor: "var(--marketplace-border)",
                    }}
                  >
                    <option value="">Selecione</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="PR">Paraná</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="BA">Bahia</option>
                    <option value="GO">Goiás</option>
                    <option value="PE">Pernambuco</option>
                    <option value="CE">Ceará</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full font-semibold py-3"
                  style={{
                    backgroundColor: "var(--marketplace-primary)",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--marketplace-primary-hover)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--marketplace-primary)"
                  }}
                >
                  Criar Conta
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm" style={{ color: "var(--marketplace-text-secondary)" }}>
                  Já tem uma conta?{" "}
                  <Link href="/login" className="font-medium" style={{ color: "var(--marketplace-primary)" }}>
                    Faça login
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

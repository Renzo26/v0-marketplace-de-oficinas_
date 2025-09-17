"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Wrench, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [selectedType, setSelectedType] = useState<"cliente" | "oficina" | null>(null)

  if (!selectedType) {
    return (
      <div className="marketplace-body min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <div className="mb-6">
            <Link href="/">
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

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--marketplace-primary)" }}>
              Bem-vindo!
            </h1>
            <p className="text-lg" style={{ color: "var(--marketplace-text-secondary)" }}>
              Como você gostaria de acessar o sistema?
            </p>
          </div>

          <div className="space-y-4">
            <Card
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-0"
              style={{
                backgroundColor: "var(--marketplace-card)",
                borderColor: "var(--marketplace-border)",
              }}
              onClick={() => setSelectedType("cliente")}
            >
              <CardContent className="p-8 text-center">
                <User className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--marketplace-primary)" }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
                  Sou Cliente
                </h3>
                <p style={{ color: "var(--marketplace-text-secondary)" }}>
                  Quero encontrar oficinas e serviços automotivos
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-0"
              style={{
                backgroundColor: "var(--marketplace-card)",
                borderColor: "var(--marketplace-border)",
              }}
              onClick={() => setSelectedType("oficina")}
            >
              <CardContent className="p-8 text-center">
                <Wrench className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--marketplace-primary)" }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
                  Tenho uma Oficina
                </h3>
                <p style={{ color: "var(--marketplace-text-secondary)" }}>
                  Quero cadastrar minha oficina e receber clientes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="marketplace-body min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="mb-6">
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => setSelectedType(null)}
            style={{
              backgroundColor: "var(--marketplace-card)",
              borderColor: "var(--marketplace-border)",
              color: "var(--marketplace-text-primary)",
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
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
              {selectedType === "cliente" ? (
                <User className="w-12 h-12" style={{ color: "var(--marketplace-primary)" }} />
              ) : (
                <Wrench className="w-12 h-12" style={{ color: "var(--marketplace-primary)" }} />
              )}
            </div>
            <CardTitle className="text-2xl" style={{ color: "var(--marketplace-text-primary)" }}>
              {selectedType === "cliente" ? "Login Cliente" : "Login Oficina"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
                  {selectedType === "oficina" ? "CNPJ" : "Email"}
                </label>
                <input
                  type={selectedType === "oficina" ? "text" : "email"}
                  placeholder={selectedType === "oficina" ? "00.000.000/0000-00" : "seu@email.com"}
                  className="w-full p-3 rounded-lg border-0"
                  style={{
                    backgroundColor: "var(--marketplace-bg)",
                    color: "var(--marketplace-text-primary)",
                    borderColor: "var(--marketplace-border)",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
                  Senha
                </label>
                <input
                  type="password"
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

            <Button
              className="w-full font-semibold"
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
              Entrar
            </Button>

            <div className="text-center">
              <p className="text-sm" style={{ color: "var(--marketplace-text-secondary)" }}>
                Não tem uma conta?{" "}
                {selectedType === "cliente" ? (
                  <Link
                    href="/cadastro-cliente"
                    className="font-medium"
                    style={{ color: "var(--marketplace-primary)" }}
                  >
                    Cadastre-se como cliente
                  </Link>
                ) : (
                  <Link
                    href="/cadastro-oficina"
                    className="font-medium"
                    style={{ color: "var(--marketplace-primary)" }}
                  >
                    Cadastre sua oficina
                  </Link>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

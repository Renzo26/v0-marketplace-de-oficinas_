"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiService } from "@/lib/api"

export function ApiTestPanel() {
  const [testResult, setTestResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const testCadastroOficina = async () => {
    setIsLoading(true)
    setTestResult("Testando endpoint de cadastro...")

    try {
      const testData = {
        razaoSocial: "Oficina Teste Ltda",
        cnpj: "12.345.678/0001-90",
        telefone: "(11) 98765-4321",
        email: "teste@oficina.com",
        endereco: "Rua Teste, 123 - Centro, São Paulo/SP",
        servicos: ["Troca de óleo", "Freios", "Suspensão"],
        horarioFuncionamento: {
          segunda: { inicio: "08:00", fim: "18:00", ativo: true },
          terca: { inicio: "08:00", fim: "18:00", ativo: true },
          quarta: { inicio: "08:00", fim: "18:00", ativo: true },
          quinta: { inicio: "08:00", fim: "18:00", ativo: true },
          sexta: { inicio: "08:00", fim: "18:00", ativo: true },
          sabado: { inicio: "08:00", fim: "12:00", ativo: false },
          domingo: { inicio: "08:00", fim: "12:00", ativo: false },
        },
        login: "oficina_teste",
        senha: "senha123",
      }

      console.log("[v0] Iniciando teste de cadastro de oficina...")
      const response = await apiService.cadastrarOficina(testData)

      setTestResult(`✅ SUCESSO!\n\nResposta do servidor:\n${JSON.stringify(response, null, 2)}`)
    } catch (error) {
      setTestResult(
        `❌ ERRO!\n\n${error instanceof Error ? error.message : "Erro desconhecido"}\n\nVerifique o console para mais detalhes.`,
      )
    } finally {
      setIsLoading(false)
    }
  }

  const testGetOficinas = async () => {
    setIsLoading(true)
    setTestResult("Testando endpoint de listagem...")

    try {
      console.log("[v0] Iniciando teste de listagem de oficinas...")
      const response = await apiService.getOficinas()

      setTestResult(
        `✅ SUCESSO!\n\nOficinas encontradas: ${response.data?.length || 0}\n\nResposta:\n${JSON.stringify(response, null, 2)}`,
      )
    } catch (error) {
      setTestResult(
        `❌ ERRO!\n\n${error instanceof Error ? error.message : "Erro desconhecido"}\n\nVerifique o console para mais detalhes.`,
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-0" style={{ backgroundColor: "var(--marketplace-card)" }}>
      <CardHeader>
        <CardTitle style={{ color: "var(--marketplace-text-primary)" }}>Painel de Testes de API</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={testCadastroOficina}
            disabled={isLoading}
            style={{
              backgroundColor: "var(--marketplace-primary)",
              color: "white",
            }}
          >
            {isLoading ? "Testando..." : "Testar POST /oficinas"}
          </Button>
          <Button
            onClick={testGetOficinas}
            disabled={isLoading}
            variant="outline"
            style={{
              borderColor: "var(--marketplace-primary)",
              color: "var(--marketplace-primary)",
            }}
          >
            {isLoading ? "Testando..." : "Testar GET /oficinas"}
          </Button>
        </div>

        {testResult && (
          <pre
            className="p-4 rounded-lg text-sm overflow-auto max-h-96"
            style={{
              backgroundColor: "var(--marketplace-bg)",
              color: "var(--marketplace-text-primary)",
            }}
          >
            {testResult}
          </pre>
        )}

        <div
          className="p-4 rounded-lg text-sm"
          style={{
            backgroundColor: "var(--marketplace-bg)",
            color: "var(--marketplace-text-secondary)",
          }}
        >
          <p className="font-semibold mb-2">📝 Instruções:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Configure a variável NEXT_PUBLIC_API_URL com a URL do seu backend Java</li>
            <li>Abra o Console do navegador (F12) para ver os logs detalhados</li>
            <li>Os logs mostram: dados enviados, resposta recebida e status da requisição</li>
            <li>Use esses testes para validar a integração com o backend</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

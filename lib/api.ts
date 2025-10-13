interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

interface OficinaData {
  id: number
  razaoSocial: string
  cnpj: string
  telefone: string
  email: string
  endereco: string
  servicos: string[]
  horarioFuncionamento: HorarioFuncionamento
  avaliacao: number
  numeroAvaliacoes: number
  foto?: string
}

interface HorarioFuncionamento {
  segunda: { inicio: string; fim: string; ativo: boolean }
  terca: { inicio: string; fim: string; ativo: boolean }
  quarta: { inicio: string; fim: string; ativo: boolean }
  quinta: { inicio: string; fim: string; ativo: boolean }
  sexta: { inicio: string; fim: string; ativo: boolean }
  sabado: { inicio: string; fim: string; ativo: boolean }
  domingo: { inicio: string; fim: string; ativo: boolean }
}

interface CadastroOficinaData {
  razaoSocial: string
  cnpj: string
  telefone: string
  email: string
  endereco: string
  servicos: string[]
  horarioFuncionamento: HorarioFuncionamento
  login: string
  senha: string
}

interface CadastroClienteData {
  nome: string
  email: string
  telefone: string
  cpf: string
  endereco: string
  login: string
  senha: string
}

interface LoginData {
  login: string
  senha: string
}

class ApiService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

  constructor() {
    console.log("[v0] 🔧 ApiService inicializado")
    console.log("[v0] Base URL configurada:", this.baseUrl)
    console.log("[v0] Variável de ambiente NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL || "não configurada")
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const fullUrl = `${this.baseUrl}${endpoint}`

    try {
      console.log("[v0] ========== REQUISIÇÃO HTTP ==========")
      console.log("[v0] 🌐 URL completa:", fullUrl)
      console.log("[v0] 📝 Método:", options.method || "GET")
      console.log(
        "[v0] 📋 Headers:",
        JSON.stringify(
          {
            "Content-Type": "application/json",
            ...options.headers,
          },
          null,
          2,
        ),
      )

      if (options.body) {
        console.log("[v0] 📦 Body:", options.body)
      }

      console.log("[v0] 🚀 Enviando requisição...")
      const response = await fetch(fullUrl, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      console.log("[v0] 📨 Resposta recebida")
      console.log("[v0] Status:", response.status, response.statusText)
      console.log("[v0] Headers da resposta:", JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2))

      const contentType = response.headers.get("content-type")
      let data: any

      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
        console.log("[v0] 📄 Dados JSON recebidos:", JSON.stringify(data, null, 2))
      } else {
        const text = await response.text()
        console.log("[v0] 📄 Resposta em texto:", text)
        data = { message: text }
      }

      if (!response.ok) {
        console.error("[v0] ❌ Erro HTTP:", response.status)
        console.error("[v0] Mensagem de erro:", data.message || "Erro na requisição")
        throw new Error(data.message || `Erro HTTP ${response.status}: ${response.statusText}`)
      }

      console.log("[v0] ✅ Requisição bem-sucedida")
      console.log("[v0] ========================================")

      return {
        data: data.data || data,
        success: true,
        message: data.message,
      }
    } catch (error) {
      console.log("[v0] ========== ERRO NA REQUISIÇÃO ==========")
      console.error("[v0] ❌ Falha na requisição")
      console.error("[v0] URL:", fullUrl)
      console.error("[v0] Erro:", error)

      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.error("[v0] 🔌 Erro de conexão - Backend pode estar offline")
        console.error("[v0] Verifique se o backend Java está rodando em:", this.baseUrl)
      }

      console.log("[v0] ========================================")
      throw error
    }
  }

  // Oficinas endpoints
  async getOficinas(filters?: {
    search?: string
    distance?: number
    rating?: number
    horario?: string
  }): Promise<ApiResponse<OficinaData[]>> {
    const params = new URLSearchParams()
    if (filters?.search) params.append("search", filters.search)
    if (filters?.distance) params.append("distance", filters.distance.toString())
    if (filters?.rating) params.append("rating", filters.rating.toString())
    if (filters?.horario) params.append("horario", filters.horario)

    return this.request<OficinaData[]>(`/oficinas?${params.toString()}`)
  }

  async getOficinaById(id: number): Promise<ApiResponse<OficinaData>> {
    return this.request<OficinaData>(`/oficinas/${id}`)
  }

  async cadastrarOficina(data: CadastroOficinaData): Promise<ApiResponse<OficinaData>> {
    console.log("[v0] 📝 Preparando cadastro de oficina")
    console.log("[v0] Dados recebidos:")
    console.log("[v0] - Razão Social:", data.razaoSocial)
    console.log("[v0] - CNPJ:", data.cnpj)
    console.log("[v0] - Email:", data.email)
    console.log("[v0] - Telefone:", data.telefone)
    console.log("[v0] - Endereço:", data.endereco)
    console.log("[v0] - Login:", data.login)
    console.log("[v0] - Serviços:", data.servicos.length, "selecionados")
    console.log("[v0] - Horários configurados:", Object.keys(data.horarioFuncionamento).length, "dias")

    return this.request<OficinaData>("/oficinas", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async atualizarOficina(id: number, data: Partial<CadastroOficinaData>): Promise<ApiResponse<OficinaData>> {
    return this.request<OficinaData>(`/oficinas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deletarOficina(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/oficinas/${id}`, {
      method: "DELETE",
    })
  }

  // Clientes endpoints
  async cadastrarCliente(data: CadastroClienteData): Promise<ApiResponse<any>> {
    return this.request<any>("/clientes", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Auth endpoints
  async login(data: LoginData): Promise<ApiResponse<{ token: string; user: any }>> {
    return this.request<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request<void>("/auth/logout", {
      method: "POST",
    })
  }
}

export const apiService = new ApiService()
export type { OficinaData, CadastroOficinaData, CadastroClienteData, HorarioFuncionamento, LoginData }

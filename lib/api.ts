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

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Erro na requisição")
      }

      return data
    } catch (error) {
      console.error("API Error:", error)
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

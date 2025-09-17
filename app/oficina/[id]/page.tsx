"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Star, Phone, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const mockOficinaDetalhes = {
  1: {
    id: 1,
    nome: "Oficina São José",
    banner: "/oficina-mecanica-moderna-banner.png",
    avaliacao: 4.8,
    numeroAvaliacoes: 127,
    endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
    horario: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h",
    telefone: "5511999999999",
    whatsapp: "5511999999999",
    servicos: ["Mecânica Geral", "Troca de Óleo", "Filtros", "Revisão Geral", "Diagnóstico", "Freios"],
    avaliacoes: [
      {
        nome: "João Silva",
        comentario: "Excelente atendimento e preço justo. Recomendo!",
        nota: 5,
        data: "15/12/2024",
      },
      {
        nome: "Maria Santos",
        comentario: "Profissionais competentes e honestos.",
        nota: 5,
        data: "10/12/2024",
      },
      {
        nome: "Carlos Oliveira",
        comentario: "Bom serviço, mas demorou um pouco mais que o esperado.",
        nota: 4,
        data: "05/12/2024",
      },
    ],
  },
  2: {
    id: 2,
    nome: "Auto Mecânica Brasil",
    banner: "/oficina-freios-suspensao.png",
    avaliacao: 4.5,
    numeroAvaliacoes: 89,
    endereco: "Av. Brasil, 456 - Vila Nova, São Paulo - SP",
    horario: "Segunda a Sexta: 7h às 17h",
    telefone: "5511888888888",
    whatsapp: "5511888888888",
    servicos: ["Freios", "Suspensão", "Alinhamento", "Balanceamento", "Amortecedores", "Pastilhas"],
    avaliacoes: [
      {
        nome: "Ana Costa",
        comentario: "Especialistas em freios! Serviço de qualidade.",
        nota: 5,
        data: "18/12/2024",
      },
      {
        nome: "Pedro Lima",
        comentario: "Resolveram o problema da suspensão rapidamente.",
        nota: 4,
        data: "12/12/2024",
      },
      {
        nome: "Lucia Ferreira",
        comentario: "Preço justo e bom atendimento.",
        nota: 4,
        data: "08/12/2024",
      },
    ],
  },
  3: {
    id: 3,
    nome: "Chaveiro Rápido",
    banner: "/chaveiro-automotivo.png",
    avaliacao: 4.9,
    numeroAvaliacoes: 203,
    endereco: "Rua do Comércio, 789 - Centro, São Paulo - SP",
    horario: "Segunda a Sábado: 8h às 20h",
    telefone: "5511777777777",
    whatsapp: "5511777777777",
    servicos: [
      "Chaves Automotivas",
      "Cópias de Chaves",
      "Programação",
      "Chaves Codificadas",
      "Controles",
      "Emergência 24h",
    ],
    avaliacoes: [
      {
        nome: "Roberto Silva",
        comentario: "Atendimento 24h salvou minha vida! Super recomendo.",
        nota: 5,
        data: "20/12/2024",
      },
      {
        nome: "Fernanda Alves",
        comentario: "Fizeram a programação da chave na hora.",
        nota: 5,
        data: "16/12/2024",
      },
      {
        nome: "Marcos Pereira",
        comentario: "Preço excelente e serviço rápido.",
        nota: 5,
        data: "14/12/2024",
      },
    ],
  },
  4: {
    id: 4,
    nome: "Mecânica do João",
    banner: "/mecanica-motor-embreagem.png",
    avaliacao: 4.6,
    numeroAvaliacoes: 156,
    endereco: "Rua São João, 321 - Jardim, São Paulo - SP",
    horario: "Segunda a Sexta: 8h às 18h",
    telefone: "5511666666666",
    whatsapp: "5511666666666",
    servicos: ["Motor", "Embreagem", "Câmbio", "Injeção Eletrônica", "Retífica", "Diagnóstico"],
    avaliacoes: [
      {
        nome: "José Santos",
        comentario: "João é um mestre! Resolveu problema que ninguém conseguia.",
        nota: 5,
        data: "19/12/2024",
      },
      {
        nome: "Carla Mendes",
        comentario: "Embreagem nova funcionando perfeitamente.",
        nota: 4,
        data: "13/12/2024",
      },
      {
        nome: "Ricardo Souza",
        comentario: "Bom preço e qualidade no serviço.",
        nota: 4,
        data: "09/12/2024",
      },
    ],
  },
  5: {
    id: 5,
    nome: "Auto Elétrica Silva",
    banner: "/auto-eletrica-bateria.png",
    avaliacao: 4.7,
    numeroAvaliacoes: 94,
    endereco: "Av. Silva, 654 - Industrial, São Paulo - SP",
    horario: "Segunda a Sexta: 7h30 às 17h30",
    telefone: "5511555555555",
    whatsapp: "5511555555555",
    servicos: ["Elétrica Automotiva", "Bateria", "Alternador", "Motor de Partida", "Instalação Som", "Alarmes"],
    avaliacoes: [
      {
        nome: "Amanda Rocha",
        comentario: "Instalaram meu som automotivo perfeitamente.",
        nota: 5,
        data: "17/12/2024",
      },
      {
        nome: "Bruno Costa",
        comentario: "Problema elétrico resolvido rapidamente.",
        nota: 4,
        data: "11/12/2024",
      },
      {
        nome: "Silvia Martins",
        comentario: "Bateria nova com ótimo preço.",
        nota: 5,
        data: "07/12/2024",
      },
    ],
  },
  6: {
    id: 6,
    nome: "Pneus & Cia",
    banner: "/loja-pneus-alinhamento.png",
    avaliacao: 4.4,
    numeroAvaliacoes: 78,
    endereco: "Rua dos Pneus, 987 - Comercial, São Paulo - SP",
    horario: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h",
    telefone: "5511444444444",
    whatsapp: "5511444444444",
    servicos: ["Pneus", "Alinhamento", "Balanceamento", "Geometria", "Rodas", "Calibragem"],
    avaliacoes: [
      {
        nome: "Diego Oliveira",
        comentario: "Pneus de qualidade com bom preço.",
        nota: 4,
        data: "21/12/2024",
      },
      {
        nome: "Patricia Lima",
        comentario: "Alinhamento perfeito, carro rodando suave.",
        nota: 5,
        data: "15/12/2024",
      },
      {
        nome: "Gustavo Reis",
        comentario: "Atendimento bom, mas poderia ser mais rápido.",
        nota: 4,
        data: "10/12/2024",
      },
    ],
  },
}

interface Oficina {
  id: number
  nome: string
  banner: string
  avaliacao: number
  numeroAvaliacoes: number
  endereco: string
  horario: string
  telefone: string
  whatsapp: string
  servicos: string[]
  avaliacoes: Array<{
    nome: string
    comentario: string
    nota: number
    data: string
  }>
}

const getOficinaById = async (id: number): Promise<Oficina | null> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await fetch(`/api/oficinas/${id}`)
  // return response.ok ? await response.json() : null

  return mockOficinaDetalhes[id as keyof typeof mockOficinaDetalhes] || null
}

export default function OficinaProfile() {
  const params = useParams()
  const oficinaId = Number(params.id)

  const oficina = mockOficinaDetalhes[oficinaId as keyof typeof mockOficinaDetalhes]

  if (!oficina) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#F5F5F5" }}>
            Oficina não encontrada
          </h1>
          <Link href="/">
            <Button style={{ backgroundColor: "#3B82F6", color: "white" }}>Voltar ao início</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0D0D0D" }}>
      {/* Header com botão voltar */}
      <header className="p-4 border-b" style={{ borderColor: "rgba(245,245,245,0.1)" }}>
        <div className="container mx-auto max-w-6xl">
          <Link href="/">
            <Button variant="ghost" className="mb-4" style={{ color: "#F5F5F5" }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-6xl py-6">
        {/* Banner da oficina */}
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
          <img
            src={oficina.banner || "/placeholder.svg"}
            alt={`Banner da ${oficina.nome}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações principais */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4" style={{ color: "#F5F5F5" }}>
              {oficina.nome}
            </h1>

            {/* Avaliação */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(oficina.avaliacao) ? "fill-current" : ""}`}
                    style={{ color: "#FACC15" }}
                  />
                ))}
              </div>
              <span className="font-semibold text-lg" style={{ color: "#F5F5F5" }}>
                {oficina.avaliacao}
              </span>
              <span style={{ color: "#A1A1AA" }}>({oficina.numeroAvaliacoes} avaliações)</span>
            </div>

            {/* Endereço */}
            <div className="flex items-start gap-2 mb-4">
              <MapPin className="w-5 h-5 mt-1" style={{ color: "#3B82F6" }} />
              <span style={{ color: "#A1A1AA" }}>{oficina.endereco}</span>
            </div>

            {/* Horário */}
            <div className="flex items-start gap-2 mb-6">
              <Clock className="w-5 h-5 mt-1" style={{ color: "#A1A1AA" }} />
              <span style={{ color: "#A1A1AA" }}>{oficina.horario}</span>
            </div>

            {/* Serviços oferecidos */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: "#F5F5F5" }}>
                Serviços Oferecidos
              </h2>
              <div className="flex flex-wrap gap-2">
                {oficina.servicos.map((servico, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 rounded-xl text-sm font-medium"
                    style={{
                      backgroundColor: "#1C1C1E",
                      color: "#F5F5F5",
                    }}
                  >
                    {servico}
                  </span>
                ))}
              </div>
            </div>

            {/* Avaliações de clientes */}
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#F5F5F5" }}>
                Avaliações de Clientes
              </h2>
              <div className="space-y-4">
                {oficina.avaliacoes.map((avaliacao, index) => (
                  <Card key={index} style={{ backgroundColor: "#1C1C1E", border: "none" }}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold" style={{ color: "#F5F5F5" }}>
                          {avaliacao.nome}
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < avaliacao.nota ? "fill-current" : ""}`}
                              style={{ color: "#FACC15" }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mb-2" style={{ color: "#A1A1AA" }}>
                        {avaliacao.comentario}
                      </p>
                      <span className="text-sm" style={{ color: "#A1A1AA" }}>
                        {avaliacao.data}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Seção de contato */}
          <div className="lg:col-span-1">
            <Card style={{ backgroundColor: "#1C1C1E", border: "none" }} className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: "#F5F5F5" }}>
                  Entre em Contato
                </h3>

                <div className="space-y-3 mb-6">
                  <Button
                    className="w-full justify-start"
                    onClick={() => window.open(`https://wa.me/${oficina.whatsapp}`, "_blank")}
                    style={{
                      backgroundColor: "var(--marketplace-contact)",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--marketplace-contact-hover)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--marketplace-contact)"
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    Fale Conosco
                  </Button>

                  <Button
                    className="w-full justify-start"
                    onClick={() => window.open(`tel:${oficina.telefone}`, "_self")}
                    style={{
                      backgroundColor: "#1C1C1E",
                      color: "#F5F5F5",
                      cursor: "pointer",
                      border: "1px solid rgba(245,245,245,0.1)",
                    }}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Ligar
                  </Button>

                  <Button
                    className="w-full justify-start"
                    onClick={() =>
                      window.open(`https://maps.google.com/?q=${encodeURIComponent(oficina.endereco)}`, "_blank")
                    }
                    style={{
                      backgroundColor: "#1C1C1E",
                      color: "#F5F5F5",
                      cursor: "pointer",
                      border: "1px solid rgba(245,245,245,0.1)",
                    }}
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Ver no Mapa
                  </Button>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: "rgba(245,245,245,0.1)" }}>
                  <p className="text-sm mb-1" style={{ color: "#A1A1AA" }}>
                    Telefone:
                  </p>
                  <p className="font-medium" style={{ color: "#F5F5F5" }}>
                    {oficina.telefone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4")}
                  </p>

                  <p className="text-sm mb-1 mt-3" style={{ color: "#A1A1AA" }}>
                    WhatsApp:
                  </p>
                  <p className="font-medium" style={{ color: "#F5F5F5" }}>
                    {oficina.whatsapp.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

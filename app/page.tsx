"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Star, Phone, Search, Filter, User, LogIn, Clock } from "lucide-react"
import Link from "next/link"

const mockOficinas = [
  {
    id: 1,
    nome: "Oficina São José",
    servicos: ["Troca de óleo", "Filtros", "Revisão geral"],
    avaliacao: 4.8,
    numeroAvaliacoes: 127,
    distancia: "1.2 km",
    telefone: "5511999999999",
    foto: "/oficina-mecanica-moderna.png",
    endereco: "Rua das Flores, 123 - Centro",
    horario: "Seg-Sex: 8h-18h | Sáb: 8h-12h",
  },
  {
    id: 2,
    nome: "Auto Mecânica Brasil",
    servicos: ["Freios", "Suspensão", "Alinhamento", "Balanceamento"],
    avaliacao: 4.5,
    numeroAvaliacoes: 89,
    distancia: "2.5 km",
    telefone: "5511888888888",
    foto: "/oficina-freios-suspensao.png",
    endereco: "Av. Brasil, 456 - Vila Nova",
    horario: "Seg-Sex: 7h-17h",
  },
  {
    id: 3,
    nome: "Chaveiro Rápido",
    servicos: ["Chaves automotivas", "Cópias", "Programação"],
    avaliacao: 4.9,
    numeroAvaliacoes: 203,
    distancia: "3.0 km",
    telefone: "5511777777777",
    foto: "/chaveiro-automotivo.png",
    endereco: "Rua do Comércio, 789 - Centro",
    horario: "Seg-Sáb: 8h-20h",
  },
  {
    id: 4,
    nome: "Mecânica do João",
    servicos: ["Motor", "Embreagem", "Câmbio", "Injeção eletrônica"],
    avaliacao: 4.6,
    numeroAvaliacoes: 156,
    distancia: "1.8 km",
    telefone: "5511666666666",
    foto: "/mecanica-motor-embreagem.png",
    endereco: "Rua São João, 321 - Jardim",
    horario: "Seg-Sex: 8h-18h",
  },
  {
    id: 5,
    nome: "Auto Elétrica Silva",
    servicos: ["Elétrica automotiva", "Bateria", "Alternador"],
    avaliacao: 4.7,
    numeroAvaliacoes: 94,
    distancia: "4.2 km",
    telefone: "5511555555555",
    foto: "/auto-eletrica-bateria.png",
    endereco: "Av. Silva, 654 - Industrial",
    horario: "Seg-Sex: 7h30-17h30",
  },
  {
    id: 6,
    nome: "Pneus & Cia",
    servicos: ["Pneus", "Alinhamento", "Balanceamento", "Geometria"],
    avaliacao: 4.4,
    numeroAvaliacoes: 78,
    distancia: "2.1 km",
    telefone: "5511444444444",
    foto: "/loja-pneus-alinhamento.png",
    endereco: "Rua dos Pneus, 987 - Comercial",
    horario: "Seg-Sex: 8h-18h | Sáb: 8h-14h",
  },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistance, setSelectedDistance] = useState("")
  const [selectedRating, setSelectedRating] = useState("")
  const [selectedSchedule, setSelectedSchedule] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredOficinas = mockOficinas.filter((oficina) => {
    const matchesSearch =
      oficina.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      oficina.servicos.some((servico) => servico.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesDistance =
      !selectedDistance || Number.parseFloat(oficina.distancia) <= Number.parseFloat(selectedDistance)

    const matchesRating = !selectedRating || oficina.avaliacao >= Number.parseFloat(selectedRating)

    const matchesSchedule = !selectedSchedule || oficina.horario.toLowerCase().includes(selectedSchedule.toLowerCase())

    return matchesSearch && matchesDistance && matchesRating && matchesSchedule
  })

  return (
    <div className="marketplace-body min-h-screen">
      <header
        className="w-full h-16 border-b border-opacity-10"
        style={{
          backgroundColor: "var(--marketplace-bg)",
          borderColor: "var(--marketplace-border)",
        }}
      >
        <div className="container mx-auto px-4 max-w-7xl h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
              <h1
                className="text-xl font-bold"
                style={{
                  color: "var(--marketplace-primary)",
                }}
              >
                Marketplace de Oficinas
              </h1>
            </div>

            {/* Navbar buttons */}
            <div className="flex gap-3">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="px-4 py-2 rounded-lg bg-transparent"
                  style={{
                    backgroundColor: "#1C1C1E",
                    borderColor: "rgba(245,245,245,0.06)",
                    color: "#F5F5F5",
                    cursor: "pointer",
                  }}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  className="px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: "var(--marketplace-primary)",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--marketplace-primary-hover)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--marketplace-primary)"
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="w-full pt-8 pb-6" style={{ backgroundColor: "var(--marketplace-bg)" }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: "var(--marketplace-text-secondary)" }}
              />
              <Input
                placeholder="Buscar por serviço, oficina ou região..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base border-0 rounded-xl"
                style={{
                  backgroundColor: "var(--marketplace-card)",
                  color: "var(--marketplace-text-primary)",
                  borderColor: "rgba(245,245,245,0.06)",
                }}
              />
            </div>
            <Button
              className="h-12 px-6 font-semibold rounded-xl"
              style={{
                backgroundColor: "var(--marketplace-primary)",
                color: "white",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--marketplace-primary-hover)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--marketplace-primary)"
              }}
            >
              Buscar
            </Button>
            <Button
              variant="outline"
              className="h-12 px-4 bg-transparent rounded-xl"
              onClick={() => setShowFilters(!showFilters)}
              style={{
                backgroundColor: "var(--marketplace-card)",
                borderColor: "rgba(245,245,245,0.06)",
                color: "var(--marketplace-text-primary)",
                cursor: "pointer",
              }}
            >
              <Filter className="w-5 h-5 mr-2" />
              Filtros
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Filters */}
        {showFilters && (
          <div className="p-6 rounded-lg mb-6" style={{ backgroundColor: "var(--marketplace-card)" }}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
                  Distância
                </label>
                <select
                  value={selectedDistance}
                  onChange={(e) => setSelectedDistance(e.target.value)}
                  className="w-full p-2 rounded-lg border-0"
                  style={{
                    backgroundColor: "var(--marketplace-bg)",
                    color: "var(--marketplace-text-primary)",
                    borderColor: "var(--marketplace-border)",
                  }}
                >
                  <option value="">Qualquer distância</option>
                  <option value="2">Até 2 km</option>
                  <option value="5">Até 5 km</option>
                  <option value="10">Até 10 km</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
                  Avaliação mínima
                </label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full p-2 rounded-lg border-0"
                  style={{
                    backgroundColor: "var(--marketplace-bg)",
                    color: "var(--marketplace-text-primary)",
                    borderColor: "var(--marketplace-border)",
                  }}
                >
                  <option value="">Qualquer avaliação</option>
                  <option value="3">★ 3.0+</option>
                  <option value="4">★ 4.0+</option>
                  <option value="4.5">★ 4.5+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
                  Horário de funcionamento
                </label>
                <select
                  value={selectedSchedule}
                  onChange={(e) => setSelectedSchedule(e.target.value)}
                  className="w-full p-2 rounded-lg border-0"
                  style={{
                    backgroundColor: "var(--marketplace-bg)",
                    color: "var(--marketplace-text-primary)",
                    borderColor: "var(--marketplace-border)",
                  }}
                >
                  <option value="">Qualquer horário</option>
                  <option value="seg">Segunda-feira</option>
                  <option value="ter">Terça-feira</option>
                  <option value="qua">Quarta-feira</option>
                  <option value="qui">Quinta-feira</option>
                  <option value="sex">Sexta-feira</option>
                  <option value="sáb">Sábado</option>
                  <option value="dom">Domingo</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedDistance("")
                    setSelectedRating("")
                    setSelectedSchedule("")
                    setSearchTerm("")
                  }}
                  className="w-full"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "var(--marketplace-border)",
                    color: "var(--marketplace-text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {filteredOficinas.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--marketplace-text-primary)" }}>
              Nenhuma oficina encontrada
            </h3>
            <p className="mb-6" style={{ color: "var(--marketplace-text-secondary)" }}>
              Nenhuma oficina encontrada para este filtro.
            </p>
            <Button
              onClick={() => {
                setSelectedDistance("")
                setSelectedRating("")
                setSelectedSchedule("")
                setSearchTerm("")
              }}
              style={{
                backgroundColor: "var(--marketplace-primary)",
                color: "white",
                cursor: "pointer",
              }}
            >
              Limpar filtros
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredOficinas.map((oficina) => (
                <Link key={oficina.id} href={`/oficina/${oficina.id}`}>
                  <Card
                    className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-0 cursor-pointer"
                    style={{
                      backgroundColor: "var(--marketplace-card)",
                      borderColor: "var(--marketplace-border)",
                    }}
                  >
                    <CardContent className="p-0">
                      {/* Banner da oficina */}
                      <div className="relative h-32 rounded-t-lg overflow-hidden">
                        <img
                          src={oficina.foto || "/placeholder.svg"}
                          alt={`Foto da ${oficina.nome}`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2" style={{ color: "#F5F5F5" }}>
                          {oficina.nome}
                        </h3>

                        {/* Serviços principais */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {oficina.servicos.slice(0, 3).map((servico, index) => (
                              <span
                                key={index}
                                className="text-xs px-2 py-1 rounded-md"
                                style={{
                                  backgroundColor: "#1C1C1E",
                                  color: "#F5F5F5",
                                }}
                              >
                                {servico}
                              </span>
                            ))}
                            {oficina.servicos.length > 3 && (
                              <span
                                className="text-xs px-2 py-1 rounded-md"
                                style={{
                                  backgroundColor: "#1C1C1E",
                                  color: "#A1A1AA",
                                }}
                              >
                                +{oficina.servicos.length - 3} mais
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                          <Clock className="w-4 h-4" style={{ color: "var(--marketplace-primary)" }} />
                          <span className="text-sm" style={{ color: "var(--marketplace-text-secondary)" }}>
                            {oficina.horario}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-current" style={{ color: "#FACC15" }} />
                            <span className="font-medium" style={{ color: "#F5F5F5" }}>
                              {oficina.avaliacao}
                            </span>
                            <span className="text-sm" style={{ color: "#A1A1AA" }}>
                              ({oficina.numeroAvaliacoes})
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" style={{ color: "var(--marketplace-primary)" }} />
                            <span className="text-sm" style={{ color: "#A1A1AA" }}>
                              {oficina.distancia}
                            </span>
                          </div>
                        </div>

                        <Button
                          className="w-full font-semibold"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            window.open(`https://wa.me/${oficina.telefone}`, "_blank")
                          }}
                          style={{
                            backgroundColor: "#22C55E",
                            color: "white",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#16A34A"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#22C55E"
                          }}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Fale Conosco
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                disabled
                style={{
                  backgroundColor: "var(--marketplace-card)",
                  borderColor: "var(--marketplace-border)",
                  color: "var(--marketplace-text-secondary)",
                  cursor: "pointer",
                }}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                style={{
                  backgroundColor: "var(--marketplace-card)",
                  borderColor: "var(--marketplace-border)",
                  color: "var(--marketplace-text-primary)",
                  cursor: "pointer",
                }}
              >
                Próximo
              </Button>
            </div>
          </>
        )}

        {/* CTA para cadastro */}
        <div className="mt-16 text-center p-8 rounded-lg" style={{ backgroundColor: "var(--marketplace-card)" }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--marketplace-text-primary)" }}>
            Tem uma oficina?
          </h2>
          <p className="mb-6" style={{ color: "var(--marketplace-text-secondary)" }}>
            Cadastre sua oficina e apareça nas buscas dos clientes
          </p>
          <Link href="/cadastro-oficina">
            <Button
              size="lg"
              className="font-semibold"
              style={{
                backgroundColor: "var(--marketplace-primary)",
                color: "white",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--marketplace-primary-hover)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--marketplace-primary)"
              }}
            >
              Cadastrar Oficina
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

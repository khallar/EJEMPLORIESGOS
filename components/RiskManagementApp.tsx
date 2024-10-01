import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";

type RiskType = "Técnico" | "Gestión" | "Organizacional" | "Externo";

type Risk = {
  id: number;
  description: string;
  probability: number;
  impact: number;
  phase: string;
  status: string;
  type: RiskType;
  weight: number;
};

const initialRisks: Risk[] = [
  {
    id: 1,
    description: "Requisitos mal definidos",
    probability: 0.8,
    impact: 0.9,
    phase: "Inicio",
    status: "Activo",
    type: "Técnico",
    weight: 5,
  },
  {
    id: 2,
    description: "Falta de experiencia en tecnología",
    probability: 0.5,
    impact: 0.6,
    phase: "Elaboración",
    status: "Mitigado",
    type: "Gestión",
    weight: 3,
  },
  {
    id: 3,
    description: "Cambios frecuentes en el alcance",
    probability: 0.7,
    impact: 0.8,
    phase: "Construcción",
    status: "Activo",
    type: "Gestión",
    weight: 4,
  },
  {
    id: 4,
    description: "Problemas de integración de sistemas",
    probability: 0.6,
    impact: 0.7,
    phase: "Construcción",
    status: "Activo",
    type: "Técnico",
    weight: 4,
  },
  {
    id: 5,
    description: "Retrasos en la entrega de componentes",
    probability: 0.5,
    impact: 0.6,
    phase: "Construcción",
    status: "Activo",
    type: "Organizacional",
    weight: 3,
  },
  {
    id: 6,
    description: "Presupuesto insuficiente",
    probability: 0.4,
    impact: 0.9,
    phase: "Inicio",
    status: "Mitigado",
    type: "Gestión",
    weight: 5,
  },
  {
    id: 7,
    description: "Falta de compromiso de los stakeholders",
    probability: 0.3,
    impact: 0.8,
    phase: "Elaboración",
    status: "Activo",
    type: "Organizacional",
    weight: 4,
  },
  {
    id: 8,
    description: "Problemas de rendimiento del sistema",
    probability: 0.5,
    impact: 0.7,
    phase: "Transición",
    status: "Activo",
    type: "Técnico",
    weight: 4,
  },
  {
    id: 9,
    description: "Cambios en regulaciones legales",
    probability: 0.2,
    impact: 0.9,
    phase: "Construcción",
    status: "Activo",
    type: "Externo",
    weight: 5,
  },
  {
    id: 10,
    description: "Rotación de personal clave",
    probability: 0.4,
    impact: 0.7,
    phase: "Construcción",
    status: "Mitigado",
    type: "Organizacional",
    weight: 4,
  },
];

const riskTypes: RiskType[] = [
  "Técnico",
  "Gestión",
  "Organizacional",
  "Externo",
];

export default function RiskManagementApp() {
  const [risks, setRisks] = useState<Risk[]>(initialRisks);
  const [newRisk, setNewRisk] = useState<Omit<Risk, "id">>({
    description: "",
    probability: 0.5,
    impact: 0.5,
    phase: "Inicio",
    status: "Activo",
    type: "Técnico",
    weight: 1,
  });

  const addRisk = () => {
    setRisks([...risks, { ...newRisk, id: risks.length + 1 }]);
    setNewRisk({
      description: "",
      probability: 0.5,
      impact: 0.5,
      phase: "Inicio",
      status: "Activo",
      type: "Técnico",
      weight: 1,
    });
  };

  const updateRiskStatus = (id: number, newStatus: string) => {
    setRisks(
      risks.map((risk) =>
        risk.id === id ? { ...risk, status: newStatus } : risk
      )
    );
  };

  const prepareDataForRadarChart = () => {
    return riskTypes.map((type) => {
      const typeRisks = risks.filter((risk) => risk.type === type);
      const avgProbability =
        typeRisks.reduce((sum, risk) => sum + risk.probability, 0) /
          typeRisks.length || 0;
      const avgImpact =
        typeRisks.reduce((sum, risk) => sum + risk.impact, 0) /
          typeRisks.length || 0;
      const avgWeight =
        typeRisks.reduce((sum, risk) => sum + risk.weight, 0) /
          typeRisks.length || 0;
      return {
        type,
        probability: avgProbability,
        impact: avgImpact,
        weight: avgWeight,
      };
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Riesgos RUP</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Agregar Nuevo Riesgo</h2>
        <div className="space-y-4">
          <Input
            placeholder="Descripción del riesgo"
            value={newRisk.description}
            onChange={(e) =>
              setNewRisk({ ...newRisk, description: e.target.value })
            }
            className="w-full"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Probabilidad: {newRisk.probability.toFixed(2)}
            </label>
            <Slider
              value={[newRisk.probability]}
              onValueChange={(value) =>
                setNewRisk({ ...newRisk, probability: value[0] })
              }
              max={1}
              step={0.01}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Impacto: {newRisk.impact.toFixed(2)}
            </label>
            <Slider
              value={[newRisk.impact]}
              onValueChange={(value) =>
                setNewRisk({ ...newRisk, impact: value[0] })
              }
              max={1}
              step={0.01}
            />
          </div>
          <Select
            value={newRisk.phase}
            onValueChange={(value) => setNewRisk({ ...newRisk, phase: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona la fase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inicio">Inicio</SelectItem>
              <SelectItem value="Elaboración">Elaboración</SelectItem>
              <SelectItem value="Construcción">Construcción</SelectItem>
              <SelectItem value="Transición">Transición</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={newRisk.type}
            onValueChange={(value) =>
              setNewRisk({ ...newRisk, type: value as RiskType })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el tipo de riesgo" />
            </SelectTrigger>
            <SelectContent>
              {riskTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Peso (1-10)"
            value={newRisk.weight}
            onChange={(e) =>
              setNewRisk({ ...newRisk, weight: parseInt(e.target.value) })
            }
            min="1"
            max="10"
            step="1"
          />
        </div>
        <Button onClick={addRisk} className="mt-4">
          Agregar Riesgo
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Lista de Riesgos</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descripción</TableHead>
              <TableHead>Probabilidad</TableHead>
              <TableHead>Impacto</TableHead>
              <TableHead>Fase RUP</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Peso</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {risks.map((risk) => (
              <TableRow key={risk.id}>
                <TableCell>{risk.description}</TableCell>
                <TableCell>{risk.probability.toFixed(2)}</TableCell>
                <TableCell>{risk.impact.toFixed(2)}</TableCell>
                <TableCell>{risk.phase}</TableCell>
                <TableCell>{risk.type}</TableCell>
                <TableCell>{risk.weight}</TableCell>
                <TableCell>{risk.status}</TableCell>
                <TableCell>
                  <Select
                    value={risk.status}
                    onValueChange={(value) => updateRiskStatus(risk.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Mitigado">Mitigado</SelectItem>
                      <SelectItem value="Cerrado">Cerrado</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          Diagrama de Araña de Riesgos
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={prepareDataForRadarChart()}>
            <PolarGrid />
            <PolarAngleAxis dataKey="type" />
            <PolarRadiusAxis angle={30} domain={[0, 1]} />
            <Radar
              name="Probabilidad"
              dataKey="probability"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Radar
              name="Impacto"
              dataKey="impact"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            <Radar
              name="Peso"
              dataKey="weight"
              stroke="#ffc658"
              fill="#ffc658"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

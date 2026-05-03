import ScrollSteps from "@/components/ui/scroll-steps";
import scalesImg from "@/assets/image copy 3.png";

const steps = [
  {
    label: "Passo 01",
    headline: "Contato inicial",
    bullets: [
      "Preencha o formulário em menos de 2 minutos",
      "Nossa equipe entra em contato em até 24h",
      "Entendemos sua operação e necessidades reais",
    ],
    visual: scalesImg,
    accent: "#6366f1",
  },
  {
    label: "Passo 02",
    headline: "Configuração personalizada",
    bullets: [
      "Criamos sua organização isolada no sistema",
      "Configuramos perfis, permissões e hierarquia da equipe",
      "Importamos calendário forense e regras de prazo",
    ],
    visual: scalesImg,
    accent: "#22d3ee",
  },
  {
    label: "Passo 03",
    headline: "Piloto controlado",
    bullets: [
      "Início com grupo reduzido para validar fluxos reais",
      "Treinamento prático com casos da sua rotina",
      "Ajustes finos com base no dia a dia do escritório",
    ],
    visual: scalesImg,
    accent: "#a78bfa",
  },
  {
    label: "Passo 04",
    headline: "Operação plena",
    bullets: [
      "Expansão para toda a equipe com suporte dedicado",
      "Monitoramento contínuo e evolução do sistema",
      "Relatórios de adoção e performance da operação",
    ],
    visual: scalesImg,
    accent: "#34d399",
  },
];

export default function ScrollStepsDemo() {
  return <ScrollSteps steps={steps} />;
}

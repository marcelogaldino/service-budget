export enum StatusTypes {
  RASCUNHO = "Rascunho",
  APROVADO = "Aprovado",
  ENVIADO = "Enviado",
  RECUSADO = "Recusado",
}

interface StatusData {
  bgColor: string;
  textColor: string;
  name: string;
  pointColor: string;
}

export const STATUS: Record<StatusTypes, StatusData> = {
  [StatusTypes.APROVADO]: {
    bgColor: "bg-success-light",
    textColor: "text-success-dark",
    name: StatusTypes.APROVADO,
    pointColor: "bg-success-base",
  },
  [StatusTypes.ENVIADO]: {
    bgColor: "bg-info-light",
    textColor: "text-info-dark",
    name: StatusTypes.ENVIADO,
    pointColor: "bg-info-base",
  },
  [StatusTypes.RASCUNHO]: {
    bgColor: "bg-gray-300",
    textColor: "text-gray-500",
    name: StatusTypes.RASCUNHO,
    pointColor: "bg-gray-400",
  },
  [StatusTypes.RECUSADO]: {
    bgColor: "bg-danger-light",
    textColor: "text-danger-dark",
    name: StatusTypes.RECUSADO,
    pointColor: "bg-danger-base",
  },
};

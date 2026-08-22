export type CapaAR = {
  id: string;
  nome: string;
  source: any;
  physicalWidth: number;
};

export type ModeloAR = {
  id: string;
  nome: string;
  source: any;
  scale: [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  animationName?: string;
};

export const CAPAS_PADRAO: CapaAR[] = [
  {
    id: "livro",
    nome: "Livro",
    source: require("../../assets/targets/livro.png"),
    physicalWidth: 0.06,
  },
];

// Escalas calculadas a partir da altura real de cada modelo dentro do .glb,
// para que fiquem proporcionais ao tamanho do marcador (physicalWidth). O
// "pato" foi calibrado visualmente; os demais ainda podem precisar de ajuste
// fino depois de testados na câmera.
export const MODELOS_PADRAO: ModeloAR[] = [
  {
    id: "pato",
    nome: "Pato",
    source: require("../../assets/models/pato.glb"),
    scale: [0.03, 0.03, 0.03],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    animationName: "01a02b19-4272-7552-a012-0fc8fcb197f6",
  },
  {
    id: "coelho",
    nome: "Coelho",
    source: require("../../assets/models/coelho.glb"),
    scale: [0.02, 0.02, 0.02],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: "porsche",
    nome: "Porsche",
    source: require("../../assets/models/porsche.glb"),
    scale: [0.0004, 0.0004, 0.0004],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: "robo",
    nome: "Robô",
    source: require("../../assets/models/robo.glb"),
    scale: [0.06, 0.06, 0.06],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
];

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
    nome: "Capa do livro (padrão)",
    source: require("../../assets/targets/livro.png"),
    physicalWidth: 0.06,
  },
  {
    id: "livro2",
    nome: "Capa do livro (cópia)",
    source: require("../../assets/targets/livro2.jpg"),
    physicalWidth: 0.06,
  },
];

// Escalas calculadas a partir da altura real de cada modelo dentro do .glb,
// para que fiquem proporcionais ao tamanho do marcador (physicalWidth). Os dois
// modelos Meshy foram calibrados visualmente; os demais ainda podem precisar
// de ajuste fino depois de testados na câmera.
export const MODELOS_PADRAO: ModeloAR[] = [
  {
    id: "meshyBipedAnimado",
    nome: "Personagem Meshy (padrão)",
    source: require("../../assets/models/Meshy_AI_biped_Meshy_AI_Meshy_Merged_Animations.glb"),
    scale: [0.03, 0.03, 0.03],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    animationName: "01a02b19-4272-7552-a012-0fc8fcb197f6",
  },
  {
    id: "meshyBipedSimples",
    nome: "Personagem Meshy (sem animação extra)",
    source: require("../../assets/models/Meshy_AI_biped_Character_output.glb"),
    scale: [0.03, 0.03, 0.03],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    animationName: "Armature|clip0|baselayer",
  },
  {
    id: "coelho3d",
    nome: "Coelho 3D",
    source: require("../../assets/models/coelho_3d.glb"),
    scale: [0.02, 0.02, 0.02],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: "coelhoAcordando",
    nome: "Coelho acordando e saindo",
    source: require("../../assets/models/coelho_acordando_saindo.glb"),
    scale: [0.02, 0.02, 0.02],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: "dog",
    nome: "Cachorro",
    source: require("../../assets/models/dog.glb"),
    scale: [0.03, 0.03, 0.03],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: "livro3d",
    nome: "Livro 3D",
    source: require("../../assets/models/livro_3d.glb"),
    scale: [0.0075, 0.0075, 0.0075],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: "livroCoelhoAnimado",
    nome: "Livro com coelho animado",
    source: require("../../assets/models/livro_coelho_animado.glb"),
    scale: [0.0075, 0.0075, 0.0075],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    animationName: "Bunny_Wakes_And_Emerges",
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
    id: "robot",
    nome: "Robô",
    source: require("../../assets/models/robot.glb"),
    scale: [0.06, 0.06, 0.06],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
];

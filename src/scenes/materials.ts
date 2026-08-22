import { ViroMaterials } from "@reactvision/react-viro";

let materiaisCriados = false;

export function criarMateiriais() {
  if (materiaisCriados) {
    return;
  }

  ViroMaterials.createMaterials({
    azul: {
      diffuseColor: "#2563EB",
      lightingModel: "Lambert",
    },
    verde: {
      diffuseColor: "#16A34A",
      lightingModel: "Lambert",
    },
    vermelho: {
      diffuseColor: "#EF4444",
      lightingModel: "Lambert",
    },
    amarelo: {
      diffuseColor: "#F59E0B",
      lightingModel: "Lambert",
    },
    roxo: {
      diffuseColor: "#8B5CF6",
      lightingModel: "Lambert",
    },
  });
  materiaisCriados = true;
}

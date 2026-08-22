import { ViroARTrackingTargets } from "@reactvision/react-viro";
import { CAPAS_PADRAO } from "./opcoesAR";

export const NOME_ALVO_CAPA = "capaLivro";

let capaRegistradaId: string | null = null;

export function criarAlvoDeImagem(capa: { id: string; source: any; physicalWidth: number }) {
  if (capaRegistradaId === capa.id) {
    return;
  }

  if (capaRegistradaId !== null) {
    ViroARTrackingTargets.deleteTarget(NOME_ALVO_CAPA);
  }

  ViroARTrackingTargets.createTargets({
    [NOME_ALVO_CAPA]: {
      source: capa.source,
      orientation: "Up",
      physicalWidth: capa.physicalWidth,
    },
  });

  capaRegistradaId = capa.id;
}

// Mantido para as cenas que sempre usam a capa padrão (CenaImagem, CenaInterativa).
export function criarAlvosDeImagem() {
  criarAlvoDeImagem(CAPAS_PADRAO[0]);
}

import { ViroARTrackingTargets } from "@reactvision/react-viro";

let alvosCriados = false;

export function criarAlvosDeImagem{
    if (alvosCriados) {
        return;
    }

    ViroARTrackingTargets.createTargets({
        capaLivro: {
            source: require("../../assets/targets/livro.jpg"),
            orientation: "Up",
            physicalWWidth: 0.16
            
        }
    });

    alvosCriados = true;
}

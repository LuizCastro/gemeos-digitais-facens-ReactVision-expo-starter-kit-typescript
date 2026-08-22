import React, { useEffect, useState } from "react";
import { ViroAmbientLight, ViroARImageMarker, ViroARScene, ViroBox, ViroText } from "@reactvision/react-viro";
import { criarAlvosDeImagem } from "./alvos";
import { criarMateriais } from "./materials";

export default function CenaImagem() {
    const [imagemEncontrada, setImagemEncontrada] = useState(false);
    const [alvosProntos, setAlvosProntos] = useState(false);
    useEffect(() => {
        criarMateriais();
        criarAlvosDeImagem();
        setAlvosProntos(true);
    }, []);
    
    return (
        <ViroARScene>
            <ViroAmbientLight color="#ffffff" intensity={500} />
            {!imagemEncontrada && (
                <ViroText
                    text="Aponte a câmera para a capa ou figura cadastrada"
                    position={[0, 0, -1]}
                    scale={[0.25, 0.25, 0.25]}
                    style={{
                        fontSize: 24,
                        color: "#ffffff",
                        textAlign: "center"
                    }}
                    transformBehaviors={["billboard"]}
                />
            )}
            {alvosProntos && (
                <ViroARImageMarker
                    target="capaLivro"
                    onAnchorFound={() => setImagemEncontrada(true)}
                    onAnchorRemoved={() => setImagemEncontrada(false)}
                >
                    <ViroBox
                        position={[0, 0.08, 0]}
                        scale={[0.08, 0.08, 0.08]}
                        materials={["azul"]}
                    />
                    <ViroText
                        text="Objeto sobre a capa"
                        position={[0, 0.2, 0]}
                        scale={[0.12, 0.12, 0.12]}
                        style={{
                            fontSize: 18,
                            color: "#ffffff",
                            textAlign: "center"
                        }}
                        transformBehaviors={["billboard"]}
                    />
                </ViroARImageMarker>
            )}
        </ViroARScene>
    );
}
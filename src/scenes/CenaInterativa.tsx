import React, { useEffect, useState } from "react";
import {
    ViroAmbientLight,
    ViroARImageMarker,
    ViroARScene,
    ViroBox,
    ViroText
} from "@reactvision/react-viro";

import { criarAlvosDeImagem } from "./alvos";
import { criarMateriais } from "./materials";

const materiais = ["vermelho", "amarelo", "roxo"];

export default function CenaInterativa() {
    const [imagemEncontrada, setImagemEncontrada] = useState(false);
    const [indiceMaterial, setIndiceMaterial] = useState(0);
    const [grande, setGrande] = useState(false);
    const [alvosProntos, setAlvosProntos] = useState(false);
  
    useEffect(() => {
        criarMateriais();
        criarAlvosDeImagem();
        setAlvosProntos(true);
    }, []);

    function aoClicarNoObjeto() {
        setIndiceMaterial((valorAtual) => {
            return (valorAtual + 1) % materiais.length;
        });
        setGrande((valorAtual) => !valorAtual);
    }
    return (
        <ViroARScene>
            <ViroAmbientLight color="#ffffff" intensity={500} />

            {!imagemEncontrada && (
                <ViroText
                    text="Aponte para a imagem cadastrada e toque no cubo"
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
                        position={[0, 0.1, 0]}
                        scale={grande ? [0.13, 0.13, 0.13] : [0.09, 0.09, 0.09]}
                        materials={[materiais[indiceMaterial]]}
                        highAccuracyEvents={true}
                        onClick={aoClicarNoObjeto}
                    />
                    
                    <ViroText
                        text="Toque no cubo"
                        position={[0, 0.28, 0]}
                        scale={[0.14, 0.14, 0.14]}
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
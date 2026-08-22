import React, { useEffect, useState } from "react";
import {
    ViroAmbientLight,
    ViroARImageMarker,
    ViroARScene,
    Viro3DObject,
    ViroText

} from "@reactvision/react-viro";

import { criarAlvosDeImagem } from "./alvos";

export default function CenaCarroNaCapa() {
    const [imagemEncontrada, setImagemEncontrada] = useState(false);
    const [alvosProntos, setAlvosProntos] = useState(false);
    const [carroCarregado, setCarroCarregado] = useState(false);
    useEffect(() => {
        criarAlvosDeImagem();
        setAlvosProntos(true);
    }, []);
    return (
        <ViroARScene>
            <ViroAmbientLight color="#ffffff" intensity={700} />

            {!imagemEncontrada && (
                <ViroText
                    text="Aponte a câmera para a capa do livro"
                    position={[0, 0, -1]}
                    scale={[0.1, 0.1, 0.1]}
                    style={{
                        fontSize: 24,
                        color: "#ffffff",
                        textAlign: "center"
                    }}
                    transformBehaviors={["billboard"]}
                />
            )}
            
            {imagemEncontrada && !carroCarregado && (
                <ViroText
                    text="Carregando Porsche..."
                    position={[0, 0, -1]}
                    scale={[0.22, 0.22, 0.22]}
                    style={{
                        fontSize: 22,
                        color: "#ffffff",
                        textAlign: "center"
                    }}
                    transformBehaviors={["billboard"]}
                />
            )}
            {alvosProntos && (
                <ViroARImageMarker
                    target="capaLivro"
                    onAnchorFound={() => {
                        setImagemEncontrada(true);
                    }}
                    onAnchorRemoved={() => {
                        setImagemEncontrada(false);
                        setCarroCarregado(false);
                    }}
                >
                    <Viro3DObject
                        source={require("../../assets/models/porsche.glb")}
                        type="GLB"
                        position={[0, 0.05, 0]}
                        scale={[0.08, 0.08, 0.08]}
                        rotation={[0, 0, 0]}
                        onLoadStart={() => {
                            console.log("Carregando Porsche...");
                        }}
                        onLoadEnd={() => {
                            console.log("Porsche carregado.");
                            setCarroCarregado(true);
                        }}
                        onError={(event: any) => {
                            console.log("Erro ao carregar Porsche:", event.nativeEvent);
                        }}
                    />
                    <ViroText
                        text="Porsche"
                        position={[0, 0.22, 0]}
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
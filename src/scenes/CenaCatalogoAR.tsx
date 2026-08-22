import React, { useEffect, useRef, useState } from "react";
import {
    ViroAmbientLight,
    ViroARPlaneSelector,
    ViroARScene,
    ViroBox,
    ViroQuad,
    ViroSphere,
    ViroText
} from "@reactvision/react-viro";

import { criarMateriais } from "./materials";

type ObjetoCatalogo = "cubo" | "esfera" | "placa";

type PropsCenaCatalogoAR = {
    sceneNavigator?: {
        viroAppProps?: {
            objetoSelecionado?: ObjetoCatalogo;
        };
    };
};

export default function CenaCatalogoAR(props: PropsCenaCatalogoAR) {
    const seletorPlanoRef = useRef<any>(null);
    const [planoSelecionado, setPlanoSelecionado] = useState(false);
    const objetoSelecionado = props.sceneNavigator?.viroAppProps?.objetoSelecionado ?? "cubo";
    
    useEffect(() => {
        criarMateriais();
    }, []);

    function renderizarObjeto() {
        if (objetoSelecionado === "esfera") {
            return (
                <ViroSphere
                    position={[0, 0.12, 0]}
                    radius={0.12}
                    materials={["amarelo"]}
                />
            );
        }
        if (objetoSelecionado === "placa") {
            return (
                <ViroQuad
                    position={[0, 0.01, 0]}
                    rotation={[-90, 0, 0]}
                    width={0.35}
                    height={0.22}
                    materials={["roxo"]}
                />
            );
        }
        return (
            <ViroBox
                position={[0, 0.12, 0]}
                scale={[0.14, 0.14, 0.14]}
                materials={["azul"]}
            />
        );
    }

    function obterNomeObjeto() {
        if (objetoSelecionado === "esfera") {
            return "Esfera";
        }
    
        if (objetoSelecionado === "placa") {
            return "Placa";
        }
        return "Cubo";
    }

    return (
        <ViroARScene
            anchorDetectionTypes={["PlanesHorizontal", "PlanesVertical"]}
            onAnchorFound={(anchor) => {
                seletorPlanoRef.current?.handleAnchorFound(anchor);
            }}
            
            onAnchorUpdated={(anchor) => {
                seletorPlanoRef.current?.handleAnchorUpdated(anchor);
            }}
            
            onAnchorRemoved={(anchor) => {
                seletorPlanoRef.current?.handleAnchorRemoved(anchor);
            }}
        >
            <ViroAmbientLight color="#ffffff" intensity={500} />
            {!planoSelecionado && (
                <ViroText
                    text={`Objeto escolhido: ${obterNomeObjeto()}. Mova o celular e toque em uma superfície.`}
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
            
            <ViroARPlaneSelector
                ref={seletorPlanoRef}
                alignment="Both"
                hideOverlayOnSelection={true}
                onPlaneSelected={() => {
                    setPlanoSelecionado(true);
                }}
            >
                {renderizarObjeto()}
                <ViroText
                    text={obterNomeObjeto()}
                    position={[0, 0.35, 0]}
                    scale={[0.14, 0.14, 0.14]}
                    style={{
                        fontSize: 18,
                        color: "#ffffff",
                        textAlign: "center"
                    }}
                    transformBehaviors={["billboard"]}
                />
            </ViroARPlaneSelector>
        </ViroARScene>
    );
}

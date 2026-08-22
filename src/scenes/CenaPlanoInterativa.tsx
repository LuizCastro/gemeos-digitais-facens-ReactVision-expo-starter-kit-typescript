import React, { useEffect, useRef, useState } from "react";
import {
    ViroAmbientLight,
    ViroARPlaneSelector,
    ViroARScene,
    ViroBox,
    ViroText
} from "@reactvision/react-viro";

import { criarMateriais } from "./materials";

const materiais = ["vermelho", "amarelo", "roxo"];

export default function CenaPlanoInterativa() {
    const seletorPlanoRef = useRef<any>(null);
    
    const [planoSelecionado, setPlanoSelecionado] = useState(false);
    const [indiceMaterial, setIndiceMaterial] = useState(0);
    const [grande, setGrande] = useState(false);

    useEffect(() => {
        criarMateriais();
    }, []);

    function aoClicarNoObjeto() {
        setIndiceMaterial((valorAtual) => {
            return (valorAtual + 1) % materiais.length;
        });

        setGrande((valorAtual) => !valorAtual);
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
                    text="Mova o celular devagar, toque em uma superfície e depois toque no cubo"
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
            
            <ViroARPlaneSelector
                ref={seletorPlanoRef}
                alignment="Both"
                hideOverlayOnSelection={true}
                onPlaneSelected={() => {
                    setPlanoSelecionado(true);
                }}
            >
                <ViroBox
                    position={[0, 0.1, 0]}
                    scale={grande ? [0.16, 0.16, 0.16] : [0.11, 0.11, 0.11]}
                    materials={[materiais[indiceMaterial]]}
                    highAccuracyEvents={true}
                    onClick={aoClicarNoObjeto}
                    dragType="FixedToPlane"
                    onDrag={() => { }}
                />
                
                <ViroText
                    text="Toque no cubo"
                    position={[0, 0.3, 0]}
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

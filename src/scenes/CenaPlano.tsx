import React, { useEffect, useRef, useState } from "react";
import {
    ViroAmbientLight,
    ViroARPlaneSelector,
    ViroARScene,
    ViroBox,
    ViroText
} from "@reactvision/react-viro";

import { criarMateriais } from "./materials";

export default function CenaPlano() {
    const seletorPlanoRef = useRef<any>(null);
    const [planoSelecionado, setPlanoSelecionado] = useState(false);
    
    useEffect(() => {
        criarMateriais();
    }, []);
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
                    text="Mova o celular devagar e toque em uma superfície detectada"
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
                    scale={[0.12, 0.12, 0.12]}
                    materials={["verde"]}
                    dragType="FixedToPlane"
                    onDrag={() => { }}
                />
                <ViroText
                    text="Objeto na superfície"
                    position={[0, 0.28, 0]}
                    scale={[0.15, 0.15, 0.15]}
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
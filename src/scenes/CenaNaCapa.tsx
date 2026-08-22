import React, { useEffect, useRef, useState } from "react";
import {
    ViroAmbientLight,
    ViroARImageMarker,
    ViroARScene,
    Viro3DObject,
    ViroText

} from "@reactvision/react-viro";

import { criarAlvoDeImagem, NOME_ALVO_CAPA } from "./alvos";
import { CAPAS_PADRAO, MODELOS_PADRAO, CapaAR, ModeloAR } from "./opcoesAR";

type PropsCenaNaCapa = {
    sceneNavigator?: {
        viroAppProps?: {
            capaSelecionada?: CapaAR;
            modeloSelecionado?: ModeloAR;
        };
    };
};

export default function CenaNaCapa(props: PropsCenaNaCapa) {
    const capa = props.sceneNavigator?.viroAppProps?.capaSelecionada ?? CAPAS_PADRAO[0];
    const modelo = props.sceneNavigator?.viroAppProps?.modeloSelecionado ?? MODELOS_PADRAO[0];

    const [imagemEncontrada, setImagemEncontrada] = useState(false);
    const [alvosProntos, setAlvosProntos] = useState(false);
    const [carroCarregado, setCarroCarregado] = useState(false);
    const [animacaoAtiva, setAnimacaoAtiva] = useState(false);
    const animacaoAtivaRef = useRef(false);
    const [prontoParaExibir, setProntoParaExibir] = useState(false);

    const alternarAnimacao = () => {
        const novoValor = !animacaoAtivaRef.current;
        animacaoAtivaRef.current = novoValor;
        setAnimacaoAtiva(novoValor);
    };

    useEffect(() => {
        criarAlvoDeImagem(capa);
        setAlvosProntos(true);
    }, [capa]);

    useEffect(() => {
        if (!imagemEncontrada) {
            setProntoParaExibir(false);
            return;
        }
        const temporizador = setTimeout(() => {
            setProntoParaExibir(true);
        }, 400);
        return () => clearTimeout(temporizador);
    }, [imagemEncontrada]);

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
                    text="Carregando..."
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
                    target={NOME_ALVO_CAPA}
                    onAnchorFound={() => {
                        setImagemEncontrada(true);
                    }}
                    onAnchorRemoved={() => {
                        setImagemEncontrada(false);
                        setCarroCarregado(false);
                    }}
                >
                    <Viro3DObject
                        source={modelo.source}
                        type="GLB"
                        position={modelo.position}
                        scale={modelo.scale}
                        rotation={modelo.rotation}
                        opacity={prontoParaExibir ? 1 : 0}
                        animation={modelo.animationName ? {
                            name: modelo.animationName,
                            run: prontoParaExibir && animacaoAtiva,
                            loop: false,
                            onFinish: () => {
                                if (animacaoAtivaRef.current) {
                                    setAnimacaoAtiva(false);
                                    requestAnimationFrame(() => setAnimacaoAtiva(true));
                                }
                            },
                        } : undefined}
                        onClick={modelo.animationName ? () => {
                            alternarAnimacao();
                        } : undefined}
                        onLoadStart={() => {
                            console.log("Carregando modelo...");
                        }}
                        onLoadEnd={() => {
                            console.log("Modelo carregado.");
                            setCarroCarregado(true);
                        }}
                        onError={(event: any) => {
                            console.log("Erro ao carregar modelo:", event.nativeEvent);
                        }}
                    />
                    <ViroText
                        text={modelo.nome}
                        position={[0, 0.22, 0]}
                        scale={[0.12, 0.12, 0.12]}
                        opacity={prontoParaExibir ? 1 : 0}
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

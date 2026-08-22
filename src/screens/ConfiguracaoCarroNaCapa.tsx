import React, { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

import { CAPAS_PADRAO, MODELOS_PADRAO, CapaAR, ModeloAR } from "../scenes/opcoesAR";
import { inspecionarGlb } from "../utils/inspecionarGlb";

const ESCALA_PADRAO_SEM_INFO = 0.03;

type Props = {
    onIniciar: (capa: CapaAR, modelo: ModeloAR) => void;
    onVoltar: () => void;
};

export default function ConfiguracaoCarroNaCapa({ onIniciar, onVoltar }: Props) {
    const [capa, setCapa] = useState<CapaAR>(CAPAS_PADRAO[0]);
    const [modelo, setModelo] = useState<ModeloAR>(MODELOS_PADRAO[0]);
    const [importando, setImportando] = useState<"capa" | "modelo" | null>(null);
    const [erro, setErro] = useState<string | null>(null);

    async function importarCapa() {
        setErro(null);
        const resultado = await DocumentPicker.getDocumentAsync({
            type: "image/*",
            copyToCacheDirectory: true,
        });
        if (resultado.canceled || !resultado.assets?.[0]) {
            return;
        }
        const arquivo = resultado.assets[0];
        setCapa({
            id: `custom-capa-${Date.now()}`,
            nome: arquivo.name,
            source: { uri: arquivo.uri },
            physicalWidth: 0.1,
        });
    }

    async function importarModelo() {
        setErro(null);
        const resultado = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true,
        });
        if (resultado.canceled || !resultado.assets?.[0]) {
            return;
        }
        const arquivo = resultado.assets[0];
        if (!arquivo.name.toLowerCase().endsWith(".glb")) {
            setErro("Escolha um arquivo .glb.");
            return;
        }

        setImportando("modelo");
        try {
            const info = await inspecionarGlb(arquivo.uri);
            const escala = info.alturaY
                ? capa.physicalWidth / info.alturaY
                : ESCALA_PADRAO_SEM_INFO;

            setModelo({
                id: `custom-modelo-${Date.now()}`,
                nome: arquivo.name,
                source: { uri: arquivo.uri },
                scale: [escala, escala, escala],
                position: [0, 0, 0],
                rotation: [0, 0, 0],
                animationName: info.animacoes[0],
            });

            if (!info.alturaY) {
                setErro(
                    "Não consegui medir o modelo automaticamente — usei uma escala genérica. Pode precisar ajustar visualmente na câmera."
                );
            }
        } catch {
            setErro("Não consegui ler esse arquivo .glb.");
        } finally {
            setImportando(null);
        }
    }

    function atualizarLarguraCapa(texto: string) {
        const cm = parseFloat(texto.replace(",", "."));
        if (Number.isNaN(cm) || cm <= 0) {
            return;
        }
        setCapa((atual) => ({ ...atual, physicalWidth: cm / 100 }));
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
            <Text style={styles.titulo}>Escolha a capa</Text>
            <View style={styles.linhaChips}>
                {CAPAS_PADRAO.map((item) => (
                    <Chip
                        key={item.id}
                        titulo={item.nome}
                        ativo={capa.id === item.id}
                        onPress={() => setCapa(item)}
                    />
                ))}
                {capa.id.startsWith("custom-capa") && (
                    <Chip titulo={capa.nome} ativo onPress={() => { }} />
                )}
            </View>
            <Pressable style={styles.botaoImportar} onPress={importarCapa}>
                <Text style={styles.botaoImportarTexto}>Importar minha imagem de capa</Text>
            </Pressable>

            <View style={styles.linhaLargura}>
                <Text style={styles.rotulo}>Largura real da capa impressa (cm):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="decimal-pad"
                    defaultValue={String(Math.round(capa.physicalWidth * 100))}
                    onEndEditing={(e) => atualizarLarguraCapa(e.nativeEvent.text)}
                />
            </View>

            <Text style={styles.titulo}>Escolha o modelo 3D</Text>
            <View style={styles.linhaChips}>
                {MODELOS_PADRAO.map((item) => (
                    <Chip
                        key={item.id}
                        titulo={item.nome}
                        ativo={modelo.id === item.id}
                        onPress={() => setModelo(item)}
                    />
                ))}
                {modelo.id.startsWith("custom-modelo") && (
                    <Chip titulo={modelo.nome} ativo onPress={() => { }} />
                )}
            </View>
            <Pressable style={styles.botaoImportar} onPress={importarModelo} disabled={importando !== null}>
                {importando === "modelo" ? (
                    <ActivityIndicator color="#ffffff" />
                ) : (
                    <Text style={styles.botaoImportarTexto}>Importar meu modelo (.glb)</Text>
                )}
            </Pressable>

            {erro && <Text style={styles.erro}>{erro}</Text>}

            <View style={styles.botoesFinais}>
                <Pressable style={styles.botaoVoltar} onPress={onVoltar}>
                    <Text style={styles.botaoVoltarTexto}>Voltar</Text>
                </Pressable>
                <Pressable
                    style={styles.botaoIniciar}
                    onPress={() => onIniciar(capa, modelo)}
                >
                    <Text style={styles.botaoIniciarTexto}>Iniciar câmera</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

function Chip({ titulo, ativo, onPress }: { titulo: string; ativo: boolean; onPress: () => void }) {
    return (
        <Pressable
            style={[styles.chip, ativo ? styles.chipAtivo : styles.chipInativo]}
            onPress={onPress}
        >
            <Text style={[styles.chipTexto, ativo ? styles.chipTextoAtivo : styles.chipTextoInativo]}>
                {titulo}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F172A",
    },
    conteudo: {
        padding: 20,
        paddingTop: 60,
    },
    titulo: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    linhaChips: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 14,
        borderWidth: 1,
    },
    chipAtivo: {
        backgroundColor: "#2563EB",
        borderColor: "#60A5FA",
    },
    chipInativo: {
        backgroundColor: "rgba(30, 41, 59, 0.9)",
        borderColor: "#475569",
    },
    chipTexto: {
        fontWeight: "bold",
        fontSize: 13,
    },
    chipTextoAtivo: {
        color: "#ffffff",
    },
    chipTextoInativo: {
        color: "#CBD5E1",
    },
    botaoImportar: {
        marginTop: 12,
        backgroundColor: "#334155",
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: "center",
    },
    botaoImportarTexto: {
        color: "#ffffff",
        fontWeight: "600",
    },
    linhaLargura: {
        marginTop: 14,
        gap: 6,
    },
    rotulo: {
        color: "#CBD5E1",
        fontSize: 13,
    },
    input: {
        backgroundColor: "#1E293B",
        borderColor: "#334155",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        color: "#ffffff",
        width: 100,
    },
    erro: {
        color: "#FCA5A5",
        marginTop: 12,
        fontSize: 13,
    },
    botoesFinais: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 32,
        marginBottom: 20,
    },
    botaoVoltar: {
        backgroundColor: "rgba(15, 23, 42, 0.85)",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#334155",
    },
    botaoVoltarTexto: {
        color: "#ffffff",
        fontWeight: "bold",
    },
    botaoIniciar: {
        backgroundColor: "#16A34A",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    botaoIniciarTexto: {
        color: "#ffffff",
        fontWeight: "bold",
    },
});

import React, { useMemo, useState } from "react";
import { Pressable, SafeAreaView, SafeAreaViewBase, StatusBar, StyleSheet, Text, View } from "react-native";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import CenaImagem from "../src/scenes/CenaImagem";
import CenaPlano from "../src/scenes/CenaPlano";
import CenaInterativa from "../src/scenes/CenaInterativa";
import CenaPlanoInterativa from "../src/scenes/CenaPlanoInterativa";
import CenaCatalogoAR from "../src/scenes/CenaCatalogoAR";
import CenaNaCapa from "../src/scenes/CenaNaCapa";
import ConfiguracaoCarroNaCapa from "../src/screens/ConfiguracaoCarroNaCapa";
import { CAPAS_PADRAO, MODELOS_PADRAO, CapaAR, ModeloAR } from "../src/scenes/opcoesAR";

type TelaAR = ''
  | "imagem"
  | "plano"
  | "interativo"
  | "planoInterativo"
  | "catalogo"
  | "carroNaCapa"
  | null;

type ObjetoCatalogo = "cubo" | "esfera" | "placa";

export default function App() {
  const [telaAtual, setTelaAtual] = useState<TelaAR>(null);
  const [objetoSelecionado, setObjetoSelecionado] = useState<ObjetoCatalogo>("cubo");
  const [configurandoCarroNaCapa, setConfigurandoCarroNaCapa] = useState(false);
  const [capaSelecionada, setCapaSelecionada] = useState<CapaAR>(CAPAS_PADRAO[0]);
  const [modeloSelecionado, setModeloSelecionado] = useState<ModeloAR>(MODELOS_PADRAO[0]);

  const cenaSelecionada = useMemo(() => {
    if (telaAtual === "imagem") { return CenaImagem; }
    if (telaAtual === "plano") { return CenaPlano; }
    if (telaAtual === "interativo") { return CenaInterativa; }
    if (telaAtual === "planoInterativo") { return CenaPlanoInterativa; }
    if (telaAtual === "catalogo") { return CenaCatalogoAR; }
    if (telaAtual === "carroNaCapa") { return CenaNaCapa; }
    return null;
  }, [telaAtual]);

  if (configurandoCarroNaCapa) {
    return (
      <ConfiguracaoCarroNaCapa
        onVoltar={() => setConfigurandoCarroNaCapa(false)}
        onIniciar={(capa, modelo) => {
          setCapaSelecionada(capa);
          setModeloSelecionado(modelo);
          setConfigurandoCarroNaCapa(false);
          setTelaAtual("carroNaCapa");
        }}
      />
    );
  }

  if (cenaSelecionada) {
    return (
      <View style={styles.arContainer}>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{ scene: cenaSelecionada as any }}
          viroAppProps={{ objetoSelecionado, capaSelecionada, modeloSelecionado }}
          style={styles.arContainer}
        />

        <SafeAreaView style={styles.overlay}>
          <Pressable
            style={styles.voltarButton}
            onPress={() => setTelaAtual(null)}
          >
            <Text style={styles.voltarButtonText}>Voltar</Text>
          </Pressable>
          
          {telaAtual === "catalogo" && (
            <View style={styles.catalogoOverlay}>
              <Text style={styles.catalogoTitulo}>Escolha o objeto:</Text>
              <View style={styles.catalogoBotoes}>

                <BotaoObjeto
                  titulo="Cubo"
                  ativo={objetoSelecionado === "cubo"}
                  onPress={() => setObjetoSelecionado("cubo")}
                />
                
                <BotaoObjeto
                  titulo="Esfera"
                  ativo={objetoSelecionado === "esfera"}
                  onPress={() => setObjetoSelecionado("esfera")}
                />
                
                <BotaoObjeto
                  titulo="Placa"
                  ativo={objetoSelecionado === "placa"}
                  onPress={() => setObjetoSelecionado("placa")}
                />
              </View>
            </View>
          )}
        </SafeAreaView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
 
      <Text style={styles.title}>App de Realidade Aumentada</Text>
 
      <Text style={styles.subtitle}>Escolha uma experiência:</Text>
 
      <Pressable style={styles.button} onPress={() => setTelaAtual("imagem")}>
        <Text style={styles.buttonTitle}>1. Reconhecer capa ou figura</Text>
        <Text style={styles.buttonDescription}>
          Identifica uma imagem cadastrada e renderiza um objeto 3D acima dela.
        </Text>
      </Pressable>
 
      <Pressable style={styles.button} onPress={() => setTelaAtual("plano")}>
        <Text style={styles.buttonTitle}>2. Usar superfície plana</Text>
        <Text style={styles.buttonDescription}>
          Detecta uma mesa, chão ou parede e posiciona um objeto na superfície.
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => setTelaAtual("interativo")}
      >
        <Text style={styles.buttonTitle}>3. Objeto interativo na imagem</Text>
        <Text style={styles.buttonDescription}>
          Reconhece uma imagem e permite tocar no objeto para alterar sua cor.
        </Text>
      </Pressable>
 
      <Pressable
        style={styles.button}
        onPress={() => setTelaAtual("planoInterativo")}
      >
        <Text style={styles.buttonTitle}>4. Objeto interativo no plano</Text>
        <Text style={styles.buttonDescription}>
          Detecta uma superfície plana e permite tocar no objeto para alterar sua cor.
        </Text>
      </Pressable>

       <Pressable
        style={styles.button}
        onPress={() => setTelaAtual("catalogo")}
      >
        <Text style={styles.buttonTitle}>5. Catálogo AR no plano</Text>
        <Text style={styles.buttonDescription}>
          Escolha entre cubo, esfera ou placa e posicione o objeto em uma superfície.
        </Text>
      </Pressable>
 
      <Pressable
        style={styles.button}
        onPress={() => setConfigurandoCarroNaCapa(true)}
      >
        <Text style={styles.buttonTitle}>6. Objeto na capa do livro</Text>
        <Text style={styles.buttonDescription}>
          Escolha a capa e o modelo 3D (ou importe os seus) e renderize sobre a capa reconhecida.
        </Text>
      </Pressable>
 
    </SafeAreaView>
  );
}

function BotaoObjeto({  titulo,   ativo,  onPress }:
  { titulo: string;  ativo: boolean;  onPress: () => void;}) {
  return (
    <Pressable
      style={[ styles.botaoObjeto,  ativo ? styles.botaoObjetoAtivo : styles.botaoObjetoInativo]}
      onPress={onPress}
    >
      <Text style={[ styles.botaoObjetoTexto, ativo ? styles.botaoObjetoTextoAtivo : styles.botaoObjetoTextoInativo]}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  arContainer: {
    flex: 1
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 16
  },
  voltarButton: {
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start"
  },
  voltarButtonText: {
    color: "#ffffff",
    fontWeight: "bold"
  },
  catalogoOverlay: {
    marginTop: 12,
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    padding: 12,
    borderRadius: 16
  },
  catalogoTitulo: {
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 8
  },
  catalogoBotoes: {
    flexDirection: "row",
    gap: 8
  },
  botaoObjeto: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1
  },
  botaoObjetoAtivo: {
    backgroundColor: "#2563EB",
    borderColor: "#60A5FA"
  },
  botaoObjetoInativo: {
    backgroundColor: "rgba(30, 41, 59, 0.9)",
    borderColor: "#475569"
  },
  botaoObjetoTexto: {
    fontWeight: "bold"
  },
  botaoObjetoTextoAtivo: {
    color: "#ffffff"
  },
  botaoObjetoTextoInativo: {
    color: "#CBD5E1"
  },
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    padding: 24
  },
  title: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 16,
    marginBottom: 24
  },
  button: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155"
  },
  buttonTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6
  },
  buttonDescription: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 18
  }
});